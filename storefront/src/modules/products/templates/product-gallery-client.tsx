"use client"

import { useState } from "react"

type Props = {
  images: { url: string }[] | string[]
  title?: string
}

export default function ProductGalleryClient({ images, title }: Props) {
  if (!images || images.length === 0) return null

  // Normalize in case images are plain strings
  const formatted = images.map((img) =>
    typeof img === "string" ? { url: img } : img
  )

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
      {/* Sidebar Thumbnails */}
      <aside className="order-2 md:order-1 flex flex-row md:flex-col gap-4 md:gap-y-6 w-full py-4 md:py-8 overflow-x-auto md:overflow-visible md:col-span-1">
        {formatted.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 rounded-lg border-2 transition-colors duration-200 overflow-hidden bg-white ${
              activeIndex === index
                ? "border-primary"
                : "border-gray-200 hover:border-primary"
            }`}
            aria-label={`View product image ${index + 1}`}
          >
            <div className="w-20 h-20 p-1 flex items-center justify-center ">
              <img
                src={img.url}
                alt={title || `Product thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        ))}
      </aside>

      {/* Main Image */}
      <div className="order-1 md:order-2 md:col-span-7 relative w-full h-[70vh] border-2 rounded-lg overflow-hidden bg-white flex items-center justify-center">
        <img
          src={formatted[activeIndex].url}
          alt={title || "Product image"}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
