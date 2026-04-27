import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
  id: string
}

export const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  ({ id }: WorkflowInput) => {
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "currency_code",
        "created_at", // Add this so the date works in the email!
        "payment_status", // Add this so the status works!
        "total",
        "item_total",
        "tax_total",
        "summary.*",

        "payment_collections.*",
        "payment_collections.payments.*",

        "customer.first_name",
        "shipping_address.first_name",
        "shipping_address.last_name",
        "shipping_address.address_1",
        "shipping_address.city",
        "shipping_address.province",
        "shipping_address.postal_code",
        "shipping_address.phone",
        "items.id",
        "items.quantity", // Make sure quantity is here
        "items.thumbnail",
        "items.product_title",
        "items.variant_title",
        "items.total",
        "shipping_methods.id",
        "shipping_methods.name",
        "shipping_methods.total",
      ],
      filters: {
        id,
      },
    })

    const notification = sendNotificationStep([{
      to: orders[0].email!,
      channel: "email",
      template: "order-placed",
      data: {
        order: orders[0],
      },
    },
    // 2. Email to the Admin
    {
      to: process.env.ADMIN_ALERT_EMAIL || "liqnichost@gmail.com",
      channel: "email",
      template: "admin-order-alert", // Reusing the same beautiful React template!
      data: {
        order: orders[0],
      },
    }
    ])

    return new WorkflowResponse(notification)
  }
)