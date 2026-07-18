import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { FiBox } from "react-icons/fi" // Empty state icon

const PRODUCT_LIMIT = 12

async function fetchCategories() {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/store/product-categories?limit=1000`,
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        },
      }
    )
    const data = await res.json()
    return data.product_categories
  } catch (err) {
    console.error("Error fetching categories:", err)
    return []
  }
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  query,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string[]
  productsIds?: string[]
  countryCode: string
  query?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) queryParams.collection_id = [collectionId]
  if (categoryId) queryParams.category_id = categoryId
  if (productsIds) queryParams.id = productsIds
  if (sortBy === "created_at") queryParams.order = "created_at"
  if (query) queryParams.q = query

  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  // Empty state UI
  if (products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center text-gray-600">
        <FiBox size={60} className="mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-2">No products found</h2>
        {query && (
          <p className="mb-4 text-gray-500">
            We couldn’t find any products for{" "}
            <span className="font-medium">"{query}"</span>.
          </p>
        )}
        {!query && categoryId && (
          <p className="mb-4 text-gray-500">
            There are no products in this category yet.
          </p>
        )}
        {!query && !categoryId && (
          <p className="mb-4 text-gray-500">
            Products are not available at the moment. Please check back later.
          </p>
        )}
        <a
          href="/shop"
          className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition font-medium"
        >
          Browse All Products
        </a>
      </div>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} region={region} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
