import { useState, useEffect } from "react"
import { toast } from "react-toastify"

interface AgeVerificationModalProps {
  isOpen: boolean
  onVerificationComplete: () => void
}

export default function AgeVerificationModal({
  isOpen,
  onVerificationComplete,
}: AgeVerificationModalProps) {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const calculateAge = (birthDate: string): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  const showConfirmationRequiredToast = () => {
    const toastContent = (
      <div className="flex flex-col gap-1">
        <div className="text-[#CE0000] text-lg font-bold leading-[150%] font-manrope">
          Confirmation Required
        </div>
        <div className="text-[#606060] text-base font-medium leading-[150%] font-manrope">
          Please confirm you are 18+ to continue.
        </div>
      </div>
    )

    toast.error(toastContent, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className:
        "!bg-[#FFF9F9] !shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] !border-0 !rounded-[10px] !p-[25px] !min-h-[106px]",
      //   bodyClassName: "!p-0 !m-0",
      style: {
        background: "#FFF9F9",
        border: "none",
        borderRadius: "10px",
        padding: "25px",
        minHeight: "106px",
        boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.15)",
      },
    })
  }

  const showAccessDeniedToast = () => {
    const toastContent = (
      <div className="flex flex-col gap-1">
        <div className="text-[#CE0000] text-lg font-bold leading-[150%] font-manrope">
          Access Denied
        </div>
        <div className="text-[#606060] text-base font-medium leading-[150%] font-manrope">
          Access restricted. This website is only available to users 18+.
        </div>
      </div>
    )

    toast.error(toastContent, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className:
        "!bg-[#FFF9F9] !shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] !border-0 !rounded-[10px] !p-[25px] !min-h-[106px]",
      //   bodyClassName: "!p-0 !m-0",
      style: {
        background: "#FFF9F9",
        border: "none",
        borderRadius: "10px",
        padding: "25px",
        minHeight: "106px",
        boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.15)",
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if form is complete
    if (!dateOfBirth || !isTermsAccepted) {
      showConfirmationRequiredToast()
      return
    }

    // Check if user is 18+
    const age = calculateAge(dateOfBirth)
    if (age < 18) {
      showAccessDeniedToast()
      setDateOfBirth("")
      setIsTermsAccepted(false)
      return
    }

    // User is verified
    localStorage.setItem("ageVerified", "true")
    localStorage.setItem("verificationDate", new Date().toISOString())
    onVerificationComplete()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-[5px] w-full max-w-[626px] p-6 sm:p-8 lg:p-[50px] relative">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8 lg:mb-[27px]">
          <h1 className="text-[#C5A163] text-2xl sm:text-3xl lg:text-[30px] font-bold leading-[150%] font-manrope">
            Verify your age
          </h1>
          <p className="text-[#606060] text-base sm:text-lg lg:text-[18px] font-medium leading-[150%] font-manrope">
            You must be 18+ to enter this website. Please confirm your age.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
          {/* Date of Birth */}
          <div className="flex flex-col gap-2 lg:gap-[6px]">
            <label className="text-black text-base sm:text-lg lg:text-[18px] font-medium leading-[150%] font-manrope">
              Enter date of birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full h-[59px] px-4 lg:px-[15px] py-3 lg:py-[16px] rounded-[5px] bg-[#F4F4F4] text-[#606060] text-base lg:text-[16px] font-normal leading-[150%] font-manrope focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white transition-colors"
                placeholder="mm/dd/yyyy"
              />
              {/* <div className="absolute right-4 lg:right-[20px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.7998 2.86255V6.86255"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.7998 2.86255V6.86255"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.7998 4.86255H5.7998C4.69524 4.86255 3.7998 5.75798 3.7998 6.86255V20.8625C3.7998 21.9671 4.69524 22.8625 5.7998 22.8625H19.7998C20.9044 22.8625 21.7998 21.9671 21.7998 20.8625V6.86255C21.7998 5.75798 20.9044 4.86255 19.7998 4.86255Z"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.7998 10.8625H21.7998"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.7998 14.8625H8.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.7998 14.8625H12.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.7998 14.8625H16.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.7998 18.8625H8.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.7998 18.8625H12.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.7998 18.8625H16.8098"
                    stroke="#AFAFAF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div> */}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 lg:gap-4">
            <div className="flex items-center h-6 mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="w-5 h-5 lg:w-[20px] lg:h-[20px] rounded-[5px] border border-[#EDEDED] bg-[#F6F6F6] checked:bg-[#C5A163] checked:border-[#C5A163] focus:ring-2 focus:ring-[#C5A163] transition-colors"
              />
            </div>
            <label
              htmlFor="terms"
              className="text-[#606060] text-base sm:text-lg lg:text-[18px] font-medium leading-[150%] font-manrope cursor-pointer"
            >
              I confirm I am 18+ and accept the terms for responsible
              consumption of alcohol and nicotine products.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[59px] rounded-[5px] bg-[#C5A163] hover:bg-[#B3935A] transition-colors flex items-center justify-center"
          >
            <span className="text-white text-lg sm:text-xl lg:text-[22px] font-semibold leading-[150%] tracking-[-0.44px] font-manrope">
              Enter website
            </span>
          </button>

          {/* Footer Text */}
          <p className="text-[#AFAFAF] text-center text-base lg:text-[16px] font-normal leading-[150%] font-manrope mt-6">
            We promote responsible consumption.
          </p>
        </form>
      </div>
    </div>
  )
}
