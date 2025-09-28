export function ContactSupportCTA() {
  return (
    <div className="my-8 lg:my-16 w-full max-w-[1240px] mx-auto p-8 flex flex-col items-center gap-8 bg-white shadow-xl border border-gray-50 rounded-2xl">
      {/* Avatar Group */}
      <div className="relative w-[120px] h-14">
        {/* Left Avatar */}
        <div className="absolute left-0 top-2 w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c58e7e539449e4482df7296288350eee6ebfef30?width=96"
            alt="Support team member"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Avatar */}
        <div className="absolute right-0 top-2 w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c5b5f0179602407ebc4019ad66197453e641ded5?width=96"
            alt="Support team member"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Avatar (larger, on top) */}
        <div className="absolute left-8 top-0 w-14 h-14 rounded-full border-[1.5px] border-white overflow-hidden z-10">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/145d9b826589642bb3d770d8fac1edc4f7238ba8?width=112"
            alt="Support team member"
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
