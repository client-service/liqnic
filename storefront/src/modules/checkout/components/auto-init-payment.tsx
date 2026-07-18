"use client"

import { initiatePaymentSession } from "@lib/data/cart"
import { useEffect } from "react"

/**
 * Invisible client component that fires initiatePaymentSession once on mount.
 * Renders nothing — purely a side-effect component.
 */
const AutoInitPayment = ({
  cart,
  providerId,
}: {
  cart: any
  providerId: string
}) => {
  useEffect(() => {
    initiatePaymentSession(cart, { provider_id: providerId }).catch(() => {
      // silently ignore — review will surface any real errors
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default AutoInitPayment
