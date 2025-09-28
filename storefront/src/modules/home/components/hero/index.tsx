"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentHero, setCurrentHero] = useState(0)

  const heroData = [
    {
      image: "/images/hero-one.png",
      title: "IQOS ILUMA. Smoke-Free Innovation, Redefined.",
      description:
        "From IQOS ILUMA PRIME to ILUMA ONE, experience a new era of heated tobacco — crafted for sophistication, designed for modern living.",
      primaryButton: "Shop IQOS Devices",
      primaryLink: "/categories/device",
      secondaryButton: "Shop Accessories",
      secondaryLink: "/categories/device",
    },
    {
      image: "/images/hero-two.png",
      title: "Premium IQOS ILUMA Devices. Smoke-Free Innovation.",
      description:
        "Experience the future of nicotine with IQOS ILUMA, PRIME, and ONE — designed for sophistication, cleaner taste, and convenience",
      primaryButton: "Shop IQOS Devices",
      primaryLink: "/categories/iqos-devices",
      secondaryButton: "Shop Accessories",
      secondaryLink: "/categories/accessories",
    },
    {
      image: "/images/hero-third.png",
      title: "ZYN Nicotine Pouches. Fresh, Discreet, Powerful.",
      description:
        "Explore ZYN in multiple flavors and strengths — a modern, smoke-free nicotine experience that fits your lifestyle.",
      primaryButton: "Shop ZYN Citrus",
      primaryLink: "/categories/zyn-citrus",
      secondaryButton: "Shop ZYN Cool Mint",
      secondaryLink: "/categories/zyn-coolmint",
    },
    {
      image: "/images/hero-four.png",
      title: "Luxury Spirits. Delivered Anytime, Anywhere.",
      description:
        "From Moët Hennessy to Don Angel, discover rare whiskies, timeless cognacs, fine champagnes, and limited-edition collections — curated for every occasion.",
      primaryButton: "Shop Cognac",
      primaryLink: "/categories/cognac",
      secondaryButton: "Shop Whiskies",
      secondaryLink: "/categories/liquor",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroData.length])

  return (
    <section className="relative">
      <div className="relative h-[75vh] lg:h-[85vh] w-full overflow-hidden">
        {heroData.map((hero, index) => (
          <div
            key={index}
            className={`hidden  md:block absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-[85vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh]">
              <Image
                src={hero.image || "/placeholder.svg"}
                alt="Hero Background"
                fill
                priority={index === 0}
                quality={100}
                className=" object-cover object-center "
                sizes="100vw"
              />
            </div>
          </div>
        ))}
        {heroData.map((hero, index) => (
          <div
            key={index}
            className={`md:hidden absolute inset-0 transition-opacity duration-1000 ease-in-out w-full h-full  flex items-end ${
              index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="">
              <Image
                src={hero.image || "/placeholder.svg"}
                width={1000}
                height={1000}
                alt="Hero Background"
                priority={index === 0}
                quality={100}
                className="object-cover object-right lg:object-center  w-full"
                sizes="100vw"
              />
            </div>
          </div>
        ))}

        <div className="relative component-px h-full py-8 grid lg:grid-cols-4 w-full">
          <div className="col-span-3 flex mt-4 md:mt-8 lg:mt-16 w-full h-full">
            <div className="w-full">
              <h2
                key={`title-${currentHero}`}
                className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-[70px] leading-tight tracking-tight lg:tracking-[-1.13px] font-manrope mb-4 sm:mb-6 lg:mb-8 animate-in slide-in-from-left-8 fade-in duration-700"
              >
                {heroData[currentHero].title}
              </h2>

              <p
                key={`desc-${currentHero}`}
                className="text-black text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[150%] font-manrope mb-6 sm:mb-8 lg:mb-12 max-w-[663px] animate-in slide-in-from-left-8 fade-in duration-700 delay-150"
              >
                {heroData[currentHero].description}
              </p>

              <div
                key={`buttons-${currentHero}`}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 lg:gap-[20px] mt-8 animate-in slide-in-from-left-8 fade-in duration-700 delay-300"
              >
                <Link href={heroData[currentHero].primaryLink} passHref>
                  <button className="w-full sm:w-auto flex py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors min-w-[201px]">
                    <span className="text-white text-lg sm:text-[18px] leading-[150%] font-manrope">
                      {heroData[currentHero].primaryButton}
                    </span>
                  </button>
                </Link>

                <Link href={heroData[currentHero].secondaryLink} passHref>
                  <button className="w-full sm:w-auto flex py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] border border-[#838383] bg-transparent hover:bg-black/5 transition-colors min-w-[201px]">
                    <span className="text-black text-lg sm:text-[18px] leading-[150%] font-manrope">
                      {heroData[currentHero].secondaryButton}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
