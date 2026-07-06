"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type PaymentMethod = "cod" | "qr"

type PaymentSelectorProps = {
  cart: HttpTypes.StoreCart
  codProviderId: string
  qrProviderId: string
}

export default function PaymentSelector({
  cart,
  codProviderId,
  qrProviderId,
}: PaymentSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isReviewStep = searchParams.get("step") === "review"

  const [selected, setSelected] = useState<PaymentMethod | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [bankName, setBankName] = useState("")
  const [initStatus, setInitStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle")
  const [refStatus, setRefStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const canContinue =
    selected === "cod"
      ? initStatus === "done"
      : selected === "qr"
      ? refStatus === "saved"
      : false

  async function selectMethod(method: PaymentMethod) {
    if (isReviewStep || selected === method) return
    setSelected(method)
    setErrorMsg("")
    setRefStatus("idle")

    setInitStatus("loading")
    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          providerId: method === "cod" ? codProviderId : qrProviderId,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? `Payment init failed (${res.status})`)
      }
      setInitStatus("done")
    } catch (err: any) {
      setInitStatus("error")
      setErrorMsg(
        err.message ?? "Failed to initialize payment. Please try again."
      )
    }
  }

  async function saveReference() {
    if (!transactionId.trim()) {
      setErrorMsg("Please enter your Transaction ID, Receipt No., or phone number.")
      return
    }
    setRefStatus("saving")
    setErrorMsg("")
    try {
      const res = await fetch("/api/payment/qr-reference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          transactionId: transactionId.trim(),
          bankName: bankName.trim() || undefined,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? `Request failed (${res.status})`)
      }
      setRefStatus("saved")
    } catch (err: any) {
      setRefStatus("error")
      setErrorMsg(err.message ?? "Something went wrong. Please try again.")
    }
  }

  function goToReview() {
    router.push(pathname + "?step=review")
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-gray-700">Payment Method</p>

      <div className="grid grid-cols-2 gap-3">
        {/* COD */}
        <button
          type="button"
          onClick={() => selectMethod("cod")}
          disabled={isReviewStep || initStatus === "loading"}
          className={`
            relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all
            ${isReviewStep ? "cursor-not-allowed opacity-70" : ""}
            ${
              selected === "cod"
                ? "border-[#C5A163] bg-[#C5A163]/5 ring-1 ring-[#C5A163]/40"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }
          `}
        >
          <span
            className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected === "cod" ? "border-[#C5A163]" : "border-gray-300"
            }`}
          >
            {selected === "cod" && (
              <span className="w-2 h-2 rounded-full bg-[#C5A163]" />
            )}
          </span>
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#C5A163]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#C5A163]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Cash on Delivery
            </p>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug">
              Pay when your order arrives
            </p>
          </div>
        </button>

        {/* QR */}
        <button
          type="button"
          onClick={() => selectMethod("qr")}
          disabled={isReviewStep || initStatus === "loading"}
          className={`
            relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all
            ${isReviewStep ? "cursor-not-allowed opacity-70" : ""}
            ${
              selected === "qr"
                ? "border-[#C5A163] bg-[#C5A163]/5 ring-1 ring-[#C5A163]/40"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }
          `}
        >
          <span
            className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected === "qr" ? "border-[#C5A163]" : "border-gray-300"
            }`}
          >
            {selected === "qr" && (
              <span className="w-2 h-2 rounded-full bg-[#C5A163]" />
            )}
          </span>
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#C5A163]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#C5A163]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Pay Now</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug">
              Bank transfer via QR code
            </p>
          </div>
        </button>
      </div>

      {/* Loading indicator */}
      {initStatus === "loading" && (
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <span className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          Setting up payment…
        </p>
      )}

      {/* Init error */}
      {initStatus === "error" && errorMsg && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMsg}
        </p>
      )}

      {/* QR reference section */}
      {selected === "qr" && initStatus === "done" && (
        <div className="rounded-xl border border-[#C5A163]/30 bg-white overflow-hidden">
          <div className="px-4 py-3 bg-[#C5A163]/5 border-b border-[#C5A163]/20 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[#C5A163] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <p className="text-xs font-semibold text-gray-700">
              Scan, transfer, then enter your reference below
            </p>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 inline-flex">
                <Image
                  src="/images/qrimage.png"
                  alt="Payment QR Code"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
              <li>Scan the QR code with your banking app.</li>
              <li>Complete the transfer for the exact order total.</li>
              <li>
                Copy the{" "}
                <strong className="text-gray-700">
                  Transaction / Reference ID
                </strong>{" "}
                shown in your app.
              </li>
              <li>
                Paste it below and click{" "}
                <strong className="text-gray-700">Confirm</strong>.
              </li>
            </ol>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="bank-name"
                className="text-xs font-medium text-gray-600"
              >
                Your Bank{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="bank-name"
                type="text"
                placeholder="e.g. Nabil Bank, NIC Asia…"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                disabled={isReviewStep}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A163]/40 focus:border-[#C5A163] transition disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="transaction-id"
                className="text-xs font-medium text-gray-600"
              >
                Payment Proof <span className="text-red-400">*</span>
              </label>
              <p className="text-[11px] text-gray-400 leading-snug -mt-0.5">
                Enter your <strong className="text-gray-500">Transaction / Voucher ID</strong>, <strong className="text-gray-500">Receipt No.</strong>, or your <strong className="text-gray-500">registered phone number</strong> used for the transfer.
              </p>
              <div className="flex gap-2 mt-0.5">
                <input
                  id="transaction-id"
                  type="text"
                  placeholder="e.g. TXN123456789 or 98XXXXXXXX"
                  value={transactionId}
                  onChange={(e) => {
                    setTransactionId(e.target.value)
                    if (refStatus === "error") setRefStatus("idle")
                    if (errorMsg) setErrorMsg("")
                  }}
                  disabled={isReviewStep}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A163]/40 focus:border-[#C5A163] transition disabled:opacity-60"
                />
                {!isReviewStep && refStatus !== "saved" && (
                  <button
                    type="button"
                    onClick={saveReference}
                    disabled={refStatus === "saving"}
                    className="shrink-0 rounded-lg bg-[#C5A163] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b8904f] active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {refStatus === "saving" ? "Saving…" : "Confirm"}
                  </button>
                )}
                {!isReviewStep && refStatus === "saved" && (
                  <button
                    type="button"
                    onClick={() => {
                      setRefStatus("idle")
                      setErrorMsg("")
                    }}
                    className="shrink-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMsg}
              </p>
            )}

            {refStatus === "saved" && (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Reference saved!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Continue button */}
      {!isReviewStep && (
        <div className="flex flex-col gap-2 pt-1">
          {!selected && (
            <p className="text-center text-xs text-gray-400">
              Select a payment method to continue.
            </p>
          )}
          <button
            type="button"
            onClick={goToReview}
            disabled={!canContinue}
            className="w-full h-12 rounded-xl bg-black hover:bg-gray-900 text-white text-sm font-semibold active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {initStatus === "loading" ? "Please wait…" : "Continue to Review"}
          </button>
        </div>
      )}
    </div>
  )
}