import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import Link from "next/link"

export default async function ProductRail({
  region,
  limit = 8,
  columns = 4,
}: {
  region: HttpTypes.StoreRegion
  limit?: number
  columns?: 3 | 4
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit },
  })

  if (!pricedProducts?.length) return null

  return (
    <div className="py-2 lg:py-4">
      <ul
        className={`
          grid grid-cols-2
          md:grid-cols-3
          ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}
          gap-3 sm:gap-4 lg:gap-6
        `}
      >
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
