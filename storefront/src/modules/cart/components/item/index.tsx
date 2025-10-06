"use client"

import { Table, Text, clx, Button } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (newQty: number) => {
    if (newQty < 1) return
    setError(null)
    setUpdating(true)
    try {
      await updateLineItem({ lineId: item.id, quantity: newQty })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  const maxQtyFromInventory = item.variant?.inventory_quantity ?? 10
  const maxQuantity = item.variant?.manage_inventory
    ? Math.max(item.quantity, Math.min(maxQtyFromInventory, 10))
    : Math.max(item.quantity, 10)

  const increment = () => {
    const next = Math.min(quantity + 1, maxQuantity)
    setQuantity(next)
    changeQuantity(next)
  }

  const decrement = () => {
    const next = Math.max(quantity - 1, 1)
    setQuantity(next)
    changeQuantity(next)
  }

  return (
    <Table.Row
      className={clx(
        "relative w-full transition-all duration-200",
        updating && "opacity-50 blur-[1px] pointer-events-none"
      )}
      data-testid="product-row"
    >
      {/* Overlay when updating */}
      {updating && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}

      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base" data-testid="product-title">
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex items-center gap-3">
            <DeleteButton id={item.id} data-testid="product-delete-button" />

            {/* Quantity Stepper */}
            <div className="flex items-center rounded-md">
              <Button
                variant="secondary"
                className="w-8 h-8"
                onClick={decrement}
                disabled={quantity <= 1 || updating}
              >
                −
              </Button>
              <span className="px-3 w-8 text-center">{quantity}</span>
              <Button
                variant="secondary"
                className="w-8 h-8"
                onClick={increment}
                disabled={quantity >= maxQuantity || updating}
              >
                +
              </Button>
            </div>
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
