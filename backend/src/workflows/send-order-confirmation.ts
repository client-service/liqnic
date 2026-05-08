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
        "created_at",
        "payment_status",
        "total",
        "subtotal",
        "item_total",
        "tax_total",
        "shipping_total",
        "discount_total",
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
        "items.quantity",
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

    const recipients = ["liqnicinfo@gmail.com", "liqnichost@gmail.com"];
    const notifications = recipients.map(recipient => sendNotificationStep([
      {
        to: recipient,
        channel: "email",
        template: "admin-order-alert",
        data: {
          order: orders[0],
        },
      }
    ])
  )

    return new WorkflowResponse(notifications)
  }
)