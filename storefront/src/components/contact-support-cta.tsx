import Image from "next/image"

export function ContactSupportCTA() {
  return (
    <div className="my-8 lg:my-16 w-full max-w-[1240px] mx-auto p-8 flex flex-col items-center gap-8 bg-white shadow-xl border border-gray-50 rounded-2xl">
      {/* Avatar Group */}
      <div className="relative w-[120px] h-14">
        {/* Left Avatar */}
        <div className="absolute left-0 top-2 w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <Image
            src="/images/support-page/support-user-one.png"
            alt="Support team member"
            height={600}
            width={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Avatar */}
        <div className="absolute right-0 top-2 w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <Image
            src="/images/support-page/support-user-three.png"
            alt="Support team member"
            height={600}
            width={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Avatar (larger, on top) */}
        <div className="absolute left-8 top-0 w-14 h-14 rounded-full border-[1.5px] border-white overflow-hidden z-10">
          <Image
            src="/images/support-page/support-user-two.png"
            alt="Support team member"
            height={600}
            width={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Heading and Supporting Text */}
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
        <h2 className="text-gray-600 text-center text-xl font-semibold font-manrope leading-tight">
          Need help with your order?
        </h2>
        <p className="text-gray-500 text-center text-sm font-medium font-manrope leading-relaxed max-w-2xl">
          If something's unclear or you need assistance, our friendly team is
          here to help.
        </p>
      </div>

      {/* Contact Support Button */}
      <button className="flex items-center justify-center gap-2 px-8 py-3 border border-gray-400 rounded text-black text-sm font-medium font-manrope hover:bg-gray-50 transition-colors">
        Contact Support
      </button>
    </div>
  )
}
