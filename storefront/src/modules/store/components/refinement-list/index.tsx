"use client"

import { listCategories } from "@lib/list-categories"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef, useCallback } from "react"
import SortProducts, { SortOptions } from "./sort-products"
import { IoMdClose } from "react-icons/io"
import { LuSlidersHorizontal } from "react-icons/lu"

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
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Fetch categories
  useEffect(() => {
    listCategories().then(setCategories)
  }, [])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

  // Close on outside click — stable ref via useCallback
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false)
    }
  }, [])

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsSidebarOpen(false)
  }, [])

  useEffect(() => {
    if (!isSidebarOpen) return
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isSidebarOpen, handleClickOutside, handleEscapeKey])

  // Close sidebar on route change (user selected a category)
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const handleSortChange = (_name: string, value: SortOptions) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("sortBy", value)
    router.push(`${pathname}?${searchParams.toString()}`)
  }

  const handleCategoryClick = (handle: string) => {
    router.push(`/categories/${handle}`)
  }

  const isActive = (handle: string) =>
    pathname.endsWith(`/categories/${handle}`)

  // ── Shared category list ────────────────────────────────────────────────
  const CategoryList = () => (
    <div className="flex flex-col gap-1">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleCategoryClick(cat.value)}
          className={`
            flex items-center gap-3 w-full text-left
            px-1 py-2.5  rounded-lg
            text-sm font-medium transition-colors
            min-h-[44px]
            ${
              isActive(cat.value)
                ? "bg-[#C5A163]/10 text-[#C5A163] font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {/* Active indicator dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
              isActive(cat.value) ? "bg-[#C5A163]" : "bg-transparent"
            }`}
          />
          {cat.label}
        </button>
      ))}
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar (hidden on mobile) ──────────────────────────── */}
      <div className="hidden small:flex flex-col gap-8 py-4 small:min-w-[220px] small:ml-[1.675rem] pr-4">
        <SortProducts
          sortBy={sortBy}
          setQueryParams={handleSortChange}
          data-testid={dataTestId}
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 px-3">
            Categories
          </h3>
          <CategoryList />
        </div>
      </div>

      {/* ── Mobile: sort + filter trigger (hidden on desktop) ───────────── */}
      <div className="flex flex-col md:flex-row small:hidden items-center gap-3 py-3 px-1">
        <SortProducts
          sortBy={sortBy}
          setQueryParams={handleSortChange}
          data-testid={dataTestId}
        />

        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Filter by categories"
          aria-expanded={isSidebarOpen}
          className="
            flex items-center gap-2 ml-auto
            px-4 h-10 rounded-lg
            border border-gray-200 bg-white
            text-sm font-medium text-gray-700
            hover:bg-gray-50 active:scale-95 transition
          "
        >
          <LuSlidersHorizontal size={15} />
          Filter
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 small:hidden
          transition-opacity duration-300
          ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from left */}
      <div
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter categories"
        className={`
          fixed top-0 left-0 h-full w-[280px] max-w-[85vw]
          bg-white z-50 small:hidden
          flex flex-col
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Categories</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close filter"
            className="
              w-10 h-10 flex items-center justify-center
              rounded-full hover:bg-gray-100
              text-gray-500 transition-colors
            "
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Category list */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <CategoryList />
        </div>

        {/* Done button — easy thumb reach at bottom */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="
              w-full h-11 rounded-lg
              bg-black text-white
              text-sm font-medium
              active:scale-[0.98] transition
            "
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}

export default RefinementList
