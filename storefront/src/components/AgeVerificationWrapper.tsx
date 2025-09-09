"use client"

import { useState, useEffect } from "react"
import AgeVerificationModal from "./AgeVerificationModal"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AgeVerificationWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified") === "true"
    if (verified) {
      setIsVerified(true)
      setModalOpen(false)
    } else {
      setIsVerified(false)
      setModalOpen(true)
    }
  }, [])

  const handleVerificationComplete = () => {
    setIsVerified(true)
    setModalOpen(false)
  }

  // 🚨 Avoid flashing during first hydration
  if (isVerified === null) return null

  return (
    <>
      {/* ✅ Always render children */}
      {children}

      {/* ✅ Modal overlays the page */}
      <AgeVerificationModal
        isOpen={modalOpen}
        onVerificationComplete={handleVerificationComplete}
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="custom-toast"
      />
    </>
  )
}
