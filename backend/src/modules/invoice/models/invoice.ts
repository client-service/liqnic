import { model } from "@medusajs/framework/utils"

const Invoice = model.define("invoice", {
  id: model.id().primaryKey(),
  order_id: model.text().unique("IDX_INVOICE_ORDER_ID"),
  invoice_number: model.text().unique("IDX_INVOICE_NUMBER"),
  sequence: model.number(),
  fiscal_year: model.text(),
  pan_vat: model.text().nullable(),
  issued_at: model.dateTime(),
})

export default Invoice
