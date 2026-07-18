import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import Link from "next/link"

export default async function ModalProductRail({
  region,
  limit = 6,
}: {
  region: HttpTypes.StoreRegion
  limit?: number
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit },
  })

  if (!pricedProducts?.length) return null

  return (
    <div className="py-4">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
