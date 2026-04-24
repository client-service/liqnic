import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { 
  InitiatePaymentInput, InitiatePaymentOutput, 
  UpdatePaymentInput, UpdatePaymentOutput, 
  AuthorizePaymentInput, AuthorizePaymentOutput, 
  CapturePaymentInput, CapturePaymentOutput, 
  RefundPaymentInput, RefundPaymentOutput, 
  CancelPaymentInput, CancelPaymentOutput, 
  DeletePaymentInput, DeletePaymentOutput, 
  GetPaymentStatusInput, GetPaymentStatusOutput,
  WebhookActionResult 
} from "@medusajs/framework/types"

export default class CodPaymentProviderService extends AbstractPaymentProvider<Record<string, unknown>> {
  static identifier = "cod-payment"

  constructor(cradle: Record<string, unknown>, options: Record<string, unknown>) {
    super(cradle, options)
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    return {
      id: "cod_" + Date.now(), 
      data: { status: "pending_delivery" },
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: input.data || {} }
  }

  // Authorizes immediately so the warehouse can ship the box without payment
  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    return {
      status: "authorized",
      data: {
        status: "awaiting_cash_from_driver", 
      },
    }
  }

  // Admin clicks this when the driver hands them the cash
  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: {
        status: "cash_received_and_captured",
      },
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return {
      data: {
        refund_status: "refunded_cash",
        amount: input.amount, 
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: { status: "canceled" } }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {} as DeletePaymentOutput
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return { status: "authorized" }
  }

  async retrievePayment(input: Record<string, unknown>): Promise<any> {
    return input.data || {}
  }

  async getWebhookActionAndData(
    data: { data: Record<string, unknown>; rawData: string | Buffer; headers: Record<string, unknown> }
  ): Promise<WebhookActionResult> {
    return { action: "not_supported" } as unknown as WebhookActionResult
  }
}