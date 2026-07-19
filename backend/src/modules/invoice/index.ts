import { Module } from "@medusajs/framework/utils"
import InvoiceModuleService from "./services/invoice.service"

export const INVOICE_MODULE = "invoice"

export default Module(INVOICE_MODULE, {
  service: InvoiceModuleService,
})
