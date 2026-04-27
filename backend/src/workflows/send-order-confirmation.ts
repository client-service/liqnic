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
        "total",
        "item_total",
        "tax_total",
        // Only fetch the specific names needed for the email greeting
        "customer.first_name",
        "shipping_address.first_name",
        // Prune Items
        "items.id",
        "items.thumbnail",
        "items.product_title",
        "items.variant_title",
        "items.total",
        // Prune Shipping Methods
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