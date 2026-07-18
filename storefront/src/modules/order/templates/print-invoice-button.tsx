"use client"

import { HttpTypes } from "@medusajs/types"
import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { convertToLocale } from "@lib/util/money"

type Props = {
  order: HttpTypes.StoreOrder
}

export default function PrintInvoiceButton({ order }: Props) {
  const [open, setOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const currency_code = order.currency_code
  const format = (amount: number) => convertToLocale({ amount, currency_code })

  const taxLine = order.items?.[0]?.tax_lines?.[0]
  const taxName = taxLine?.description ?? taxLine?.code ?? "VAT"
  const taxRate = taxLine?.rate ?? 0
  const shippingAddress = order.shipping_address

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  const handleDownload = async () => {
    const content = printRef.current
    if (!content) return

    setIsDownloading(true)
    try {
      const { default: jsPDF } = await import("jspdf")
      const { default: html2canvas } = await import("html2canvas")

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      let yOffset = 0
      while (yOffset < imgHeight) {
        if (yOffset > 0) pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight)
        yOffset += pageHeight
      }

      pdf.save(`invoice-${order.display_id}.pdf`)
    } finally {
      setIsDownloading(false)
    }
  }

  const DownloadIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"
      />
    </svg>
  )

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center justify-center gap-2
          w-full sm:w-auto h-11 px-6 rounded-xl
          border border-gray-200 bg-white
          text-sm font-medium text-gray-700
          hover:bg-gray-50 hover:border-gray-300
          active:scale-[0.98] transition-all
        "
      >
        <DownloadIcon />
        Download Invoice
      </button>

      {/* ── Modal (portaled to document.body) ───────────────────────────── */}
      {open &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="
                fixed inset-0 z-[9999] bg-black/50
                sm:flex sm:items-center sm:justify-center
              "
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Dialog */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Invoice preview"
              onClick={(e) => e.stopPropagation()}
              className="
                fixed z-[9999] bg-white
                left-0 right-0 bottom-0 top-16
                rounded-t-2xl
                sm:rounded-2xl sm:w-full sm:max-w-2xl
                sm:bottom-auto sm:left-1/2 sm:top-1/2
                sm:-translate-x-1/2 sm:-translate-y-1/2
                sm:max-h-[80vh]
                flex flex-col shadow-2xl
              "
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-base font-semibold text-gray-900">
                  Invoice Preview
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="
                      flex items-center gap-1.5 h-9 px-4 rounded-lg
                      bg-black text-white text-sm font-medium
                      hover:bg-gray-900 active:scale-95 transition-all
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    {isDownloading ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Downloading…
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"
                          />
                        </svg>
                        Download
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close invoice"
                    className="
                      w-9 h-9 flex items-center justify-center
                      rounded-lg border border-gray-200 text-gray-500
                      hover:bg-gray-50 active:scale-95 transition-all
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable invoice content */}
              <div className="overflow-y-auto flex-1">
                <div ref={printRef} className="p-4 sm:p-8">
                  {/* Invoice header */}
                  <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
                    <div>
                      <p className="text-xl sm:text-2xl font-bold">Liqnic</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        liqnic.com
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-bold">INVOICE</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        #{order.display_id}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Bill to */}
                  <div className="mb-5 sm:mb-6">
                    <p className="text-xs uppercase text-gray-400 mb-1.5 tracking-wide">
                      Bill To
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {shippingAddress?.first_name} {shippingAddress?.last_name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {order.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {shippingAddress?.address_1}
                      {shippingAddress?.address_2
                        ? `, ${shippingAddress.address_2}`
                        : ""}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {[
                        shippingAddress?.city,
                        shippingAddress?.province,
                        shippingAddress?.postal_code,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {shippingAddress?.country_code?.toUpperCase()}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="mb-5 sm:mb-6 overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm min-w-[280px]">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-2.5 px-2 sm:px-3 font-medium text-gray-600">
                            Item
                          </th>
                          <th className="text-center py-2.5 px-2 sm:px-3 font-medium text-gray-600 w-10">
                            Qty
                          </th>
                          <th className="hidden sm:table-cell text-right py-2.5 px-3 font-medium text-gray-600">
                            Unit Price
                          </th>
                          <th className="text-right py-2.5 px-2 sm:px-3 font-medium text-gray-600">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-2.5 px-2 sm:px-3">
                              <p className="font-medium text-gray-900 leading-snug">
                                {item.title}
                              </p>
                              {item.variant_title && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {item.variant_title}
                                </p>
                              )}
                            </td>
                            <td className="py-2.5 px-2 sm:px-3 text-center text-gray-600">
                              {item.quantity}
                            </td>
                            <td className="hidden sm:table-cell py-2.5 px-3 text-right text-gray-600">
                              {format(item.unit_price)}
                            </td>
                            <td className="py-2.5 px-2 sm:px-3 text-right font-medium text-gray-900">
                              {format(item.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end">
                    <table className="w-full sm:w-72 text-xs sm:text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1.5 text-gray-500">
                            Subtotal (excl. {taxName})
                          </td>
                          <td className="py-1.5 text-right font-medium">
                            {format(order?.subtotal)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1.5 text-gray-500">
                            {taxName} ({taxRate}%)
                          </td>
                          <td className="py-1.5 text-right font-medium">
                            {format(
                              order.tax_total && order.tax_total > 0
                                ? order.tax_total
                                : Math.round(
                                    (order.subtotal ?? 0) -
                                      (order.subtotal ?? 0) /
                                        (1 + taxRate / 100)
                                  )
                            )}
                          </td>
                        </tr>
                        {(order.shipping_total ?? 0) > 0 && (
                          <tr>
                            <td className="py-1.5 text-gray-500">Shipping</td>
                            <td className="py-1.5 text-right font-medium">
                              {format(order.shipping_total ?? 0)}
                            </td>
                          </tr>
                        )}
                        {(order.discount_total ?? 0) > 0 && (
                          <tr>
                            <td className="py-1.5 text-green-600">Discount</td>
                            <td className="py-1.5 text-right font-medium text-green-600">
                              − {format(order.discount_total ?? 0)}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="pt-3 pb-1 font-bold text-sm sm:text-base border-t-2 border-gray-900">
                            Total (incl. {taxName})
                          </td>
                          <td className="pt-3 pb-1 text-right font-bold text-sm sm:text-base border-t-2 border-gray-900">
                            {format(order.total ?? 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 sm:mt-10 pt-5 border-t border-gray-200 text-center text-xs text-gray-400">
                    <p>Thank you for shopping with Liqnic!</p>
                    <p className="mt-1">
                      For any queries, contact us at liqnichost@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}
