import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="w-full min-h-[51px] bg-[#C5A163] flex items-center justify-center px-4 py-2 lg:py-4 gap-[10px] sm:gap-[19px] flex-wrap">
      <span className="text-white text-xs sm:text-[14.4px] font-light leading-[150%] font-manrope text-center">
        Offer of the day goes here
      </span>

      <Link
        href="/shop"
        className="flex py-[4px] px-[16px] items-center justify-center gap-[8px] rounded-[4px] bg-white hover:bg-gray-100 transition-colors shrink-0"
      >
        <span className="text-[#111] text-xs sm:text-[14.4px] font-light leading-[150%] font-manrope whitespace-nowrap">
          Buy now
        </span>
      </Link>
    </div>
  )
}
