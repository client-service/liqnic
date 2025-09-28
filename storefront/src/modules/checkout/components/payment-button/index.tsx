"use client"

import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const handlePayment = async () => {
    setSubmitting(true)

    try {
      // ✅ Ensure cart has a proper COD payment_collection
      if (!cart.payment_collection) {
        cart.payment_collection = {
          id: "fake-cod-collection",
          status: "authorized",
          currency_code: cart.region?.currency_code || "usd",
          amount: cart.total,
          payment_sessions: [],
          payment_providers: [],
        }
      }

      // ✅ Add a fake COD payment session
      if (
        !cart.payment_collection.payment_sessions?.find(
          (ps) => ps.provider_id === "pp_system_default"
        )
      ) {
        cart?.payment_collection?.payment_sessions?.push({
          id: "fake-cod-session",
          provider_id: "pp_system_default",
          status: "pending",
          amount: cart.total,
          currency_code: cart.region?.currency_code || "npr",
          data: {},
        })
      }

      await placeOrder()
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId}
        className="bg-primary"
      >
        Place order
      </Button>

      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
