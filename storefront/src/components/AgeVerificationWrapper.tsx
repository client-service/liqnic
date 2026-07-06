"use client"

import { useState, useEffect } from "react"
import AgeVerificationModal from "./AgeVerificationModal"

export default function AgeVerificationWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const verified = sessionStorage.getItem("ageVerified") === "true"
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

  if (isVerified === null) return null

  return (
    <>
      {children}
      <AgeVerificationModal
        isOpen={modalOpen}
        onVerificationComplete={handleVerificationComplete}
      />
    </>
  )
}
