export default function PromoBanner() {
  return (
    <div className="w-full h-[51px] bg-[#C5A163] flex items-center justify-center px-4 py-[10px] gap-[19px]">
      <span className="text-white text-[14.4px] font-light leading-[150%] font-manrope">
        Offer of the day goes here
      </span>

      <button className="flex py-[4px] px-[16px] items-center justify-center gap-[8px] rounded-[4px] bg-white hover:bg-gray-100 transition-colors">
        <span className="text-[#111] text-[14.4px] font-light leading-[150%] font-manrope">
          Buy now
        </span>
      </button>
    </div>
  )
}
