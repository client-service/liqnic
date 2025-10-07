"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FiSearch } from "react-icons/fi"

type SearchBarProps = {
  initialQuery?: string
}

const SearchBar = ({ initialQuery = "" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm) {
      params.set("query", searchTerm)
    } else {
      params.delete("query")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor="search-input"
        className="block mb-2 text-gray-700 font-medium"
      >
        Search Products
      </label>
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch size={20} />
        </span>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Searh with product name"
          className="w-full pl-10 pr-28 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-[0.5px] focus:ring-primary focus:border-primary transition shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1 bottom-1 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
