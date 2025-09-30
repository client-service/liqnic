"use client"

import { listCategories } from "@lib/list-categories"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([])

  const handleSortChange = (_name: string, value: SortOptions) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("sortBy", value)
    router.push(`${pathname}?${searchParams.toString()}`)
  }

  useEffect(() => {
    async function fetchData() {
      const result = await listCategories()
      setCategories(result)
    }
    fetchData()
  }, [])

  // Navigate to category page on checkbox click
  const handleCategoryClick = (handle: string) => {
    router.push(`/categories/${handle}`)
  }

  // Check if the current path matches category
  const isChecked = (handle: string) => {
    return pathname.endsWith(`/categories/${handle}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts
        sortBy={sortBy}
        setQueryParams={handleSortChange}
        data-testid={dataTestId}
      />

      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories?.map((cat) => (
            <label
              key={cat.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked(cat.value)}
                onChange={() => handleCategoryClick(cat.value)}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RefinementList
