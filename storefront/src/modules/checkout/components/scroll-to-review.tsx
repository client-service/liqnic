"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ScrollToReview() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("step") === "review") {
      document.getElementById("review-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [searchParams])

  return null
}
