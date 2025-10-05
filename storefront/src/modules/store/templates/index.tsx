import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import SearchBar from "../components/search-product"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  query, // <-- new
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  query: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <section>
      <div
        className="flex flex-col small:flex-row small:items-start py-6 content-container bg-gray-50"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full ">
          <SearchBar initialQuery={query} />
          <div className="mb-8 text-2xl-semi mt-5">
            <h1 data-testid="store-page-title">All products</h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              query={query}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default StoreTemplate
