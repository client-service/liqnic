export async function fetchCategories(parentId?: string) {
  try {
    const url = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/store/product-categories`
    )
    url.searchParams.set("limit", "1000")
    url.searchParams.set("parent_category_id", parentId || "null")

    const res = await fetch(url.toString(), {
      headers: {
        "x-publishable-api-key":
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
      },
    })
    const data = await res.json()
    console.log("categories test 2", data)

    return data.product_categories || []
  } catch (err) {
    console.error("Error fetching categories:", err)
    return []
  }
}

export async function fetchProductsByCategory(categoryId: string) {
  try {
    const url = new URL(`${process.env.MEDUSA_BACKEND_URL}/store/products`)
    url.searchParams.set("limit", "100")
    url.searchParams.set("category_id", categoryId)

    const res = await fetch(url.toString(), {
      headers: {
        "x-publishable-api-key":
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
      },
    })
    const data = await res.json()
    return data.products || []
  } catch (err) {
    console.error("Error fetching products:", err)
    return []
  }
}
