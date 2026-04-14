"use client"

import { listCategories } from "@lib/list-categories"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import SortProducts, { SortOptions } from "./sort-products"
import { IoMdClose } from "react-icons/io"

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Ref for detecting clicks outside the sidebar
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Fetch categories data
  useEffect(() => {
    async function fetchData() {
      const result = await listCategories()
      setCategories(result)
    }
    fetchData()
  }, [])

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768) // Adjust breakpoint as necessary
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle sorting changes
  const handleSortChange = (_name: string, value: SortOptions) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("sortBy", value)
    router.push(`${pathname}?${searchParams.toString()}`)
  }

  // Navigate to category page on checkbox click
  const handleCategoryClick = (handle: string) => {
    router.push(`/categories/${handle}`)
  }

  // Check if the current path matches category
  const isChecked = (handle: string) => {
    return pathname.endsWith(`/categories/${handle}`)
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close the sidebar if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false)
    }
  }

  // Close the sidebar if ESC key is pressed
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSidebarOpen(false)
    }
  }

  // Attach event listeners
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    // Cleanup the event listeners
    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isSidebarOpen])

  return (
    <div className="flex flex-col gap-5 small:gap-12 py-4 mb-8 small:px-0 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts
        sortBy={sortBy}
        setQueryParams={handleSortChange}
        data-testid={dataTestId}
      />

      {/* Categories for larger screens */}
      <div className="hidden small:block">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex flex-col gap-2 w-full">
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

      {/* Filter button (only visible on small screens) */}
      {isSmallScreen && (
        <button
          onClick={toggleSidebar}
          className="small:hidden bg-primary text-white py-2 px-4 rounded-md"
        >
          Filter by Categories
        </button>
      )}

      {/* Sidebar (only visible on small screens when open) */}
      {isSmallScreen && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div ref={sidebarRef} className="w-[250px] h-full bg-white p-4">
            <div className="flex flex-row items-center justify-between">
              <h3 className="font-semibold mb-2">Categories</h3>
              <button onClick={toggleSidebar} className="py-2 px-4 text-lg">
                <IoMdClose />
              </button>
            </div>
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
      )}
    </div>
  )
}

export default RefinementList
