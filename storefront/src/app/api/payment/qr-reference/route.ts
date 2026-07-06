import { saveQrReference } from "@lib/payment"

export async function POST(req: Request) {
  try {
    const { cartId, transactionId, bankName } = await req.json()
    const data = await saveQrReference(cartId, transactionId, bankName)
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message ?? "Failed to save reference" }),
      { status: 500 }
    )
  }
}
