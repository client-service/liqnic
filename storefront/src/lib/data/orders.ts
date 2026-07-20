"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: "GET",
      query: {
        fields:
          "id,display_id,email,currency_code,created_at,payment_status,fulfillment_status,total,subtotal,tax_total,shipping_total,discount_total,gift_card_total,shipping_methods.name,shipping_methods.total,shipping_address.first_name,shipping_address.last_name,shipping_address.address_1,shipping_address.address_2,shipping_address.city,shipping_address.country_code,shipping_address.province,shipping_address.postal_code,shipping_address.phone,shipping_address.company,billing_address.first_name,billing_address.last_name,billing_address.address_1,billing_address.address_2,billing_address.city,billing_address.country_code,billing_address.province,billing_address.postal_code,billing_address.phone,billing_address.company,payment_collections.payments.provider_id,payment_collections.payments.amount,items.id,items.title,items.variant_title,items.product_title,items.product_handle,items.quantity,items.unit_price,items.total,items.subtotal,items.tax_total,items.thumbnail,items.metadata,items.tax_lines.rate,items.tax_lines.code,items.variant.id,items.variant.title,items.variant.sku,items.product.id,items.product.title,items.product.handle,items.product.thumbnail",
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ order }) => order)
    .catch((err) => medusaError(err))
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, any>
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      method: "GET",
      query: {
        limit,
        offset,
        order: "-created_at",
        fields:
          "id,display_id,email,currency_code,created_at,payment_status,fulfillment_status,total,items.id,items.title,items.variant_title,items.product_title,items.product_handle,items.quantity,items.unit_price,items.total,items.thumbnail,+items.metadata,items.variant.id,items.variant.title,items.variant.sku,items.product.id,items.product.title,items.product.handle,items.product.thumbnail",
        ...filters,
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err))
}

export const createTransferRequest = async (
  state: {
    success: boolean
    error: string | null
    order: HttpTypes.StoreOrder | null
  },
  formData: FormData
): Promise<{
  success: boolean
  error: string | null
  order: HttpTypes.StoreOrder | null
}> => {
  const id = formData.get("order_id") as string

  if (!id) {
    return { success: false, error: "Order ID is required", order: null }
  }

  const headers = await getAuthHeaders()

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}
