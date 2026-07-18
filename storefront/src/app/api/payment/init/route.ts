import { retrieveCart, initiatePaymentSession } from "@lib/data/cart"

export async function POST(req: Request) {
  try {
    const { cartId, providerId } = await req.json()

    // initiatePaymentSession needs the full cart object, not just the ID
    const cart = await retrieveCart(cartId)
    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
      })
    }

    const data = await initiatePaymentSession(cart, { provider_id: providerId })
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message ?? "Failed to init payment" }),
      { status: 500 }
    )
  }
}
