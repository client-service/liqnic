import Image from "next/image"
export default function About() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="w-full component-px py-8 sm:py-12 lg:py-16 c">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16  mx-auto">
          {/* Left Content */}
          <div className="col-span-2 flex flex-col gap-3">
            <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px] leading-[150%]">
              The Liqnic Story:
            </h2>
            <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px]">
              Where Authenticity Meets Aspiration
            </h1>
          </div>

          {/* Right Content */}
          <div className="col-span-3 text-[#606060] text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[26px] space-y-4 text-justify">
            <p>
              Welcome to Liqnic, Nepal's premier digital boutique for the
              refined connoisseur. Our name represents the dual nature of modern
              relaxation, the timeless tradition of fine liquor and the
              cutting-edge innovation of nicotine technology.
            </p>
            <p>
              At Liqnic, we believe that quality should never be a guessing
              game. We have curated an elite selection of world class liquor and
              premium e-cigarette hardware, ensuring that every bottle poured
              and every cloud chased meets the highest standards of excellence.
              Based in the heart of Nepal, we are dedicated to providing a
              seamless, discreet, and sophisticated shopping experience for
              those who appreciate the finer things in life.
            </p>
          </div>
        </div>
      </section>
      {/* Hero Image Section */}
      <Image
        src="/images/about-page/About.png"
        height={537}
        width={2000}
        alt="hero"
      />
      {/* Mission & Vision Header */}
      <section className="w-full px-4 py-12 sm:py-16 ">
        <div className="max-w-[1157px] mx-auto text-center">
          <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px]  leading-[150%]  mb-3 lg:mb-[10px]">
            Our Mission & Vision
          </h2>
          <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
            At Liqnic, we're driven by a dual purpose: to elevate your
            experience and simplify your access to world-class products.
          </h1>
        </div>
      </section>
      {/* Mission & Vision Content */}

      <section className="bg-[#FAFAF8] px-6 lg:px-[100px] mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] max-w-[1100px] mx-auto items-center">
          {/* Left — Image */}
          <div className="relative">
            {/* Gold offset border — sits bottom-left */}
            <div className="absolute inset-0 lg:-translate-x-[20px] lg:translate-y-[20px] border-[1.5px] border-[#C5A163] rounded-bl-[40px] z-0" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-bl-[40px] z-10 aspect-[4/3]">
              <Image
                src="/images/about-page/about-1.webp"
                fill
                alt="About Liqnic"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C5A163]/12 to-transparent" />
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col pt-2">
            {/* Mission */}
            <div className="flex flex-col gap-3 py-7 ">
              <h3 className="font-['Playfair_Display'] text-[30px] font-normal text-[#1E1C18] leading-tight">
                Our Mission
              </h3>
              <p className="text-[14.5px] text-[#7A7060] font-light leading-relaxed">
                To be Nepal's most trusted 24/7 source for authentic drinks and
                e-cigarettes. We believe you shouldn't have to worry about fakes
                or long wait times.
              </p>
            </div>

            {/* Vision */}
            <div className="flex flex-col gap-3 py-7 border-t  border-[#EAE5DC]">
              <h3 className="font-['Playfair_Display'] text-[30px] font-normal text-[#1E1C18] leading-tight">
                Our Vision
              </h3>
              <p className="text-[14.5px] text-[#7A7060] font-light leading-relaxed">
                To build a community in Nepal that values quality above all
                else. We aren't just selling products; we're delivering a
                simpler, more sophisticated way to shop.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Founder Message */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-[900px] mx-auto">
          {/* Card */}
          <div className="bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 relative">
            {/* Subtle Quote Icon */}
            <span className="absolute top-6 left-6 text-[60px] text-gray-200 font-serif leading-none">
              “
            </span>

            {/* Heading */}
            <h2 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight">
              A Message From Our Founder
            </h2>

            {/* Content */}
            <div className="flex flex-col gap-4 text-[#606060] text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[26px]">
              <p>
                I started Liqnic because I was tired of the struggle. In Nepal,
                it’s surprisingly hard to find high quality liquor or genuine
                e-cigarettes gear without worrying if what you’re buying is the
                real deal. We expect speed and honesty in every other part of
                our lives, why should this be any different?
              </p>

              <p>
                I wanted to create a place where 'authentic' isn't just a
                marketing word, but a guarantee. Liqnic is my commitment to you,
                a service that is fast, reliable, and completely trustworthy.
                Whether you are stocking up your home bar or need a refill for
                your e-cigarettes, we’ve got your back.
              </p>

              <p>Thanks for trusting us and being part of our story.</p>
            </div>

            {/* Bottom subtle line */}
            <div className="mt-4 h-[1px] w-16 bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16 bg-[#FAFAF8]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[#C5A163] text-xl sm:text-[25px] leading-[150%] mb-2">
            Company Details
          </h2>
          <h3 className="text-[#323232] text-2xl sm:text-[30px] font-bold leading-tight tracking-tight mb-8">
            Business Information
          </h3>

          <div className="border border-[#EAE5DC] rounded-xl overflow-hidden">
            {[
              { label: "E-Commerce Platform Name", value: "Liqnic" },
              {
                label: "Company Name",
                value: "Khirkhirya Enterprises Pvt. Ltd.",
              },
              { label: "Company Address", value: "Kathmandu, Nepal" },
              {
                label: "Business Activities",
                value:
                  "Online retail of premium liquor and e-cigarette products",
              },
              { label: "Business Email", value: "liqnichost@gmail.com" },
              { label: "Business Phone", value: "+977-9802532700" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={`grid grid-cols-2 sm:grid-cols-5 px-6 py-4 ${
                  i !== arr.length - 1 ? "border-b border-[#EAE5DC]" : ""
                } ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}
              >
                <p className="col-span-1 sm:col-span-2 text-xs font-medium uppercase tracking-widest text-[#A08B6E]">
                  {label}
                </p>
                <p className="col-span-1 sm:col-span-3 text-sm text-[#323232]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
