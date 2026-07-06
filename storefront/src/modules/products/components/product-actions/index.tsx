"use client"

import { useState, useEffect, useMemo, useRef, useTransition } from "react"
import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import Image from "next/image"
import { toast, Id } from "react-toastify"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) =>
  variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})

// ─── Toast content components ─────────────────────────────────────────────────

function CartSuccessToast({
  title,
  thumbnail,
}: {
  title: string
  thumbnail?: string
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      {thumbnail && (
        <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">Added to your cart</p>
      </div>
      <svg
        className="shrink-0 ml-auto text-emerald-500"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15" />
        <path
          d="M5.5 9l2.5 2.5 4.5-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function CartErrorToast({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <svg
        className="shrink-0 mt-0.5 text-rose-500"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15" />
        <path
          d="M6 6l6 6M12 6l-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-900">Couldn't add item</p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{message}</p>
        <button
          onClick={onRetry}
          className="mt-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

// ─── Shared toast base options ────────────────────────────────────────────────

const baseToastStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "12px",
  padding: "12px 14px",
  boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)",
  minWidth: "260px",
  maxWidth: "340px",
}

const baseToastOpts = {
  position: "top-center" as const,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
  style: baseToastStyle,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const [isPending, startTransition] = useTransition()
  
  const countryCode = useParams().countryCode as string
  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")
  const successToastId = useRef<Id | null>(null)

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return
    return product.variants.find((v) =>
      isEqual(optionsAsKeymap(v.options), options)
    )
  }, [product.variants, options])

  const isValidVariant = useMemo(
    () =>
      product.variants?.some((v) =>
        isEqual(optionsAsKeymap(v.options), options)
      ),
    [product.variants, options]
  )

  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    if (!selectedVariant.manage_inventory) return true
    if (selectedVariant.allow_backorder) return true
    return (selectedVariant.inventory_quantity || 0) > 0
  }, [selectedVariant])

  const maxQuantity = useMemo(() => {
    if (!selectedVariant) return 1
    const available = selectedVariant.manage_inventory
      ? selectedVariant.inventory_quantity || 0
      : 10
    return Math.min(available, 10)
  }, [selectedVariant])

  const thumbnail = product.thumbnail || product.images?.[0]?.url

  const showSuccessToast = () => {
    const content = (
      <CartSuccessToast title={product.title} thumbnail={thumbnail} />
    )
    const opts = {
      ...baseToastOpts,
      autoClose: 3000 as const,
      progressStyle: { background: "#10b981" },
    }

    if (successToastId.current && toast.isActive(successToastId.current)) {
      toast.update(successToastId.current, { render: content, ...opts })
    } else {
      successToastId.current = toast.success(content, opts)
    }
  }

  const showErrorToast = (message: string) => {
    toast.error(
      <CartErrorToast
        message={message}
        onRetry={() => {
          toast.dismiss()
          handleAddToCart()
        }}
      />,
      {
        ...baseToastOpts,
        autoClose: 6000,
        progressStyle: { background: "#f43f5e" },
      }
    )
  }

  const handleAddToCart = () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    // Push the heavy server action into the background
    startTransition(async () => {
      try {
        await addToCart({ variantId: selectedVariant.id, quantity, countryCode })
        showSuccessToast() // Show toast when server confirms
      } catch (err: any) {
        showErrorToast(err?.message ?? "Failed to add to cart. Please try again.")
      } finally {
        setIsAdding(false)
      }
    })
  }

  const incrementQuantity = () =>
    setQuantity((q) => Math.min(q + 1, maxQuantity))
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1))

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4">
          {(product.options || []).map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={(id, value) =>
                setOptions((prev) => ({ ...prev, [id]: value }))
              }
              title={option.title ?? ""}
              data-testid="product-options"
              disabled={!!disabled || isAdding}
            />
          ))}
          <Divider />
        </div>
      )}

      <ProductPrice product={product} variant={selectedVariant} />

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mt-2">
        <Button
          onClick={decrementQuantity}
          disabled={quantity <= 1 || !!disabled || isAdding || isPending}
          variant="secondary"
        >
          -
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          onClick={incrementQuantity}
          disabled={quantity >= maxQuantity || !!disabled || isAdding || isPending}
          variant="secondary"
        >
          +
        </Button>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          isPending ||
          !isValidVariant
        }
        variant="primary"
        className="w-full h-10 mt-2"
        isLoading={isAdding}
        data-testid="add-product-button"
      >
        {!selectedVariant
          ? "Select variant"
          : !inStock || !isValidVariant
          ? "Out of stock"
          : "Add to cart"}
      </Button>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={(id, value) =>
          setOptions((prev) => ({ ...prev, [id]: value }))
        }
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}
