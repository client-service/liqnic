import Image from "next/image"
export default function About() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[96px] max-w-[1240px] mx-auto">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-full lg:w-[620px]">
            <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px]  leading-[150%] ">
              The Licniq Story:
            </h2>
            <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
              Where Authenticity Meets Aspiration
            </h1>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[523px] text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
            Welcome to Licniq. We are curators of a refined lifestyle, offering
            unmatched access to premium spirits and innovative nicotine
            alternatives. Our goal is to make luxury accessible, ensuring you
            get the products you want, whenever you want them.
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
      <section className="w-full px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1157px] mx-auto text-center">
          <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px]  leading-[150%]  mb-3 lg:mb-[10px]">
            Our Mission & Vision
          </h2>
          <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
            At Licniq, we're driven by a dual purpose: to elevate your
            experience and simplify your access to world-class products.
          </h1>
        </div>
      </section>

      {/* Mission & Vision Content */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-[1240px] mx-auto">
          <Image
            src="/images/about-page/Mission.png"
            height={600}
            width={600}
            alt="hero"
          />

          {/* Right Content */}
          <div className="flex flex-col items-start gap-8 sm:gap-10 lg:gap-[50px] w-full lg:w-[562px] order-1 lg:order-2">
            {/* Our Mission */}
            <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-full">
              <h3 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
                Our Mission:
              </h3>
              <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
                To redefine convenience by providing real-time, 24/7 access to a
                curated selection of authentic, high-quality spirits and
                cutting-edge nicotine products throughout Nepal. We aim to be
                the most trusted and efficient source for adult consumers.
              </p>
            </div>

            {/* Our Vision */}
            <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-full">
              <h3 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
                Our Vision:
              </h3>
              <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
                To be the leading luxury retail platform in Nepal, known for our
                exceptional service, unwavering authenticity, and commitment to
                a responsible, sophisticated lifestyle. We are building more
                than a business; we are fostering a community of discerning
                individuals who value quality and convenience above all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-[1240px] mx-auto">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-4 sm:gap-5 lg:gap-[20px] w-full lg:w-[548px]">
            <h2 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
              A Message From Our Founder
            </h2>

            <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
              When I started Licniq, it was because I saw a gap in the market.
              As consumers, we've come to expect speed and authenticity in every
              part of our lives, yet a premium experience for spirits and
              nicotine products was nowhere to be found.
            </p>

            <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
              My goal was simple: to bring you a service that's not just
              convenient, but also completely trustworthy. We've built Licniq to
              be a platform where you can discover authentic, high-quality
              products and get them delivered to your doorstep in real time.
            </p>

            <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-relaxed lg:leading-[26px] ">
              This isn't just a business for me; it's a commitment. A commitment
              to bringing you the best, with the speed and reliability you
              deserve. Thank you for trusting us to be your go-to source.
            </p>
          </div>

          {/* Right Image */}
          <Image
            src="/images/about-page/Message.png"
            height={600}
            width={600}
            alt="hero"
          />
        </div>
      </section>

      {/* Team Section Header */}
      <section className="w-full px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1157px] mx-auto text-center">
          <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px]  leading-[150%]  mb-3 lg:mb-[10px]">
            Our Experts Behind Licniq
          </h2>
          <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] ">
            Meet the team making luxury and convenience effortless.
          </h1>
        </div>
      </section>

      {/* Team Members */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[50px] justify-items-center">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[280px] sm:w-[320px] lg:w-[380px] h-[280px] sm:h-[320px] lg:h-[380px] rounded-lg overflow-hidden mb-6 lg:mb-8">
                <Image
                  src="/images/about-page/Bibek.png"
                  height={900}
                  width={500}
                  alt="Bibek Adhikari"
                />
              </div>
              <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-[280px]">
                <h3 className="text-[#111] text-xl sm:text-2xl lg:text-[25px] font-semibold leading-[26px] ">
                  Bibek Adhikari
                </h3>
                <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-[26px] ">
                  Lead of Marketing & Communications
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[280px] sm:w-[320px] lg:w-[380px] h-[280px] sm:h-[320px] lg:h-[380px] rounded-lg overflow-hidden mb-6 lg:mb-8">
                <Image
                  src="/images/about-page/Subash.png"
                  height={900}
                  width={500}
                  alt="Subash Thapa"
                />
              </div>
              <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-[280px]">
                <h3 className="text-[#111] text-xl sm:text-2xl lg:text-[25px] font-semibold leading-[26px] ">
                  Subash Thapa
                </h3>
                <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-[26px] ">
                  Lead of Marketing & Communications
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[280px] sm:w-[320px] lg:w-[380px] h-[280px] sm:h-[320px] lg:h-[380px] rounded-lg overflow-hidden mb-6 lg:mb-8">
                <Image
                  src="/images/about-page/Alina.png"
                  height={900}
                  width={500}
                  alt="Alina Gurung"
                />
              </div>
              <div className="flex flex-col items-start gap-3 lg:gap-[10px] w-[280px]">
                <h3 className="text-[#111] text-xl sm:text-2xl lg:text-[25px] font-semibold leading-[26px] ">
                  Alina Gurung
                </h3>
                <p className="text-[#606060] text-sm sm:text-base lg:text-[16px]  leading-[26px] ">
                  Lead of Marketing & Communications
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
