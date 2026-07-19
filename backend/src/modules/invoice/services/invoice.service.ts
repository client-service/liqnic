import { MedusaService } from "@medusajs/framework/utils"
import { InferTypeOf } from "@medusajs/framework/types"
import Invoice from "../models/invoice"
import { getNepaliFiscalYear } from "../utils/fiscal-year"

type Invoice = InferTypeOf<typeof Invoice>

class InvoiceModuleService extends MedusaService({
  Invoice,
}) {
  async getForOrder(orderId: string): Promise<Invoice | null> {
    const invoices = await this.listInvoices({ order_id: orderId })
    return invoices[0] || null
  }

  /**
   * Returns the order's existing tax invoice, or mints the next number in the
   * sequential per-fiscal-year series and persists it.
   *
   * `withLock` must serialize concurrent callers across all processes for the
   * same fiscal year (e.g. the locking module's `execute`) so two orders
   * placed at the same instant never receive the same invoice_number.
   */
  async getOrCreateForOrder(
    orderId: string,
    panVat: string | null,
    withLock: (key: string, job: () => Promise<Invoice>) => Promise<Invoice>
  ): Promise<Invoice> {
    const existing = await this.getForOrder(orderId)
    if (existing) {
      return existing
    }

    const fiscalYear = getNepaliFiscalYear(new Date())

    return withLock(`invoice:seq:${fiscalYear}`, async () => {
      // Re-check inside the lock in case another request created it while we
      // were waiting to acquire it.
      const existingUnderLock = await this.getForOrder(orderId)
      if (existingUnderLock) {
        return existingUnderLock
      }

      const invoicesThisYear = await this.listInvoices({
        fiscal_year: fiscalYear,
      })
      const nextSequence =
        invoicesThisYear.reduce((max, inv) => Math.max(max, inv.sequence), 0) + 1

      const invoiceNumber = `INV-${String(nextSequence).padStart(
        4,
        "0"
      )}-${fiscalYear}`

      return this.createInvoices({
        order_id: orderId,
        invoice_number: invoiceNumber,
        sequence: nextSequence,
        fiscal_year: fiscalYear,
        pan_vat: panVat,
        issued_at: new Date(),
      })
    })
  }
}

export default InvoiceModuleService
