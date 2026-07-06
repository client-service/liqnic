// app/api/products/search/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") ?? ""
  const limit = searchParams.get("limit") ?? "6"

  const medusaUrl = process.env.MEDUSA_BACKEND_URL
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  try {
    const res = await fetch(
      `${medusaUrl}/store/products?q=${encodeURIComponent(
        q
      )}&limit=${limit}&fields=id,title,handle,thumbnail,categories,subtitle`,
      {
        headers: {
          "x-publishable-api-key": publishableKey ?? "",
        },
        cache: "no-store",
      }
    )

    if (!res.ok) return NextResponse.json({ products: [] })

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ products: [] })
  }
}
