"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"
import { LuChevronLeft } from "react-icons/lu"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-5">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">
          Order details
        </h1>
        <LocalizedClientLink
          href="/account/orders"
          data-testid="back-to-overview-button"
          className="
            flex items-center gap-1.5
            text-sm font-medium text-gray-500
            hover:text-gray-900 transition-colors
            min-h-[44px]
          "
        >
          <LuChevronLeft size={16} />
          Back to orders
        </LocalizedClientLink>
      </div>

      {/* ── Content cards ───────────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-4"
        data-testid="order-details-container"
      >
        {/* Order meta */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <OrderDetails order={order} showStatus />
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-900">Items</h2>
          <Items order={order} />
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <ShippingDetails order={order} />
        </div>

        {/* Summary / totals */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <OrderSummary order={order} />
        </div>

        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
