import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { getOrCreateTaxInvoiceStep } from "./steps/get-or-create-tax-invoice"

type WorkflowInput = {
  order_id: string
}

/**
 * Returns the tax invoice for an order, minting the next sequential
 * invoice_number on first request. Safe to call repeatedly (e.g. reprints) -
 * always returns the same invoice for a given order.
 */
export const getTaxInvoiceWorkflow = createWorkflow(
  "get-tax-invoice",
  ({ order_id }: WorkflowInput) => {
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: ["id", "metadata"],
      filters: { id: order_id },
      options: { throwIfKeyNotFound: true },
    })

    const invoice = getOrCreateTaxInvoiceStep({
      order_id,
      pan_vat: (orders[0].metadata?.pan_vat as string) ?? null,
    })

    return new WorkflowResponse(invoice)
  }
)
