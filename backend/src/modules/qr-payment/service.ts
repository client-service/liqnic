import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { 
  InitiatePaymentInput, 
  InitiatePaymentOutput, 
  UpdatePaymentInput, 
  UpdatePaymentOutput, 
  AuthorizePaymentInput, 
  AuthorizePaymentOutput, 
  CapturePaymentInput, 
  CapturePaymentOutput, 
  RefundPaymentInput, 
  RefundPaymentOutput, 
  CancelPaymentInput, 
  CancelPaymentOutput, 
  DeletePaymentInput, 
  DeletePaymentOutput, 
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  WebhookActionResult 
} from "@medusajs/framework/types"

export default class QrPaymentProviderService extends AbstractPaymentProvider<Record<string, unknown>> {
  static identifier = "qr-payment"

  constructor(cradle: Record<string, unknown>, options: Record<string, unknown>) {
    super(cradle, options)
  }

  /**
   * 1. Initialize the Payment Session
   */
  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    return {
      id: "qr_" + Date.now(), 
      data: {
        ...input.data,
        status: "pending_user_input",
      },
    }
  }

  /**
   * 2. Update the Payment Session
   */
  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        status: "awaiting_manual_verification",
      },
    }
  }

  /**
   * 3. Authorize the Payment
   */
  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    return {
      status: "authorized",
      data: {
        ...(input.data || {}),
        verification_status: "unverified", 
      },
    }
  }

  /**
   * 4. Capture the Payment (Admin Action)
   */
  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        verification_status: "verified_and_captured",
      },
    }
  }

  /**
   * 5. Refund the Payment
   */
  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        refund_status: "refunded_manually",
        // Fixed: Medusa V2 changed `refund_amount` to `amount`
        refund_amount: input.amount, 
      },
    }
  }

  /**
   * 6. Cancel the Payment
   */
  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: {
        ...(input.data || {}),
        status: "canceled",
      },
    }
  }

  /**
   * 7. Delete the Payment Session
   */
  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {} as DeletePaymentOutput
  }

  /**
   * 8. Get Payment Status
   */
  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    // Fixed: V2 requires an object containing the status string
    return {
      status: "authorized",
    }
  }

  /**
   * 9. Retrieve Payment Data
   */
  async retrievePayment(input: Record<string, unknown>): Promise<any> {
    return input.data || {}
  }

  /**
   * 10. Webhook Actions
   */
  async getWebhookActionAndData(
    // Fixed: V2 explicit generic object requirement to handle raw Buffers
    data: { data: Record<string, unknown>; rawData: string | Buffer; headers: Record<string, unknown> }
  ): Promise<WebhookActionResult> {
    return { action: "not_supported" } as unknown as WebhookActionResult
  }
}