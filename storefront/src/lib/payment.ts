function getBackendUrl() {
  const url =
    process.env.MEDUSA_BACKEND_URL ||
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
    "http://localhost:9000"
  return url
}

function getHeaders() {
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""
  return {
    "Content-Type": "application/json",
    "x-publishable-api-key": key,
  }
}

export async function initPaymentSession(cartId: string, providerId: string) {
  const colRes = await fetch(`${getBackendUrl()}/store/payment-collections`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ cart_id: cartId }),
  })

  if (!colRes.ok) {
    const body = await colRes.json().catch(() => ({}))
    console.error("[initPaymentSession] collection error:", body)
    throw new Error(
      body?.message ?? `Failed to create payment collection (${colRes.status})`
    )
  }

  const { payment_collection } = await colRes.json()

  const sesRes = await fetch(
    `${getBackendUrl()}/store/payment-collections/${
      payment_collection.id
    }/payment-sessions`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ provider_id: providerId }),
    }
  )

  if (!sesRes.ok) {
    const body = await sesRes.json().catch(() => ({}))
    console.error("[initPaymentSession] session error:", body)
    throw new Error(
      body?.message ?? `Failed to init payment session (${sesRes.status})`
    )
  }

  const data = await sesRes.json()
  return data
}

export async function saveQrReference(
  cartId: string,
  transactionId: string,
  bankName?: string
) {
  const res = await fetch(`${getBackendUrl()}/store/carts/${cartId}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      metadata: {
        qr_transaction_id: transactionId,
        ...(bankName ? { qr_bank_name: bankName } : {}),
      },
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    console.error("[saveQrReference] error:", body)
    throw new Error(body?.message ?? `Failed to save reference (${res.status})`)
  }

  const data = await res.json()
  return data
}
