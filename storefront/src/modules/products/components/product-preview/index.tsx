"use client"

import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { isEqual } from "lodash"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast, Id } from "react-toastify"

const optionsAsKeymap = (opts: any): Record<string, string> =>
  opts?.reduce((acc: Record<string, string>, o: any) => {
    acc[o.option_id] = o.value
    return acc
  }, {}) ?? {}

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
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">Added to your cart</p>
      </div>
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

// ─── Shared toast options ─────────────────────────────────────────────────────

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
  progressStyle: { background: "#d1d5db" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
}) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const isAddingRef = useRef(false)
  const successToastId = useRef<Id | null>(null)

  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (!product.variants?.length) return
    setOptions(optionsAsKeymap(product.variants[0].options))
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants) return null
    return (
      product.variants.find((v) =>
        isEqual(optionsAsKeymap(v.options), options)
      ) ?? null
    )
  }, [product.variants, options])

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

  useEffect(() => {
    if (quantity > maxQuantity) setQuantity(maxQuantity)
  }, [maxQuantity, quantity])

  const thumbnail = product.thumbnail || product.images?.[0]?.url

  const showSuccessToast = () => {
    const content = (
      <CartSuccessToast title={product.title} thumbnail={thumbnail} />
    )
    const opts = {
      ...baseToastOpts,
      autoClose: 3000,
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

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || isAddingRef.current) return
    isAddingRef.current = true
    setIsAdding(true)
    try {
      await addToCart({ variantId: selectedVariant.id, quantity, countryCode })
      showSuccessToast()
    } catch (err: any) {
      showErrorToast(err?.message ?? "Failed to add to cart. Please try again.")
    } finally {
      isAddingRef.current = false
      setIsAdding(false)
    }
  }

  const formatTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/(\d+)\s*ml\b/g, "$1 ML")
      .replace(/(\d+)ml\b/g, "$1 ML")
      .replace(/(\d+)\s*ltr\b/g, "$1 LTR")
      .replace(/(\d+)ltr\b/g, "$1 LTR")
      .split(" ")
      .map((word) => {
        if (word === "ml" || word === "ltr") return word.toUpperCase()

        return word
          .split("'")
          .map((part, i) => {
            if (!part) return part
            if (i === 0) return part.charAt(0).toUpperCase() + part.slice(1) // ✅ only capitalize before apostrophe
            return part // ✅ leave "s", "t", "re" etc. as lowercase
          })
          .join("'")
      })
      .join(" ")
  }
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group w-full h-full flex flex-col rounded-lg bg-[#F9F9F9] border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
    >
      {/* Image */}
      <div className="p-2 lg:p-4">
        <div className="relative w-full h-36 xs:h-44 sm:h-52 lg:h-56 rounded-lg overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover !rounded-lg group-hover:scale-105 duration-300 transition-all"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300 text-xs">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Info + actions */}
      <div className="flex flex-col flex-grow p-2.5 sm:p-3.5 gap-2">
        {/* Title */}
        <h2 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 text-gray-900">
          {formatTitle(product.title)}
        </h2>
        {product.subtitle && (
          <p className="hidden sm:block text-xs text-gray-400 line-clamp-1">
            {product.subtitle}
          </p>
        )}

        {cheapestPrice && (
          <p className="text-sm font-bold text-gray-900 mt-auto">
            {cheapestPrice.original_price}
          </p>
        )}

        {/* Stepper + Add to cart
            mobile: two stacked rows
            sm+:    single row side by side */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 mt-1"
          onClick={(e) => e.preventDefault()}
        >
          {/* Stepper */}
          <div className="flex items-center rounded-md border border-gray-200 bg-white overflow-hidden w-full sm:w-auto shrink-0">
            <button
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              disabled={!selectedVariant || quantity <= 1}
              aria-label="Decrease quantity"
              className="flex-1 sm:flex-none sm:w-8 h-8 sm:h-10 flex items-center justify-center text-gray-600 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition hover:bg-gray-50"
            >
              −
            </button>
            <span className="w-10 sm:w-7 text-center text-sm font-medium tabular-nums border-x border-gray-200">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(q + 1, maxQuantity))}
              disabled={!selectedVariant || quantity >= maxQuantity}
              aria-label="Increase quantity"
              className="flex-1 sm:flex-none sm:w-8 h-8 sm:h-10 flex items-center justify-center text-gray-600 font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition hover:bg-gray-50"
            >
              +
            </button>
          </div>

          {/* Add to cart — full width on mobile, flex-1 on sm+ */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || !inStock || isAdding}
            aria-label={!inStock ? "Out of stock" : "Add to cart"}
            className="w-full sm:flex-1 h-8 sm:h-10 flex items-center justify-center gap-1.5 rounded-md bg-black text-white text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition"
          >
            {isAdding ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : !inStock ? (
              "Out of stock"
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
