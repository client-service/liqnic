export default function Features() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-[55px] component-px">
          {/* 24/7 Delivery */}
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex w-[50px] h-[50px] justify-center items-center rounded-[10px] bg-[#F4F4F4]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 18.0585V6.05853C14 5.5281 13.7893 5.01939 13.4142 4.64432C13.0391 4.26925 12.5304 4.05853 12 4.05853H4C3.46957 4.05853 2.96086 4.26925 2.58579 4.64432C2.21071 5.01939 2 5.5281 2 6.05853V17.0585C2 17.3237 2.10536 17.5781 2.29289 17.7656C2.48043 17.9532 2.73478 18.0585 3 18.0585H5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 18.0585H9"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 18.0585H21C21.2652 18.0585 21.5196 17.9532 21.7071 17.7656C21.8946 17.5781 22 17.3237 22 17.0585V13.4085C21.9996 13.1816 21.922 12.9615 21.78 12.7845L18.3 8.43453C18.2065 8.31741 18.0878 8.22281 17.9528 8.15773C17.8178 8.09265 17.6699 8.05875 17.52 8.05853H14"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 20.0585C18.1046 20.0585 19 19.1631 19 18.0585C19 16.954 18.1046 16.0585 17 16.0585C15.8954 16.0585 15 16.954 15 18.0585C15 19.1631 15.8954 20.0585 17 20.0585Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 20.0585C8.10457 20.0585 9 19.1631 9 18.0585C9 16.954 8.10457 16.0585 7 16.0585C5.89543 16.0585 5 16.954 5 18.0585C5 19.1631 5.89543 20.0585 7 20.0585Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-black text-center text-lg font-bold leading-[150%] font-sans mb-1">
                24/7 Delivery
              </h3>
              <p className="text-gray-400 text-sm  leading-[150%] font-sans">
                Nationwide, anytime you need.
              </p>
            </div>
          </div>

          {/* Exclusive Bundles */}
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex w-[50px] h-[50px] justify-center items-center rounded-[10px] bg-[#F4F4F4]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 8.05853H4C3.44772 8.05853 3 8.50625 3 9.05853V11.0585C3 11.6108 3.44772 12.0585 4 12.0585H20C20.5523 12.0585 21 11.6108 21 11.0585V9.05853C21 8.50625 20.5523 8.05853 20 8.05853Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.05853V21.0585"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12.0585V19.0585C19 19.589 18.7893 20.0977 18.4142 20.4727C18.0391 20.8478 17.5304 21.0585 17 21.0585H7C6.46957 21.0585 5.96086 20.8478 5.58579 20.4727C5.21071 20.0977 5 19.589 5 19.0585V12.0585"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 8.05854C6.83696 8.05854 6.20107 7.79515 5.73223 7.32631C5.26339 6.85747 5 6.22158 5 5.55854C5 4.8955 5.26339 4.25962 5.73223 3.79078C6.20107 3.32193 6.83696 3.05854 7.5 3.05854C8.46469 3.04174 9.41003 3.5098 10.2127 4.4017C11.0154 5.2936 11.6383 6.56795 12 8.05854C12.3617 6.56795 12.9846 5.2936 13.7873 4.4017C14.59 3.5098 15.5353 3.04174 16.5 3.05854C17.163 3.05854 17.7989 3.32193 18.2678 3.79078C18.7366 4.25962 19 4.8955 19 5.55854C19 6.22158 18.7366 6.85747 18.2678 7.32631C17.7989 7.79515 17.163 8.05854 16.5 8.05854"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-black text-center text-lg font-bold leading-[150%] font-sans mb-1">
                Exclusive Bundles
              </h3>
              <p className="text-gray-400 text-sm  leading-[150%] font-sans">
                Save more with curated sets.
              </p>
            </div>
          </div>

          {/* Premium Selection */}
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex w-[50px] h-[50px] justify-center items-center rounded-[10px] bg-[#F4F4F4]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5248 2.35355C11.5687 2.26501 11.6364 2.19048 11.7203 2.13837C11.8042 2.08627 11.9011 2.05865 11.9998 2.05865C12.0986 2.05865 12.1955 2.08627 12.2794 2.13837C12.3633 2.19048 12.431 2.26501 12.4748 2.35355L14.7848 7.03255C14.937 7.34052 15.1617 7.60696 15.4395 7.809C15.7173 8.01105 16.04 8.14266 16.3798 8.19255L21.5458 8.94855C21.6437 8.96273 21.7357 9.00402 21.8113 9.06775C21.887 9.13147 21.9433 9.2151 21.9739 9.30915C22.0045 9.40321 22.0081 9.50395 21.9844 9.59998C21.9607 9.69601 21.9107 9.7835 21.8398 9.85255L18.1038 13.4905C17.8575 13.7307 17.6731 14.027 17.5667 14.3542C17.4602 14.6813 17.4349 15.0294 17.4928 15.3685L18.3748 20.5085C18.3921 20.6064 18.3816 20.7071 18.3443 20.7992C18.3071 20.8914 18.2448 20.9712 18.1644 21.0295C18.084 21.0879 17.9888 21.1225 17.8897 21.1294C17.7906 21.1363 17.6915 21.1152 17.6038 21.0685L12.9858 18.6405C12.6816 18.4808 12.343 18.3973 11.9993 18.3973C11.6557 18.3973 11.3171 18.4808 11.0128 18.6405L6.39585 21.0685C6.30818 21.115 6.20924 21.1358 6.1103 21.1288C6.01135 21.1218 5.91636 21.0871 5.83614 21.0288C5.75592 20.9704 5.69368 20.8907 5.6565 20.7988C5.61933 20.7068 5.6087 20.6063 5.62585 20.5085L6.50685 15.3695C6.56504 15.0303 6.53983 14.6819 6.43338 14.3546C6.32694 14.0272 6.14245 13.7307 5.89585 13.4905L2.15985 9.85355C2.08844 9.78458 2.03784 9.69694 2.01381 9.60062C1.98978 9.5043 1.99328 9.40317 2.02393 9.30874C2.05457 9.21431 2.11111 9.13039 2.18712 9.06653C2.26313 9.00267 2.35555 8.96145 2.45385 8.94755L7.61885 8.19255C7.9591 8.14305 8.28224 8.01161 8.56043 7.80954C8.83863 7.60747 9.06355 7.34082 9.21585 7.03255L11.5248 2.35355Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-black text-center text-lg font-bold leading-[150%] font-sans mb-1">
                Premium Selection
              </h3>
              <p className="text-gray-400 text-sm  leading-[150%] font-sans">
                Trusted international brands only.
              </p>
            </div>
          </div>

          {/* Responsible & Safe */}
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <div className="flex w-[50px] h-[50px] justify-center items-center rounded-[10px] bg-[#F4F4F4]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 13.0586C20 18.0586 16.5 20.5586 12.34 22.0086C12.1222 22.0824 11.8855 22.0788 11.67 21.9986C7.5 20.5586 4 18.0586 4 13.0586V6.05856C4 5.79334 4.10536 5.53898 4.29289 5.35145C4.48043 5.16391 4.73478 5.05856 5 5.05856C7 5.05856 9.5 3.85855 11.24 2.33855C11.4519 2.15755 11.7214 2.05811 12 2.05811C12.2786 2.05811 12.5481 2.15755 12.76 2.33855C14.51 3.86855 17 5.05856 19 5.05856C19.2652 5.05856 19.5196 5.16391 19.7071 5.35145C19.8946 5.53898 20 5.79334 20 6.05856V13.0586Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.37598 18.9685C6.80269 17.8207 7.5704 16.8309 8.576 16.1321C9.5816 15.4333 10.777 15.0589 12.0015 15.0593C13.2261 15.0596 14.4212 15.4346 15.4265 16.1339C16.4317 16.8333 17.1989 17.8235 17.625 18.9715"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15.0585C14.2091 15.0585 16 13.2677 16 11.0585C16 8.84939 14.2091 7.05853 12 7.05853C9.79086 7.05853 8 8.84939 8 11.0585C8 13.2677 9.79086 15.0585 12 15.0585Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-black text-center text-lg font-bold leading-[150%] font-sans mb-1">
                Responsible & Safe
              </h3>
              <p className="text-gray-400 text-sm  leading-[150%] font-sans">
                Age-verified, compliant deliveries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
