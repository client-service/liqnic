"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

type Props = {
  children: React.ReactNode
}

export default function UpsellModal({ children }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("upsellShown")

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem("upsellShown", "true")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              You might also like
            </h2>
            <p className="text-sm text-gray-500">
              Add more products before checkout
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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

        {/* Products */}
        <div className="px-4 lg:px-8 py-2">{children}</div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            No thanks
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
