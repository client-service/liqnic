"use client"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Table, Text, clx } from "@medusajs/ui"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import { useState, useTransition } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const changeQuantity = (newQuantity: number) => {
    setError(null)
    setIsUpdating(true)

    // Push the heavy server update to the background
    startTransition(async () => {
      try {
        await updateLineItem({ lineId: item.id, quantity: newQuantity })
      } catch (err: any) {
        setError(err.message || "Failed to update quantity")
      } finally {
        setIsUpdating(false)
      }
    })
  }

  const loading = isUpdating || isPending

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full relative" data-testid="product-row">
      <Table.Cell className="!pl-0 p-8 md:p-12 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <img
            src={item?.thumbnail}
            alt={item?.product_title}
            className="w-full h-full object-cover rounded"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-4 lg:mt-8">
          {/* <span className="text-gray-600 text-xs sm:text-sm font-medium">
            Quantity
          </span> */}

          {type === "full" && (
            <Table.Cell>
              <div className="flex gap-2 items-center w-28">
                <CartItemSelect
                  value={item.quantity}
                  disabled={loading} // <-- CRITICAL: Prevents spamming actions
                  onChange={(value) =>
                    changeQuantity(parseInt(value.target.value))
                  }
                  className="w-14 h-10 p-4"
                  data-testid="product-select-button"
                >
                  {/* TODO: Update this with the v2 way of managing inventory */}
                  {Array.from(
                    {
                      length: Math.min(maxQuantity, 10),
                    },
                    (_, i) => (
                      <option value={i + 1} key={i}>
                        {i + 1}
                      </option>
                    )
                  )}

                  <option value={1} key={1}>
                    1
                  </option>
                </CartItemSelect>
                {loading && <Spinner />}
              </div>
              <ErrorMessage error={error} data-testid="product-error-message" />
            </Table.Cell>
          )}
        </div>
      </Table.Cell>

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
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>

      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-end pb-8">
        <DeleteButton
          id={item.id}
          className="pointer-events-auto"
          data-testid="product-delete-button"
        />
      </div>
    </Table.Row>
  )
}

export default Item
