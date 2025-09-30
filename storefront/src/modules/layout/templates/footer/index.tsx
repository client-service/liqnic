import Link from "next/link"
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu"
export default function Footer() {
  return (
    <footer className="w-full bg-[#F9F6EF] px-4 py-8 sm:py-12 lg:py-[50px]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-8 lg:mb-[35px]">
          {/* Logo and Social Section */}
          <div className="w-full lg:w-[282px] flex flex-col items-start gap-6 lg:gap-[34px]">
            <div className="flex flex-col items-start gap-4 lg:gap-[17px]">
              <img src="/logo.png" className="h-[55px] w-auto" />
              <p className="text-[#606060] text-[13px] font-medium leading-[20px] font-manrope">
                Short description of the company
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-[14px]">
              <a href="#" className="group">
                <div className="w-[22px] h-[22px]">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full group-hover:opacity-80 transition-opacity"
                  >
                    <g clipPath="url(#clip0_172_720)">
                      <path
                        d="M21.8021 11.8794C21.8021 5.82139 16.9213 0.910645 10.9014 0.910645C4.87881 0.912007 -0.00195312 5.82139 -0.00195312 11.8808C-0.00195312 17.3543 3.98496 21.8917 9.19547 22.7147V15.0502H6.42943V11.8808H9.1982V9.46221C9.1982 6.71388 10.8265 5.19596 13.3159 5.19596C14.5095 5.19596 15.7563 5.40989 15.7563 5.40989V8.1078H14.3815C13.0284 8.1078 12.606 8.95396 12.606 9.82193V11.8794H15.6282L15.1459 15.0488H12.6047V22.7133C17.8152 21.8903 21.8021 17.3529 21.8021 11.8794Z"
                        fill="#909090"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_172_720">
                        <rect
                          width="21.8013"
                          height="21.8013"
                          fill="white"
                          transform="translate(0 0.912109)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-[22px] h-[22px]">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full group-hover:opacity-80 transition-opacity"
                  >
                    <g clipPath="url(#clip0_172_722)">
                      <path
                        d="M11.0906 0.912109C8.13243 0.912109 7.76045 0.925735 6.59816 0.977513C5.43588 1.03202 4.64422 1.2146 3.95067 1.48439C3.22284 1.75735 2.56375 2.18667 2.01989 2.74206C1.4645 3.28592 1.03519 3.945 0.762226 4.67283C0.492435 5.36503 0.308486 6.15805 0.255345 7.31624C0.203567 8.48125 0.189941 8.85187 0.189941 11.8141C0.189941 14.7737 0.203567 15.1443 0.255345 16.3066C0.309849 17.4675 0.492435 18.2591 0.762226 18.9527C1.04155 19.6694 1.41354 20.2771 2.01989 20.8835C2.62487 21.4898 3.23259 21.8632 3.9493 22.1411C4.64422 22.4109 5.43452 22.5949 6.59544 22.648C7.75908 22.6998 8.1297 22.7134 11.0906 22.7134C14.0515 22.7134 14.4207 22.6998 15.5844 22.648C16.7439 22.5935 17.5383 22.4109 18.2319 22.1411C18.9592 21.868 19.6178 21.4387 20.1613 20.8835C20.7676 20.2771 21.1396 19.6694 21.419 18.9527C21.6874 18.2591 21.8713 17.4675 21.9258 16.3066C21.9776 15.1443 21.9912 14.7737 21.9912 11.8128C21.9912 8.85187 21.9776 8.48125 21.9258 7.31761C21.8713 6.15805 21.6874 5.36503 21.419 4.67283C21.146 3.945 20.7167 3.28592 20.1613 2.74206C19.6174 2.18667 18.9584 1.75735 18.2305 1.48439C17.5356 1.2146 16.7426 1.03065 15.583 0.977513C14.4194 0.925735 14.0501 0.912109 11.0879 0.912109H11.0906ZM10.1136 2.87695H11.092C14.0024 2.87695 14.3472 2.88649 15.4958 2.93963C16.5586 2.98732 17.1364 3.16582 17.5206 3.31434C18.0289 3.51192 18.3927 3.749 18.7742 4.13053C19.1557 4.51205 19.3914 4.8745 19.589 5.3841C19.7389 5.76699 19.916 6.34472 19.9637 7.40754C20.0169 8.55619 20.0278 8.90093 20.0278 11.81C20.0278 14.7191 20.0169 15.0652 19.9637 16.2139C19.916 17.2767 19.7375 17.8531 19.589 18.2373C19.413 18.71 19.1342 19.1377 18.7728 19.4895C18.3913 19.8711 18.0289 20.1068 17.5193 20.3044C17.1377 20.4543 16.56 20.6314 15.4958 20.6804C14.3472 20.7322 14.0024 20.7445 11.092 20.7445C8.18148 20.7445 7.83539 20.7322 6.68673 20.6804C5.62392 20.6314 5.04754 20.4543 4.6633 20.3044C4.19025 20.1289 3.76208 19.8506 3.40972 19.4895C3.04765 19.1375 2.76839 18.7093 2.59217 18.236C2.44365 17.8531 2.26515 17.2754 2.21746 16.2125C2.16568 15.0639 2.15478 14.7191 2.15478 11.8073C2.15478 8.89547 2.16568 8.55347 2.21746 7.40481C2.26652 6.342 2.44365 5.76426 2.59354 5.38001C2.79111 4.87177 3.0282 4.50796 3.40972 4.12644C3.79124 3.74492 4.15369 3.50919 4.6633 3.31162C5.04754 3.16173 5.62392 2.9846 6.68673 2.93554C7.69232 2.88922 8.08201 2.87559 10.1136 2.87423V2.87695ZM16.9102 4.68646C16.7384 4.68646 16.5683 4.72029 16.4096 4.78603C16.2509 4.85177 16.1067 4.94812 15.9852 5.06959C15.8638 5.19105 15.7674 5.33526 15.7017 5.49396C15.6359 5.65266 15.6021 5.82276 15.6021 5.99454C15.6021 6.16632 15.6359 6.33641 15.7017 6.49512C15.7674 6.65382 15.8638 6.79802 15.9852 6.91949C16.1067 7.04096 16.2509 7.13731 16.4096 7.20305C16.5683 7.26878 16.7384 7.30262 16.9102 7.30262C17.2571 7.30262 17.5898 7.1648 17.8351 6.91949C18.0804 6.67418 18.2183 6.34146 18.2183 5.99454C18.2183 5.64761 18.0804 5.3149 17.8351 5.06959C17.5898 4.82428 17.2571 4.68646 16.9102 4.68646ZM11.092 6.21528C10.3494 6.20369 9.61205 6.33993 8.9227 6.61607C8.23335 6.8922 7.60581 7.30271 7.07663 7.8237C6.54746 8.34469 6.12721 8.96574 5.84035 9.6507C5.5535 10.3357 5.40577 11.0708 5.40577 11.8134C5.40577 12.556 5.5535 13.2912 5.84035 13.9762C6.12721 14.6611 6.54746 15.2822 7.07663 15.8032C7.60581 16.3242 8.23335 16.7347 8.9227 17.0108C9.61205 17.287 10.3494 17.4232 11.092 17.4116C12.5616 17.3887 13.9632 16.7888 14.9944 15.7414C16.0255 14.6941 16.6035 13.2832 16.6035 11.8134C16.6035 10.3437 16.0255 8.93283 14.9944 7.88546C13.9632 6.8381 12.5616 6.2382 11.092 6.21528ZM11.092 8.17876C11.5692 8.17876 12.0417 8.27275 12.4826 8.45538C12.9235 8.638 13.3241 8.90568 13.6616 9.24313C13.999 9.58058 14.2667 9.98119 14.4493 10.4221C14.632 10.863 14.726 11.3355 14.726 11.8128C14.726 12.29 14.632 12.7625 14.4493 13.2034C14.2667 13.6443 13.999 14.0449 13.6616 14.3824C13.3241 14.7198 12.9235 14.9875 12.4826 15.1701C12.0417 15.3528 11.5692 15.4468 11.092 15.4468C10.1282 15.4468 9.20384 15.0639 8.52233 14.3824C7.84082 13.7009 7.45795 12.7766 7.45795 11.8128C7.45795 10.849 7.84082 9.92464 8.52233 9.24313C9.20384 8.56162 10.1282 8.17876 11.092 8.17876Z"
                        fill="#909090"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_172_722">
                        <rect
                          width="21.8013"
                          height="21.8013"
                          fill="white"
                          transform="translate(0.189941 0.912109)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-[22px] h-[22px]">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full group-hover:opacity-80 transition-opacity"
                  >
                    <g clipPath="url(#clip0_172_724)">
                      <path
                        d="M18.9128 4.08155C17.9135 3.07255 16.7233 2.27265 15.4116 1.7285C14.0999 1.18435 12.6929 0.906849 11.2728 0.912185C5.32245 0.912185 0.473027 5.76025 0.467576 11.712C0.467576 13.6183 0.966281 15.4727 1.90782 17.1146L0.380371 22.7135L6.10866 21.2119C7.69265 22.0761 9.46846 22.5283 11.2728 22.5268H11.2783C17.2301 22.5268 22.0781 17.6788 22.0836 11.7215C22.0848 10.3018 21.8051 8.89587 21.2607 7.58467C20.7163 6.27347 19.9193 5.08291 18.9128 4.08155ZM11.2728 20.6982C9.66388 20.697 8.08471 20.2641 6.70002 19.4447L6.373 19.2484L2.97473 20.1396L3.88221 16.8244L3.66964 16.4824C2.77008 15.0521 2.29432 13.3962 2.29752 11.7066C2.29752 6.76583 6.32668 2.73532 11.2783 2.73532C12.4579 2.7332 13.6263 2.96461 14.7161 3.41619C15.8059 3.86777 16.7955 4.5306 17.6279 5.36646C18.4631 6.1992 19.1251 7.18898 19.576 8.27875C20.0269 9.36852 20.2576 10.5367 20.255 11.7161C20.2495 16.6745 16.2204 20.6982 11.2728 20.6982ZM16.1986 13.9753C15.9302 13.8404 14.6044 13.1877 14.355 13.095C14.107 13.0065 13.9258 12.9601 13.7487 13.2299C13.5674 13.4984 13.0497 14.1101 12.8943 14.2859C12.739 14.4671 12.5782 14.4876 12.3084 14.3541C12.04 14.2178 11.1693 13.9344 10.1392 13.0119C9.33526 12.2966 8.79704 11.4109 8.63625 11.1424C8.48092 10.8727 8.62126 10.7282 8.75616 10.5933C8.8747 10.4734 9.02459 10.2772 9.15948 10.1219C9.29574 9.96654 9.34071 9.85208 9.42927 9.67222C9.51784 9.48964 9.4756 9.3343 9.40884 9.1994C9.34071 9.06451 8.80249 7.73327 8.57494 7.19641C8.35692 6.66637 8.13482 6.73995 7.96859 6.73313C7.81325 6.72359 7.63203 6.72359 7.45081 6.72359C7.31397 6.72708 7.17932 6.75877 7.05529 6.81668C6.93126 6.87459 6.82052 6.95748 6.73 7.06015C6.48201 7.32994 5.78846 7.98262 5.78846 9.31386C5.78846 10.6451 6.75589 11.9246 6.89215 12.1058C7.02568 12.287 8.79159 15.0108 11.5018 16.1826C12.1422 16.462 12.6463 16.6268 13.0401 16.7522C13.6873 16.9593 14.2719 16.928 14.7379 16.8612C15.2557 16.7822 16.3335 16.2072 16.561 15.5763C16.7845 14.944 16.7845 14.4045 16.7164 14.2914C16.6496 14.1769 16.4684 14.1101 16.1986 13.9753Z"
                        fill="#909090"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_172_724">
                        <rect
                          width="21.8013"
                          height="21.8013"
                          fill="white"
                          transform="translate(0.380371 0.912109)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-[135px] w-full lg:w-auto">
            {/* Explore Section */}
            <div className="flex flex-col items-start gap-[10px]">
              <h3 className="text-[#606060] text-[14px] font-bold leading-[35px] tracking-[0.84px] uppercase font-manrope">
                Explore
              </h3>
              <div className="flex flex-col items-start gap-[6px]">
                <a
                  href="/shop"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Shop
                </a>
                <a
                  href="/about"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  FAQs/help
                </a>
              </div>
            </div>

            {/* Legal Section */}
            <div className="flex flex-col items-start gap-[10px]">
              <h3 className="text-[#606060] text-[14px] font-bold leading-[35px] tracking-[0.84px] uppercase font-manrope">
                Legal
              </h3>
              <div className="flex flex-col items-start gap-[6px]">
                <Link
                  href="/terms-and-conditions"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Terms and conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Privacy policy
                </Link>
                <Link
                  href="#"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Disclaimer
                </Link>
                <Link
                  href="#"
                  className="text-[#606060] text-[13px] font-medium leading-[20px] hover:text-[#C5A163] transition-colors font-manrope"
                >
                  Shipping and returns
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-start gap-[10px]">
              <h3 className="text-[#606060] text-[14px] font-bold leading-[35px] tracking-[0.84px] uppercase font-manrope">
                Contact
              </h3>
              <div className="flex flex-col items-start gap-[6px]">
                <div className="flex items-center gap-[10px]">
                  <LuPhone className="w-4 h-4 text-black" />
                  <span className="text-[#606060] text-[13px] font-medium leading-[20px] font-manrope">
                    +977 9823123457
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <LuMail className="w-4 h-4 text-black" />
                  <span className="text-[#606060] text-[13px] font-medium leading-[20px] font-manrope">
                    support@liqnic.com
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <LuMapPin className="w-4 h-4 text-black" />
                  <span className="text-[#606060] text-[13px] font-medium leading-[20px] font-manrope">
                    Kathmandu, Nepal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Border */}
        <div className="border-t border-[#E2E8F0] pt-4">
          <div className="text-center">
            <p className="text-[#606060] text-[14px] font-medium leading-[24px] font-manrope">
              © 2025 Liqnic. All rights reserved.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              You must be 18+ to access this website. Please consume
              responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
