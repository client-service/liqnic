"use client"

import { useState } from "react"
import { toast } from "react-toastify"

interface AgeVerificationModalProps {
  isOpen: boolean
  onVerificationComplete: () => void
}

const toastBaseStyle = {
  background: "#FFF9F9",
  border: "none",
  borderRadius: "10px",
  padding: "16px 20px",
  boxShadow: "0 4px 10px 0 rgba(0,0,0,0.15)",
}

const toastClassName =
  "!bg-[#FFF9F9] !shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] !border-0 !rounded-[10px]"

function ToastContent({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[#CE0000] text-sm sm:text-base font-bold leading-snug font-manrope">
        {title}
      </p>
      <p className="text-[#606060] text-xs sm:text-sm font-medium leading-snug font-manrope">
        {message}
      </p>
    </div>
  )
}

export default function AgeVerificationModal({
  isOpen,
  onVerificationComplete,
}: AgeVerificationModalProps) {
  const [denied, setDenied] = useState(false)

  const handleYes = () => {
    sessionStorage.setItem("ageVerified", "true")
    sessionStorage.setItem("verificationDate", new Date().toISOString())
    onVerificationComplete()
  }

  const handleNo = () => {
    setDenied(true)
    toast.error(
      <ToastContent
        title="Access Denied"
        message="This website is only available to users 18+."
      />,
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: toastClassName,
        style: toastBaseStyle,
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="
          bg-white w-full
          rounded-t-[20px] sm:rounded-[10px]
          sm:max-w-[540px]
          max-h-[92dvh] sm:max-h-[90vh]
          overflow-y-auto
          px-5 pt-6 pb-8
          sm:px-8 sm:py-10
          lg:px-[50px] lg:py-[50px]
        "
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-5 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-[#C5A163] text-2xl sm:text-[28px] font-bold leading-tight font-manrope">
            Are you 18 or older?
          </h1>
          <p className="text-[#606060] text-sm sm:text-base font-medium leading-relaxed font-manrope mt-1">
            This website contains alcohol and nicotine products. You must be 18+
            to enter.
          </p>
        </div>

        {!denied ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Yes */}
            <button
              onClick={handleYes}
              className="
                flex-1 py-2
                rounded-[5px] bg-[#C5A163] hover:bg-[#B3935A]
                active:scale-[0.98] transition-all
                flex items-center justify-center
              "
            >
              <span className="text-white text-base sm:text-lg font-semibold tracking-tight font-manrope">
                Yes, I'm 18+
              </span>
            </button>

            {/* No */}
            <button
              onClick={handleNo}
              className="
                flex-1 py-2
                rounded-[5px] border border-[#EDEDED] bg-[#F6F6F6]
                hover:bg-[#EDEDED] active:scale-[0.98] transition-all
                flex items-center justify-center
              "
            >
              <span className="text-[#606060] text-base sm:text-lg font-semibold tracking-tight font-manrope">
                No, I'm not
              </span>
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-[#CE0000] text-sm sm:text-base font-semibold font-manrope">
              Sorry, you must be 18+ to access this site.
            </p>
          </div>
        )}

        <p className="text-[#AFAFAF] text-center text-xs sm:text-sm font-normal font-manrope mt-5">
          We promote responsible consumption.
        </p>
      </div>
    </div>
  )
}
