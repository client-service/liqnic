"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"

const heroData = [
  {
    image: "/images/terea-final.png",
    title: "TEREA Sticks. Precision Tobacco, Perfected.",
    description:
      "Designed exclusively for IQOS ILUMA, TEREA delivers a seamless, smoke-free experience with rich flavor and no compromise.",
    primaryButton: "Shop Terea Packet",
    primaryLink: "/categories/heated-tobacco",
    secondaryButton: "Shop Tera Box",
    secondaryLink: "/categories/heated-tobacco",
  },
  {
    image: "/images/slide-1.jpg",
    title: "IQOS ILUMA. Smoke-Free Innovation, Redefined.",
    description:
      "From IQOS ILUMA PRIME to ILUMA ONE, experience a new era of heated tobacco — crafted for sophistication, designed for modern living.",
    primaryButton: "Shop IQOS Devices",
    primaryLink: "/categories/iqos-devices",
    secondaryButton: "Shop Accessories",
    secondaryLink: "/categories/accessories",
  },
  {
    image: "/images/zyn-slide.jpg",
    title: "ZYN Nicotine Pouches. Fresh, Discreet, Powerful.",
    description:
      "Explore ZYN in multiple flavors and strengths — a modern, smoke-free nicotine experience that fits your lifestyle.",
    primaryButton: "Shop ZYN Coffee",
    primaryLink: "/categories/nicotine-pouch",
    secondaryButton: "Shop ZYN Cool Mint",
    secondaryLink: "/categories/nicotine-pouch",
  },
  {
    image: "/images/hero-four.png",
    title: "Luxury Spirits. Delivered Anytime, Anywhere.",
    description:
      "From Moët Hennessy to Don Angel, discover rare whiskies, timeless cognacs, fine champagnes, and limited-edition collections — curated for every occasion.",
    primaryButton: "Shop Cognac",
    primaryLink: "/categories/cognac",
    secondaryButton: "Shop Whiskies",
    secondaryLink: "/categories/whiskey",
  },
]

const Hero = () => {
  const [currentHero, setCurrentHero] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentHero) return
      setIsAnimating(true)
      setCurrentHero(index)
      setTimeout(() => setIsAnimating(false), 700)
    },
    [isAnimating, currentHero]
  )

  const goNext = useCallback(() => {
    goToSlide((currentHero + 1) % heroData.length)
  }, [currentHero, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((currentHero - 1 + heroData.length) % heroData.length)
  }, [currentHero, goToSlide])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, goNext])

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = (touchStartX.current ?? 0) - (touchEndX.current ?? 0)
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev])

  const current = heroData[currentHero]

  return (
    <section
      className="relative"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero carousel"
    >
      <div className="relative h-[85vh] lg:h-[85vh] w-full overflow-hidden">
        {/* ── Images: only render current + adjacent for perf ── */}
        {heroData.map((hero, index) => {
          // Only mount images that are current, previous, or next — skip the rest
          const isVisible = index === currentHero
          const isAdjacent =
            index === (currentHero + 1) % heroData.length ||
            index === (currentHero - 1 + heroData.length) % heroData.length

          if (!isVisible && !isAdjacent) return null

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={!isVisible}
            >
              {/* Desktop */}
              <div className="hidden md:block relative w-full h-full ">
                <Image
                  src={hero.image || "/placeholder.svg"}
                  alt={hero.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={100}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>

              {/* MOBILE */}
              <div className="md:hidden absolute inset-0 flex items-end w-full h-full">
                <Image
                  src={hero.image || "/placeholder.svg"}
                  alt={hero.title}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={100}
                  className=" w-auto h-80 object-cover object-right-bottom"
                  width={1000}
                  height={800}
                  sizes="100vw"
                />
              </div>
            </div>
          )
        })}

        {/* ── Text content ── */}
        <div className="relative component-px h-full py-8 grid lg:grid-cols-4 w-full">
          <div className="col-span-3 flex mt-4 md:mt-8 lg:mt-16 w-full h-full">
            <div className="w-full">
              {/* Title — CSS animation via key change, no JS re-render needed */}
              <h2
                key={`title-${currentHero}`}
                className=" text-black  text-3xl sm:text-4xl lg:text-5xl xl:text-[70px] leading-tight tracking-tight lg:tracking-[-1.13px] font-manrope mb-4 sm:mb-6 lg:mb-8 animate-in slide-in-from-left-8 fade-in duration-700"
              >
                {current.title}
              </h2>

              <p
                key={`desc-${currentHero}`}
                className=" text-black  text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[150%] font-manrope mb-6 sm:mb-8 lg:mb-12 max-w-[663px] animate-in slide-in-from-left-8 fade-in duration-700 delay-150"
              >
                {current.description}
              </p>

              <div
                key={`buttons-${currentHero}`}
                className="flex flex-col sm:flex-row md:items-center gap-4 sm:gap-5 lg:gap-[20px] mt-8 animate-in slide-in-from-left-8 fade-in duration-700 delay-300"
              >
                <Link href={current.primaryLink} passHref>
                  <button className="w-full sm:w-auto flex py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors min-w-[201px]">
                    <span className="text-white text-lg sm:text-[18px] leading-[150%] font-manrope">
                      {current.primaryButton}
                    </span>
                  </button>
                </Link>

                <Link href={current.secondaryLink} passHref>
                  <button className="w-full sm:w-auto flex py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] border border-[#838383] bg-white/80 hover:bg-gray-200/30 transition-colors min-w-[201px]">
                    <span className="text-black text-lg sm:text-[18px] leading-[150%] font-manrope">
                      {current.secondaryButton}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Slide indicators ── */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
          role="tablist"
          aria-label="Slide navigation"
        >
          {heroData.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentHero}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentHero
                  ? "w-6 h-2 bg-[#C5A163]"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
