"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductTabs from "../components/product-tabs"

const TABS = ["Description", "Details/Specifications"]

type Props = {
  product: HttpTypes.StoreProduct
}

export default function ProductTabsClient({ product }: Props) {
  const [activeTab, setActiveTab] = useState<string>(TABS[0])

  return (
    <div className="flex flex-col gap-5 mt-5">
      <nav className="flex flex-col sm:flex-row justify-between gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 sm:px-5 py-[10px] text-sm font-medium transition-colors text-left ${
              activeTab === tab
                ? "border-b border-black text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="text-gray-500 text-[13px] font-medium leading-5">
        {activeTab === "Description" && <div>{product?.description}</div>}

        {activeTab === "Details/Specifications" && (
          <ProductTabs product={product} />
        )}
      </div>
    </div>
  )
}
