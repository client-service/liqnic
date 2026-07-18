"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
  images: { url: string }[] | string[]
  title?: string
}

export default function ProductGalleryClient({ images, title }: Props) {
  if (!images || images.length === 0) return null

  const formatted = images.map((img) =>
    typeof img === "string" ? { url: img } : img
  )

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {/* Thumbnails */}
      <aside className="order-2 md:order-1 md:col-span-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {formatted.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square w-16 sm:w-20 md:w-full rounded-lg border-2 overflow-hidden shrink-0 transition ${
              activeIndex === index
                ? "border-primary"
                : "border-gray-200 hover:border-primary"
            }`}
          >
            <img
              src={img.url}
              alt={title || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </aside>

      {/* Main Image */}
      <div className="order-1 md:order-2 md:col-span-5 lg:col-span-7">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white">
          <Image
            src={formatted[activeIndex].url}
            alt={title || "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
          />
        </div>
      </div>
    </div>
  )
}
