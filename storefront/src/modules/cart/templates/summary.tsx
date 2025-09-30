"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>

      <CartTotals totals={cart} />

      <DiscountCode cart={cart} />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
          className="w-full"
        >
          <button className="w-full py-3 px-4 bg-primary text-white text-sm font-medium rounded hover:bg-brand-primary transition-colors">
            Go to Checkout
          </button>
        </LocalizedClientLink>
        <LocalizedClientLink href="/" className="w-full">
          <div className="w-full py-3 px-4 border border-gray-500 text-black text-sm font-medium rounded hover:bg-gray-50 text-center transition-colors">
            Continue Shopping
          </div>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary
