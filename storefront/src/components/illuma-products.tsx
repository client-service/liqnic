import Image from "next/image"
import Link from "next/link"

export default function IllumaProducts() {
  return (
    <section className="w-full   bg-white component-px">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12 place-items-center">
          {/* IQOS - Illuma */}
          <div className="w-full h-40 md:min-h-60 rounded-xl relative  bg-gradient-to-br from-white via-green-50 to-[#CCF9B6]">
            <div className="absolute left-4 sm:left-6 lg:left-8 top-8 sm:top-12 lg:top-14 right-4 z-10">
              <div className="flex flex-col items-start gap-3 sm:gap-4">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-gray-900 text-xl sm:text-2xl font-bold leading-tight font-sans">
                    IQOS Illuma
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg  leading-relaxed font-sans">
                    Nationwide, anytime you need.
                  </p>
                </div>
                <Link href="/products/iqos-prime-mid-moss-green">
                  <button className="inline-flex py-2 px-4 sm:px-5 justify-center items-center rounded-md bg-[#5BE419] hover:bg-green-600 active:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    <span className="text-white text-sm sm:text-base lg:text-lg  font-sans">
                      Buy now
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0  flex justify-end">
              <Image
                width={250}
                height={500}
                quality={100}
                src="/images/illuma.png"
                alt="IQOS Illuma Device"
                className="md:-mr-20 -mt-8 md:-mt-16  w-32 h-48 md:w-auto md:h-auto"
              />
            </div>
          </div>

          {/* IQOS - Illuma One */}
          <div className="w-full h-40 md:min-h-60 rounded-xl relative  bg-gradient-to-br from-pink-50 via-pink-100 to-[#F1A6BD]">
            <div className="absolute left-4 sm:left-6 lg:left-8 top-8 sm:top-12 lg:top-14 right-4 z-10">
              <div className="flex flex-col items-start gap-3 sm:gap-4">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-gray-900 text-xl sm:text-2xl font-bold leading-tight font-sans">
                    IQOS Illuma One
                  </h3>
                  <p className="text-gray-800 text-sm sm:text-base lg:text-lg  leading-relaxed font-sans">
                    Nationwide, anytime you need.
                  </p>
                </div>
                <Link href="/products/iqos-prime-mid-moss-green">
                  <button className="inline-flex py-2 px-4 sm:px-5 justify-center items-center rounded-md bg-[#F27CA0] hover:bg-pink-500 active:bg-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
                    <span className="text-white text-sm sm:text-base lg:text-lg  font-sans">
                      Buy now
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0  flex justify-end">
              <Image
                width={250}
                height={500}
                quality={100}
                src="/images/illuma-one.png"
                alt="IQOS Illuma Device"
                className="md:-mr-20 -mt-8 md:-mt-16  w-32 h-48 md:w-auto md:h-auto"
              />
            </div>
          </div>

          {/* IQOS - Illuma Prime */}
          <div className="w-full h-40 md:min-h-60 rounded-xl relative  bg-gradient-to-br from-[#FFFCF7] to-[#ECD7B8] md:col-span-2 xl:col-span-1">
            <div className="absolute left-4 sm:left-6 lg:left-8 top-8 sm:top-12 lg:top-14 right-4 z-10">
              <div className="flex flex-col items-start gap-3 sm:gap-4">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-gray-900 text-xl sm:text-2xl font-bold leading-tight font-sans">
                    IQOS Illuma Prime
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg  leading-relaxed font-sans">
                    Nationwide, anytime you need.
                  </p>
                </div>
                <Link href="/products/iqos-prime-mid-moss-green">
                  <button className="inline-flex py-2 px-4 sm:px-5 justify-center items-center rounded-md bg-[#D2AD76] hover:bg-amber-700 active:bg-amber-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">
                    <span className="text-white text-sm sm:text-base lg:text-lg  font-sans">
                      Buy now
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0  flex justify-end">
              <Image
                width={250}
                height={500}
                quality={100}
                src="/images/illuma-prime.png"
                alt="IQOS Illuma Device"
                className="md:-mr-20 -mt-8 md:-mt-16  w-32 h-48 md:w-auto md:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
