"use client"

import { Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import { CiShoppingBasket } from "react-icons/ci"
import { LuShoppingCart } from "react-icons/lu"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-32 px-4 bg-ui-bg-base/40 "
      data-testid="empty-cart-message"
    >
      {/* Icon */}
      <div className="p-6 rounded-full bg-primary/10 text-primary mb-6">
        <LuShoppingCart className="w-10 h-10" />
      </div>

      {/* Title */}
      <Heading
        level="h1"
        className="text-3xl font-semibold text-ui-fg-base mb-2"
      >
        Your cart is empty !
      </Heading>

      {/* Description */}
      <Text className="text-base text-ui-fg-subtle max-w-md mb-8">
        Looks like you haven&apos;t added anything yet. Discover amazing
        products and find something you love!
      </Text>

      {/* Button */}
      <Link
        href="/shop"
        className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md"
      >
        Explore Products
      </Link>
    </div>
  )
}

export default EmptyCartMessage
