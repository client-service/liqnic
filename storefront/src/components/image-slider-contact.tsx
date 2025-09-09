"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const images = [
  "/images/contact-page/contact-image-1.png",
  "/images/contact-page/contact-image-2.png",
  "/images/contact-page/contact-image-3.png",
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error("Failed to preload images:", error)
        setImagesLoaded(true) // Still show slider even if some images fail
      }
    }

    preloadImages()
  }, [])

  useEffect(() => {
    if (!imagesLoaded) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [imagesLoaded])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="bg-background flex items-center justify-center">
      <div className="w-full lg:w-[600px] h-[250px] sm:h-[300px] lg:h-[374px] rounded-[10px] relative overflow-hidden">
        {!imagesLoaded ? (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[10px]" />
        ) : (
          <>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${image}')`,
                }}
                initial={false}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 1.05,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {imagesLoaded && (
          <>
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
