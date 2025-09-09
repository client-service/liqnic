"use client"
import ImageSlider from "components/image-slider-contact"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: "",
    agreeToPrivacy: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacy: e.target.checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Main Content */}
      <section className="w-full px-4 lg:px-[100px] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px]">
            {/* Left Side - Contact Form */}
            <div className="w-full lg:w-[600px] bg-white rounded-[10px] p-6 sm:p-8 lg:p-[30px]">
              {/* Header */}
              <div className="mb-6 lg:mb-8">
                <h2 className="text-[#C5A163] text-xl sm:text-2xl lg:text-[25px] font-medium leading-[150%] font-manrope mb-3 lg:mb-4">
                  Get in touch
                </h2>
                <h1 className="text-[#323232] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:leading-[48px] tracking-tight lg:tracking-[-0.792px] font-manrope mb-4 lg:mb-6">
                  Let's Chat, Reach out to us
                </h1>
                <p className="text-[#606060] text-sm sm:text-base lg:text-[16px] font-medium leading-relaxed lg:leading-[26px] font-manrope mb-6 lg:mb-8">
                  Have questions or feedback? We're here to help. Send us a
                  message and we'll respond within few hours
                </p>
                <div className="w-full h-px bg-[#C5C5C5] mb-6 lg:mb-8"></div>
              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 lg:space-y-[20px]"
              >
                {/* First Row - Name Fields */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-[20px]">
                  <div className="flex-1">
                    <label className="block text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope mb-1 lg:mb-[5px]">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full py-2 sm:py-3 lg:py-[10px] px-3 sm:px-4 lg:px-[15px] rounded-[5px] bg-[#F7F7F7] text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope mb-1 lg:mb-[5px]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full py-2 sm:py-3 lg:py-[10px] px-3 sm:px-4 lg:px-[15px] rounded-[5px] bg-[#F7F7F7] text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Second Row - Email and Contact */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-[20px]">
                  <div className="flex-1">
                    <label className="block text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope mb-1 lg:mb-[5px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@gmail.com"
                      className="w-full py-2 sm:py-3 lg:py-[10px] px-3 sm:px-4 lg:px-[15px] rounded-[5px] bg-[#F7F7F7] text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope mb-1 lg:mb-[5px]">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="9860561235"
                      className="w-full py-2 sm:py-3 lg:py-[10px] px-3 sm:px-4 lg:px-[15px] rounded-[5px] bg-[#F7F7F7] text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope mb-1 lg:mb-[5px]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    rows={8}
                    className="w-full py-2 sm:py-3 lg:py-[10px] px-3 sm:px-4 lg:px-[15px] rounded-[5px] bg-[#F7F7F7] text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope resize-none focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                  />
                </div>

                {/* Privacy Policy and Submit */}
                <div className="space-y-3 lg:space-y-[13px]">
                  <div className="flex items-center gap-2 lg:gap-[5px]">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleCheckboxChange}
                      className="w-3 h-3 lg:w-[12px] lg:h-[12px] rounded-[2px] border border-[#E6E5E5] bg-[#F4F4F4] checked:bg-[#C5A163] checked:border-[#C5A163] focus:ring-2 focus:ring-[#C5A163] transition-colors"
                    />
                    <label
                      htmlFor="privacy"
                      className="text-[#606060] text-xs lg:text-[12px] font-normal leading-[150%] font-manrope"
                    >
                      I agree to the privacy policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.agreeToPrivacy}
                    className="w-full py-3 lg:py-[10.5px] px-4 lg:px-[7px] rounded-[3.5px] bg-[#B3935A] hover:bg-[#C5A163] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs sm:text-sm lg:text-[12.6px] font-bold leading-[150%] font-manrope transition-colors"
                  >
                    Submit My Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side - IQOS Showcase */}
            <div>
              <ImageSlider />
              {/* Contact Information Cards */}
              <div className="w-full  py-6 sm:py-8 lg:py-12">
                <div className="max-w-[1240px] mx-auto">
                  <div className="w-full lg:w-[600px] lg:ml-0 bg-white rounded-[10px] p-6 sm:p-8 lg:p-[30px]">
                    <div className="space-y-4 lg:space-y-[20px]">
                      {/* Email Card */}
                      <div className="flex items-center gap-4 lg:gap-[15px] p-4 sm:p-5 lg:p-[20px] bg-[#F9F9F9] rounded-[5px]">
                        <div className="w-12 h-12 lg:w-[49px] lg:h-[49px] bg-[#EDE2CF] rounded-[5px] flex items-center justify-center shrink-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7"
                              stroke="#53442A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                              stroke="#53442A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            Email
                          </h3>
                          <p className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            contact@liqnic.com
                          </p>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="flex items-center gap-4 lg:gap-[15px] p-4 sm:p-5 lg:p-[20px] bg-[#F9F9F9] rounded-[5px]">
                        <div className="w-12 h-12 lg:w-[49px] lg:h-[49px] bg-[#EDE2CF] rounded-[5px] flex items-center justify-center shrink-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            Phone
                          </h3>
                          <p className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            98605912345
                          </p>
                        </div>
                      </div>

                      {/* Delivery Time Card */}
                      <div className="flex items-center gap-4 lg:gap-[15px] p-4 sm:p-5 lg:p-[20px] bg-[#F9F9F9] rounded-[5px]">
                        <div className="w-12 h-12 lg:w-[49px] lg:h-[49px] bg-[#EDE2CF] rounded-[5px] flex items-center justify-center shrink-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 18V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H5"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 18H9"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17V13.35C21.9996 13.1231 21.922 12.903 21.78 12.726L18.3 8.376C18.2065 8.25888 18.0878 8.16428 17.9528 8.0992C17.8178 8.03412 17.6699 8.00021 17.52 8H14"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z"
                              stroke="#6C5936"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            Delivery time
                          </h3>
                          <p className="text-black text-sm lg:text-[14.4px] font-medium leading-[150%] font-manrope">
                            24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
