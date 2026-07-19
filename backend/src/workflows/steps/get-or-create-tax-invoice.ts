import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { ILockingModule } from "@medusajs/framework/types"
import { INVOICE_MODULE } from "../../modules/invoice"
import InvoiceModuleService from "../../modules/invoice/services/invoice.service"

type StepInput = {
  order_id: string
  pan_vat: string | null
}

export const getOrCreateTaxInvoiceStep = createStep(
  "get-or-create-tax-invoice",
  async (input: StepInput, { container }) => {
    const invoiceModuleService: InvoiceModuleService = container.resolve(
      INVOICE_MODULE
    )
    const lockingModuleService: ILockingModule = container.resolve(
      Modules.LOCKING
    )

    const invoice = await invoiceModuleService.getOrCreateForOrder(
      input.order_id,
      input.pan_vat,
      (key, job) => lockingModuleService.execute(key, job)
    )

    return new StepResponse(invoice)
  }
)
