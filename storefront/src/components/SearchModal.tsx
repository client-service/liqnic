// @modules/layout/components/search-modal/index.tsx
"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FiSearch, FiX, FiArrowRight, FiClock } from "react-icons/fi"
import { createPortal } from "react-dom"

type ProductSuggestion = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  category: string | null
  subtitle: string | null
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  countryCode: string
}

// Recent searches — stored in localStorage
const STORAGE_KEY = "liqnic_recent_searches"
const MAX_RECENT = 5

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

function saveRecentSearch(term: string) {
  const existing = getRecentSearches().filter((s) => s !== term)
  const updated = [term, ...existing].slice(0, MAX_RECENT)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export default function SearchModal({
  isOpen,
  onClose,
  countryCode,
}: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Portal mount
  useEffect(() => setMounted(true), [])

  // Load recent searches on open
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches())
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      // Reset on close
      setQuery("")
      setSuggestions([])
      setActiveIndex(-1)
    }
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  // Fetch suggestions
  const fetchSuggestions = useCallback(
    async (q: string) => {
      if (!q.trim() || q.trim().length < 2) {
        setSuggestions([])
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(
            q
          )}&limit=7&countryCode=${countryCode}`
        )
        const data = await res.json()
        const mapped: ProductSuggestion[] = (data.products ?? []).map(
          (p: any) => ({
            id: p.id,
            title: p.title,
            handle: p.handle,
            thumbnail: p.thumbnail ?? null,
            category: p.categories?.[0]?.name ?? null,
            subtitle: p.subtitle ?? null,
          })
        )
        setSuggestions(mapped)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [countryCode]
  )

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(query), 350)
    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  const goToProduct = (handle: string) => {
    router.push(`/products/${handle}`)
    onClose()
  }

  const goToSearch = (term: string) => {
    if (!term.trim()) return
    saveRecentSearch(term.trim())
    router.push(`/shop?query=${encodeURIComponent(term.trim())}`)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = suggestions.length
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, total - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        goToProduct(suggestions[activeIndex].handle)
      } else {
        goToSearch(query)
      }
    }
  }

  const showSuggestions = query.length >= 2
  const showEmpty = showSuggestions && !loading && suggestions.length === 0
  const showRecent = !query && recentSearches.length > 0

  if (!mounted) return null

  return createPortal(
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-50
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Modal panel ──────────────────────────────────────────────── */}
      <div
        className={`
          fixed z-50
          top-[72px] left-1/2 -translate-x-1/2
          w-[92vw] max-w-[640px]
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }
        `}
      >
        {/* Search input card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden">
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
            <FiSearch
              size={18}
              className={`flex-shrink-0 transition-colors duration-200 ${
                query ? "text-[#C5A163]" : "text-gray-400"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search whisky, rum, nicotine..."
              autoComplete="off"
              spellCheck={false}
              className="
                flex-1 h-8 text-[15px] text-gray-900
                placeholder:text-gray-400
                bg-transparent border-none outline-none
                font-manrope
              "
            />
            {/* Loading spinner */}
            {loading && (
              <span className="flex-shrink-0 w-4 h-4 border-2 border-gray-200 border-t-[#C5A163] rounded-full animate-spin" />
            )}
            {/* Clear */}
            {query && !loading && (
              <button
                onClick={() => {
                  setQuery("")
                  setSuggestions([])
                  inputRef.current?.focus()
                }}
                aria-label="Clear search"
                className="flex-shrink-0 p-1 text-xs px-2 text-gray-500 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                Clear
              </button>
            )}
            {/* Close modal */}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-1"
            >
              <span className=" font-medium font-manrope  rounded px-1.5 py-0.5 text-gray-700">
                <FiX />
              </span>
            </button>
          </div>

          {/* ── Body ──────────────────────────────────────────────────── */}

          {/* Recent searches */}
          {showRecent && (
            <div className="py-3">
              <p className="px-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-manrope">
                Recent
              </p>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    goToSearch(term)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
                >
                  <FiClock
                    size={14}
                    className="text-gray-300 flex-shrink-0 group-hover:text-[#C5A163] transition-colors"
                  />
                  <span className="text-sm text-gray-600 font-manrope group-hover:text-gray-900 transition-colors">
                    {term}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && !loading && suggestions.length > 0 && (
            <ul className="py-2">
              {suggestions.map((product, i) => (
                <li key={product.id}>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault()
                      goToProduct(product.handle)
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3
                      text-left transition-colors duration-100
                      ${
                        activeIndex === i
                          ? "bg-amber-50/70"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiSearch size={14} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 font-manrope truncate leading-snug">
                        {product.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {product.category && (
                          <span className="text-[11px] text-[#C5A163] font-manrope font-medium">
                            {product.category}
                          </span>
                        )}
                        {product.category && product.subtitle && (
                          <span className="text-gray-200 text-[11px]">•</span>
                        )}
                        {product.subtitle && (
                          <span className="text-[11px] text-gray-400 font-manrope truncate">
                            {product.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <FiArrowRight
                      size={14}
                      className={`flex-shrink-0 transition-all duration-100 ${
                        activeIndex === i
                          ? "text-[#C5A163] translate-x-0.5"
                          : "text-gray-200"
                      }`}
                    />
                  </button>
                </li>
              ))}

              {/* See all footer */}
              <div className="mt-1 mx-3 border-t border-gray-100 pt-2 pb-1">
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    goToSearch(query)
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#C5A163] hover:text-[#b08b4f] font-manrope transition-colors rounded-lg hover:bg-amber-50/50"
                >
                  See all results for{" "}
                  <span className="font-semibold">"{query}"</span>
                  <FiArrowRight size={12} />
                </button>
              </div>
            </ul>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-400 font-manrope">
                No products found for{" "}
                <span className="text-gray-600 font-medium">"{query}"</span>
              </p>
              <p className="text-xs text-gray-300 font-manrope mt-1">
                Try a different name or browse all products
              </p>
            </div>
          )}

          {/* Default empty state — no query, no recent */}
          {!query && recentSearches.length === 0 && (
            <div className="px-4 py-7 text-center">
              <p className="text-sm text-gray-300 font-manrope">
                Start typing to search products
              </p>
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        {/* <p className="text-center mt-2.5 text-[11px] text-white/60 font-manrope">
          <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd>{" "}
          to navigate &nbsp;·&nbsp; <kbd className="font-sans">↵</kbd> to select
          &nbsp;·&nbsp; <kbd className="font-sans">ESC</kbd> to close
        </p> */}
      </div>
    </>,
    document.body
  )
}
