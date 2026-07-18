import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents: HttpTypes.StoreProductCategory[] = []
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }
  getParents(category)

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {/* Sidebar: Refinement / Sorting */}
      <RefinementList sortBy={sort} data-testid="sort-by-container" />

      <div className="w-full">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1 mb-4 text-sm sm:text-base">
          {parents.map((parent) => (
            <span
              key={parent.id}
              className="text-gray-500 flex items-center gap-1"
            >
              <LocalizedClientLink
                href={`/categories/${parent.handle}`}
                className="hover:text-black transition-colors"
                data-testid="category-breadcrumb-link"
              >
                {parent.name}
              </LocalizedClientLink>
              <span className="text-gray-400">{">"}</span>
            </span>
          ))}
          <span className="font-semibold text-black">{category.name}</span>
        </div>

        {/* Category Description */}
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}

        {/* Child Categories */}
        {/* {category.category_children &&
          category.category_children.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Subcategories</h3>
              <ul className="flex flex-wrap gap-2">
                {category.category_children.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/categories/${c.handle}`}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

        {/* Products */}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category?.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
