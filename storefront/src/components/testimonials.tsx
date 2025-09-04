const StarRating = ({ rating = 4 }: { rating?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"
            fill={index < rating ? "#C5A163" : "#D9D9D9"}
          />
        </svg>
      ))}
    </div>
  )
}

const TestimonialCard = ({
  name,
  text,
  rating = 4,
  avatar,
  className = "",
}: {
  name: string
  text: string
  rating?: number
  avatar: string
  className?: string
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-10 top-4 sm:top-0 xl:-top-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-[80px] lg:h-[80px] rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl lg:text-2xl z-10">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="rounded-[50%]"
        />
      </div>

      <div className="bg-white rounded-[30px] border border-[#E4E4E4] p-6 lg:p-[28px] pt-16 lg:pt-[66px]">
        <div className="flex flex-col gap-[6px]">
          <div className="flex justify-between items-center">
            <h3 className="text-black text-lg sm:text-xl lg:text-[22px] font-bold leading-[35px] font-manrope">
              {name}
            </h3>
            <StarRating rating={rating} />
          </div>
          <p className="text-[#606060] text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[35px] font-manrope">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

const testimonials = [
  {
    id: 1,
    name: "Anish Rai",
    text: "Lorem ipsum dolor sit amet consectetur. Velit convallis in sed viverra sodales neque tellus. Diam viverra in",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Person Name",
    text: "Lorem ipsum dolor sit amet consectetur. Velit convallis in sed viverra sodales neque tellus. Diam viverra in",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
]

export default function CustomerTestimonials() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-32 px-4 bg-white">
      <div className="">
        <div className="relative component-px">
          <div className="w-full bg-[#F9F6EF] rounded-[20px] px-6 sm:px-12 lg:px-[100px] py-8 sm:py-12 lg:py-16 relative">
            <svg
              className="absolute left-0 bottom-0 w-full h-auto opacity-60 pointer-events-none"
              viewBox="0 0 1240 208"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "blur(2px)" }}
            >
              <path
                d="M-6.44727 95.0656C108.457 23.8246 399.856 -71.3164 646.212 118.047C892.568 307.409 1162.52 128.005 1266.7 14.6318"
                stroke="#F5E6CD"
                strokeWidth="5"
              />
            </svg>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative z-10">
              <div className="flex flex-col items-start gap-6 lg:gap-[23px] w-full lg:w-[491px]">
                <h2 className="text-black text-2xl sm:text-3xl lg:text-[30px] font-bold leading-tight font-manrope">
                  Hear From Our Customers
                </h2>

                <p className="text-[#606060] text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[35px] font-manrope">
                  See what our customers have to say about their journey with us
                  and how we've helped them achieve their goals.
                </p>

                <button className="flex py-3 sm:py-[15px] px-6 sm:px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-[#C5A163] hover:bg-[#B8956B] transition-colors w-full xl:w-96">
                  <span className="text-white text-lg sm:text-[20px] leading-[150%] font-manrope text-nowrap">
                    Join Our Happy Customers
                  </span>
                </button>
              </div>

              <div className="xl:hidden w-full space-y-12">
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    text={testimonial.text}
                    rating={testimonial.rating}
                    avatar={testimonial.avatar}
                    className="w-full pt-12"
                  />
                ))}
              </div>
            </div>

            <div className="hidden w-full h-full absolute inset-0 xl:flex items-start justify-end">
              <TestimonialCard
                name={testimonials[1].name}
                text={testimonials[1].text}
                rating={testimonials[1].rating}
                avatar={testimonials[1].avatar}
                className="mb-8 lg:mb-12 max-w-2xl -mt-14 -mr-8 ml-10 lg:ml-12"
              />
            </div>

            <div className="hidden w-full h-full absolute inset-0 xl:flex items-end justify-end">
              <div className="relative max-w-2xl -mb-24 mr-24">
                <div className="absolute left-0 lg:left-20 -top-8 w-20 h-20 lg:w-[70px] lg:h-[70px] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl lg:text-2xl z-10">
                  <img
                    src={testimonials[0].avatar || "/placeholder.svg"}
                    alt={testimonials[0].name}
                    className="rounded-[50%]"
                  />
                </div>

                <div className="bg-white rounded-[30px] border border-[#E4E4E4] p-6 lg:p-[28px] pt-16 lg:pt-[66px] ml-10 lg:ml-12">
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-black text-lg sm:text-xl lg:text-[22px] font-bold leading-[35px] font-manrope">
                        {testimonials[0].name}
                      </h3>
                      <StarRating rating={testimonials[0].rating} />
                    </div>
                    <p className="text-[#606060] text-base sm:text-lg lg:text-[18px] leading-relaxed lg:leading-[35px] font-manrope">
                      {testimonials[0].text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
