"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FiSearch, FiX } from "react-icons/fi"

type SearchBarProps = {
  initialQuery?: string
}

const SearchBar = ({ initialQuery = "" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  // Track if this is the first render — prevents debounce firing on mount
  const isMounted = useRef(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const navigate = (term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term.trim()) {
      params.set("query", term.trim())
    } else {
      params.delete("query")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  // Debounced search — skips the initial mount render
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    const delay = setTimeout(() => navigate(searchTerm), 500)
    return () => clearTimeout(delay)
  }, [searchTerm, pathname, searchParams]) // all deps included

  const handleClear = () => {
    setSearchTerm("")
    navigate("")
  }

  return (
    <div className="w-full">
      {/* Label visible only on sm+ — saves vertical space on mobile */}
      <label
        htmlFor="search-input"
        className="hidden sm:block mb-2 text-sm font-medium text-gray-700"
      >
        Search Products
      </label>

      <div className="relative w-full flex items-center">
        {/* Search icon */}
        <span className="absolute left-3 text-gray-400 pointer-events-none">
          <FiSearch size={18} />
        </span>

        <input
          id="search-input"
          type="search" // enables native clear on mobile + correct keyboard
          inputMode="search" // shows search keyboard on iOS/Android
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate(searchTerm)}
          placeholder="Search products..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="
            w-full h-11 sm:h-12
            pl-9 pr-10              
            rounded-lg border border-gray-200
            bg-white text-sm text-gray-900
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#C5A163]/40 focus:border-[#C5A163]
            transition-colors
          "
          // No right-side Search button — on mobile the keyboard has a Search/Go key
          // On desktop, 500ms debounce handles it automatically
        />

        {/* Clear button — only shown when there's a value */}
        {searchTerm && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="
              absolute right-2.5
              w-6 h-6 flex items-center justify-center
              rounded-full bg-gray-100 hover:bg-gray-200
              text-gray-500 transition-colors
            "
          >
            <FiX size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
