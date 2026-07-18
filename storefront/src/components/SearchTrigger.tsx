"use client"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import SearchModal from "./SearchModal"
import { CiSearch } from "react-icons/ci"

export default function SearchTrigger({
  countryCode,
}: {
  countryCode: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: pill with label */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="lg:min-w-32"
      >
        <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-[#F0F0F0] hover:bg-gray-200/50 transition-all duration-200">
          <CiSearch className="w-4 h-4 text-black" />
          <span className="text-sm text-gray-500">Search...</span>
        </div>
      </button>

      <SearchModal
        isOpen={open}
        onClose={() => setOpen(false)}
        countryCode={countryCode}
      />
    </>
  )
}
