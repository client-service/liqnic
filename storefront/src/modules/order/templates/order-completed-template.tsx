import { cookies as nextCookies } from "next/headers"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import PrintInvoiceButton from "./print-invoice-button"
import { FaCheckCircle } from "react-icons/fa"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-[calc(100vh-64px)] relative bg-gray-50/50">
      {/* Watermark — subtle background image */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.04]">
        <Image
          src="/images/order-confirm.png"
          alt=""
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        <div
          data-testid="order-complete-container"
          className="flex flex-col gap-5"
        >
          {/* ── Success header ──────────────────────────────────────────── */}
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <div className="w-16 h-16 rounded-full bg-[#C5A163]/10 flex items-center justify-center mb-1">
              <FaCheckCircle className="text-[#C5A163]" size={34} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Thank you!
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Your order was placed successfully.
            </p>
          </div>

          {/* ── Actions ─────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <PrintInvoiceButton order={order} />
          </div>

          {/* ── Order details card ──────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-5">
            <OrderDetails order={order} />
          </div>

          {/* ── Items card ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-gray-900">
              Order Summary
            </h2>
            <Items order={order} />
            <div className="border-t border-gray-100 pt-4">
              <CartTotals totals={order} />
            </div>
          </div>

          {/* ── Shipping card ───────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
            <ShippingDetails order={order} />
          </div>

          <Help />
        </div>
      </div>
    </div>
  )
}
