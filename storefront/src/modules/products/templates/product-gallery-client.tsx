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
    <div className="grid grid-cols-8 gap-4 ">
      {/* Sidebar Thumbnails */}
      <aside className="col-span-1 flex flex-col small:sticky small:top-48 w-full py-8 gap-y-6">
        <div className="flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-visible">
          {formatted.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={` flex-shrink-0 rounded overflow-hidden border transition-colors ${
                activeIndex === index
                  ? "border-black"
                  : "border-gray-200 hover:border-brand-primary"
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <img
                src={img.url}
                alt={title || `Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </aside>

      {/* Main Image */}
      <div className="col-span-7 relative w-full border">
        <img
          src={formatted[activeIndex].url}
          alt={title || "Product image"}
          className="w-full h-auto rounded-lg object-contain"
        />
      </div>
    </div>
  )
}
