"use client"

import { FaArrowDown, FaArrowUp, FaClock } from "react-icons/fa"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SORT_OPTIONS: {
  value: SortOptions
  label: string
  icon: React.ReactNode
}[] = [
  {
    value: "created_at",
    label: "Latest",
    icon: <FaClock size={11} />,
  },
  {
    value: "price_asc",
    label: "Low → High",
    icon: <FaArrowDown size={11} />,
  },
  {
    value: "price_desc",
    label: "High → Low",
    icon: <FaArrowUp size={11} />,
  },
]

const SortProducts = ({
  sortBy,
  setQueryParams,
  "data-testid": dataTestId,
}: SortProductsProps) => {
  return (
    <div data-testid={dataTestId}>
      {/* ── Mobile: horizontal pill strip ───────────────────────────────────
          Compact horizontal layout — fits inline next to the Filter button
          in the RefinementList mobile bar
      ──────────────────────────────────────────────────────────────────── */}
      <div className="flex small:hidden items-center gap-1.5">
        <span className="text-xs text-gray-400 font-medium mr-1 whitespace-nowrap">
          Sort
        </span>
        {SORT_OPTIONS.map((option) => {
          const selected = option.value === sortBy
          return (
            <button
              key={option.value}
              onClick={() => setQueryParams("sortBy", option.value)}
              aria-pressed={selected}
              className={`
                flex items-center gap-1.5 px-3 h-9
                rounded-lg text-xs font-medium
                whitespace-nowrap flex-shrink-0
                transition-all duration-150 active:scale-95
                ${
                  selected
                    ? "bg-[#C5A163] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <span className={selected ? "text-white/80" : "text-gray-400"}>
                {option.icon}
              </span>
              {option.label}
            </button>
          )
        })}
      </div>

      {/* ── Desktop: vertical card list ──────────────────────────────────────
          Sits in the sticky sidebar — stacked vertically with label
      ──────────────────────────────────────────────────────────────────── */}
      <div className="hidden small:flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-1 mb-1">
          Sort by
        </p>
        {SORT_OPTIONS.map((option) => {
          const selected = option.value === sortBy
          return (
            <button
              key={option.value}
              onClick={() => setQueryParams("sortBy", option.value)}
              aria-pressed={selected}
              className={`
                relative flex items-center gap-3
                px-3 py-2.5 rounded-lg w-full text-left
                transition-all duration-150 group
                ${
                  selected
                    ? "bg-[#C5A163]/10 text-[#C5A163]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              {/* Active indicator bar on left edge */}
              <span
                className={`
                absolute left-0 top-1/2 -translate-y-1/2
                w-0.5 rounded-r-full
                transition-all duration-200
                ${selected ? "h-5 bg-[#C5A163]" : "h-0 bg-transparent"}
              `}
              />

              <span
                className={`
                flex-shrink-0 transition-colors
                ${
                  selected
                    ? "text-[#C5A163]"
                    : "text-gray-400 group-hover:text-gray-600"
                }
              `}
              >
                {option.icon}
              </span>

              <span className="text-sm font-medium">{option.label}</span>

              {selected && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C5A163] flex-shrink-0" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SortProducts
