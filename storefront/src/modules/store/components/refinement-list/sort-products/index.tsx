"use client"

import { useState } from "react"
import { FaArrowDown, FaArrowUp, FaClock } from "react-icons/fa"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SORT_OPTIONS: {
  value: SortOptions
  title: string
  subtitle: string
  icon: JSX.Element
}[] = [
  {
    value: "created_at",
    title: "Latest Arrivals",
    subtitle: "Newest items first",
    icon: <FaClock className="w-5 h-5" />,
  },
  {
    value: "price_asc",
    title: "Price: Low → High",
    subtitle: "See cheapest items first",
    icon: <FaArrowDown className="w-5 h-5" />,
  },
  {
    value: "price_desc",
    title: "Price: High → Low",
    subtitle: "See most expensive items first",
    icon: <FaArrowUp className="w-5 h-5" />,
  },
]

const SortProducts = ({
  sortBy,
  setQueryParams,
  "data-testid": dataTestId,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="flex flex-col gap-2 mr-8" data-testid={dataTestId}>
      <h3 className="text-lg font-semibold text-ui-fg mb-2">Sort by</h3>
      {SORT_OPTIONS.map((option) => {
        const selected = option.value === sortBy
        return (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={`
            flex items-start gap-3 p-3 rounded-lg border transition
            ${
              selected
                ? "border-blue-500 bg-blue-50"
                : "border-ui-border hover:bg-ui-bg-hover"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-400
          `}
            aria-pressed={selected}
          >
            <div className="text-ui-fg-subtle mt-0.5">{option.icon}</div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-ui-fg">
                {option.title}
              </span>
              <span className="text-xs text-ui-fg-muted">
                {option.subtitle}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default SortProducts
