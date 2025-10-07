// app/api/categories/route.ts
import { fetchCategories } from "@lib/get-categories"

export async function GET() {
  try {
    const categories = await fetchCategories()
    return new Response(JSON.stringify(categories), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      { status: 500 }
    )
  }
}
