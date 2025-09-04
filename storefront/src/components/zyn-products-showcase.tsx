import React from "react"

export default function ZYNProductsShowcase() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 component-px bg-white">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-[74px]">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-4 sm:gap-6 lg:gap-[25px] w-full lg:w-[676px] text-center lg:text-left">
            <h2 className="w-full max-w-[598px] text-black text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold leading-tight tracking-tight lg:tracking-[-0.84px] font-manrope">
              Premium Nicotine & Fine Spirits Delivered 24/7k
            </h2>

            <p className="w-full text-[#606060] text-base sm:text-lg lg:text-[18px] font-medium leading-relaxed lg:leading-[35px] font-manrope">
              Lorem ipsum dolor sit amet consectetur. Velit convallis in sed
              viverra sodales neque tellus. Diam viverra in consectetur
              dignissim nam et. Ut tincidunt vitae fermentum nibh amet
              consectetur phasellus mi.
            </p>

            <button className="flex w-full sm:w-auto min-w-[201px] py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors">
              <span className="text-white text-lg sm:text-[20px] font-medium leading-[150%] font-manrope">
                Shop ZYN
              </span>
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full max-w-[490px] aspect-square lg:w-[490px] lg:h-[509px] flex flex-col justify-center items-center bg-[#F3F3F3] relative overflow-hidden rounded-lg">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/e98520cb906032cbec0831e869301d25527ba6bf?width=1031"
              alt="ZYN Products Collection"
              className="w-[515px] h-[515px] object-cover absolute -left-[13px] -top-[3px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
