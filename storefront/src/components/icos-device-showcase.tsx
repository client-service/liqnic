import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function IcosDeviceShowcase() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 component-px my-8 lg:my-16 bg-[#FAFAFA]">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-[74px]">
          {/* Left Image */}
          <div className="w-full max-w-[490px] aspect-square lg:w-[490px] lg:h-[509px] flex flex-col justify-center items-center bg-[#F3F3F3] relative overflow-hidden rounded-lg order-2 lg:order-1">
            <Image
              src="/images/PremiumNicotine.png"
              alt="IQOS Devices Collection"
              width={600}
              height={600}
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 lg:gap-[25px] w-full lg:w-[676px] text-center lg:text-left order-1 lg:order-2">
            <h2 className="w-full max-w-[598px] text-black text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold leading-tight tracking-tight lg:tracking-[-0.84px] font-manrope">
              Premium Nicotine & Fine Spirits Delivered 24/7k
            </h2>

            <p className="w-full text-[#606060] text-base sm:text-lg lg:text-[18px] font-medium leading-relaxed lg:leading-[35px] font-manrope">
              Discover the latest IQOS devices for a smooth experience. Designed
              for convenience and style, each device offers effortless use and
              premium quality. Enjoy a modern, satisfying nicotine alternative
              with ease.
            </p>

            <Link href={"/categories/iqos-devices"}>
              <button className="flex w-full sm:w-auto min-w-[201px] py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors">
                <span className="text-white text-lg sm:text-[20px] font-medium leading-[150%] font-manrope">
                  Shop IQOS devices
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
