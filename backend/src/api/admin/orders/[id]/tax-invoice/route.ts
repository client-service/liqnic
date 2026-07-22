import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { INVOICE_MODULE } from "../../../../../modules/invoice"
import InvoiceModuleService from "../../../../../modules/invoice/services/invoice.service"
import { getTaxInvoiceWorkflow } from "../../../../../workflows/get-tax-invoice"

/**
 * Returns the order's tax invoice if one has already been issued, otherwise
 * 404. Use POST to mint one.
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id: order_id } = req.params

  const invoiceModuleService: InvoiceModuleService = req.scope.resolve(
    INVOICE_MODULE
  )

  const invoice = await invoiceModuleService.getForOrder(order_id)

  if (!invoice) {
    res.status(404).json({ message: "No tax invoice has been issued for this order yet." })
    return
  }

  res.json({ invoice })
}

/**
 * Issues the order's tax invoice, minting the next sequential invoice_number
 * on first call. Idempotent - repeat calls (reprints) return the same
 * invoice.
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id: order_id } = req.params

  const { result: invoice } = await getTaxInvoiceWorkflow(req.scope).run({
    input: { order_id },
  })

  res.json({ invoice })
}
