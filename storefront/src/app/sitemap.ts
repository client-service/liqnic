import { MetadataRoute } from "next"

// ─── IMPORTANT ───────────────────────────────────────────────────────────────
// force-dynamic tells Next.js to generate the sitemap at REQUEST time,
// not at build time. This prevents CI build timeouts when the Medusa
// backend isn't reachable during the Docker build.
export const dynamic = "force-dynamic"

const BASE_URL = "https://liqnic.com"
const COUNTRY = "np" // your default country code

// ─── Medusa data fetchers ────────────────────────────────────────────────────
// These call your Medusa backend directly (server-side, no auth needed for
// public product/collection endpoints).

async function getProducts(): Promise<
  { handle: string; updated_at: string }[]
> {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/products?limit=1000&fields=handle,updated_at`,
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        cache: "no-store",
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
  } catch {
    return []
  }
}

async function getCategories(): Promise<
  { handle: string; updated_at: string }[]
> {
  try {
    const backendUrl =
      process.env.MEDUSA_BACKEND_URL ||
      process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

    const res = await fetch(
      `${backendUrl}/store/product-categories?limit=100&fields=handle,updated_at`,
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        cache: "no-store",
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.product_categories ?? [] // ← was data.categories
  } catch (e) {
    console.error("Categories fetch error:", e)
    return []
  }
}
// ─── Sitemap ─────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  console.log("Sitemap — products:", products.length)
  console.log("Sitemap — categories:", categories.length)

  // ── Static pages ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${COUNTRY}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${COUNTRY}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${COUNTRY}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/${COUNTRY}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // ── Collection pages ─────────────────────────────────────────────────────
  const categoriesPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/${COUNTRY}/categories/${c.handle}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // ── Product pages ────────────────────────────────────────────────────────
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/${COUNTRY}/products/${p.handle}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoriesPages, ...productPages]
}
