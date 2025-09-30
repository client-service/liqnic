// import { listProducts } from "@lib/data/products"
// import { HttpTypes } from "@medusajs/types"
// import { Text } from "@medusajs/ui"

// import InteractiveLink from "@modules/common/components/interactive-link"
// import ProductPreview from "@modules/products/components/product-preview"

// export default async function ProductRail({
//   collection,
//   region,
// }: {
//   collection: HttpTypes.StoreCollection
//   region: HttpTypes.StoreRegion
// }) {
//   const {
//     response: { products: pricedProducts },
//   } = await listProducts({
//     regionId: region.id,
//     queryParams: {
//       collection_id: collection.id,
//       fields: "*variants.calculated_price",
//     },
//   })

//   if (!pricedProducts) {
//     return null
//   }

//   return (
//     <div className="content-container py-4 lg:py-8">
//       <div className="flex justify-between mb-8">
//         <Text className="txt-xlarge">{collection.title}</Text>
//         <InteractiveLink href={`/collections/${collection.handle}`}>
//           View all
//         </InteractiveLink>
//       </div>
//       <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
//         {pricedProducts &&
//           pricedProducts.map((product) => (
//             <li key={product.id}>
//               <ProductPreview product={product} region={region} isFeatured />
//             </li>
//           ))}
//       </ul>
//     </div>
//   )
// }

import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import Link from "next/link"

export default async function ProductRail({
  region,
  limit = 8, // default limit
}: {
  region: HttpTypes.StoreRegion
  limit?: number
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      fields: "*variants.calculated_price",
      limit,
    },
  })

  if (!pricedProducts?.length) {
    return null
  }

  return (
    <div className="content-container py-4 lg:py-8">
      <div className="flex justify-between mb-8">
        {/* <Text className="txt-xlarge">Featured Products</Text>  */}
        <div></div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          View all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
