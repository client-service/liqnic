// @lib/list-categories.ts
export async function listCategories() {
  try {
    // Fetch from your API route
    const res = await fetch("/api/categories")
    if (!res.ok) throw new Error("Failed to fetch categories")

    const categories = await res.json() // raw category objects from API
    console.log("Raw categories from API:", categories)

    // Flatten all categories into { value, label }
    const flat: { value: string; label: string }[] = []

    categories.forEach((cat: any) => {
      flat.push({ value: cat.handle, label: cat.name })

      if (Array.isArray(cat.category_children)) {
        cat.category_children.forEach((child: any) => {
          flat.push({ value: child.handle, label: child.name })
        })
      }
    })

    console.log("Flattened categories:", flat)
    return flat
  } catch (err) {
    console.error("Error fetching categories:", err)
    return []
  }
}
