import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function ZYNProductsShowcase() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 component-px bg-white">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-[74px]">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 lg:gap-[25px] w-full lg:w-[676px] text-center lg:text-left">
            <h2 className="w-full max-w-[598px] text-black text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold leading-tight tracking-tight lg:tracking-[-0.84px] font-manrope">
              ZYN Nicotine Pouches Collection{" "}
            </h2>

            <p className="w-full text-[#606060] text-base sm:text-lg lg:text-[18px] font-medium leading-relaxed lg:leading-[35px] font-manrope">
              Premium ZYN pouches delivered 24/7 for your lifestyle. Small,
              convenient, and flavorful, these nicotine pouches provide a
              discreet and satisfying experience anytime, anywhere. Quality and
              satisfaction in every pouch.
            </p>

            <Link href={"/categories/nicotine-pouch"}>
              <button className="flex w-full sm:w-auto min-w-[201px] py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors">
                <span className="text-white text-lg sm:text-[20px] font-medium leading-[150%] font-manrope">
                  Shop ZYN
                </span>
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full max-w-[490px] aspect-square lg:w-[490px] lg:h-[509px] flex flex-col justify-center items-center bg-[#F3F3F3] relative overflow-hidden rounded-lg">
            <Image
              src="/images/premium-nicotine-two.png"
              alt="ZYN Products Collection"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
