import {
  Text,
  Column,
  Container,
  Html,
  Row,
  Section,
  Tailwind,
  Head,
  Preview,
  Body,
  Hr,
} from "@react-email/components";
import {
  BigNumberValue,
  CustomerDTO,
  OrderDTO,
} from "@medusajs/framework/types";

// Extending the OrderDTO to ensure typescript doesn't complain about the summary and payment properties
type ExtendedOrderDTO = OrderDTO & {
  summary?: any;
  payment_collections?: any[];
  payment_status?: string;
};

type OrderPlacedEmailProps = {
  order: ExtendedOrderDTO & {
    customer: CustomerDTO;
  };
};

function OrderPlacedEmailComponent({ order }: OrderPlacedEmailProps) {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  });

  const formatPrice = (price: BigNumberValue) => {
    if (typeof price === "number") return formatter.format(price);
    if (typeof price === "string") return formatter.format(parseFloat(price));
    return price?.toString() || "";
  };

  // Extract the payment method safely
  const getPaymentMethod = () => {
    const providerId =
      order.payment_collections?.[0]?.payments?.[0]?.provider_id;
    if (!providerId) return "N/A";

    if (providerId.includes("cod-payment")) return "CASH ON DELIVERY";
    if (providerId.includes("qr-payment")) return "BANK TRANSFER (QR)";
    if (providerId.includes("stripe")) return "CREDIT CARD";

    return providerId.replace("pp_", "").toUpperCase();
  };

  const orderDate = new Date(order.created_at).toLocaleDateString();
  // Use the computed summary total, fallback to raw total
  const orderTotal = order.summary?.current_order_total || order.total || 0;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>
          Your Liqnic Invoice - Order ${String(order.display_id)}
        </Preview>
        <Body className="bg-[#f6f9fc] font-sans text-[#333333] my-4 mx-auto w-full">
          <Container className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            {/* Header: Logo and Company Info */}
            <Section className="mb-6">
              <Row>
                <Column align="left">
                  {/* Replace with your actual live logo URL */}
                  <Text className="text-3xl font-bold tracking-widest m-0 text-black">
                    LIQNIC
                  </Text>
                  <Text className="text-sm text-gray-500 m-0 mt-1">
                    Kathmandu, Nepal
                  </Text>
                  <Text className="text-sm text-gray-500 m-0">
                    liqnichost@gmail.com
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-2xl font-bold text-gray-300 m-0">
                    INVOICE
                  </Text>
                  <Text className="text-sm text-gray-500 m-0">
                    #{order.display_id}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Info Section: Address and Order Details */}
            <Section className="mb-8">
              <Row>
                <Column
                  className="w-1/2"
                  align="left"
                  style={{ verticalAlign: "top" }}
                >
                  <Text className="text-xs font-bold text-gray-400 tracking-wider uppercase m-0 mb-2">
                    Invoice To
                  </Text>
                  <Text className="text-sm font-bold text-gray-800 m-0">
                    {order.shipping_address?.first_name || "Guest"}{" "}
                    {order.shipping_address?.last_name || ""}
                  </Text>
                  <Text className="text-sm text-gray-600 m-0 mt-1">
                    {order.shipping_address?.address_1 || "N/A"}
                  </Text>
                  <Text className="text-sm text-gray-600 m-0">
                    {order.shipping_address?.city || ""},{" "}
                    {order.shipping_address?.province || ""}{" "}
                    {order.shipping_address?.postal_code || ""}
                  </Text>
                  <Text className="text-sm text-gray-600 m-0 mt-1">
                    Phone: {order.shipping_address?.phone || "N/A"}
                  </Text>
                </Column>

                <Column
                  className="w-1/2"
                  align="right"
                  style={{ verticalAlign: "top" }}
                >
                  <Text className="text-xs font-bold text-gray-400 tracking-wider uppercase m-0 mb-2">
                    Order Details
                  </Text>
                  <Text className="text-sm text-gray-600 m-0">
                    <strong>Date:</strong> {orderDate}
                  </Text>
                  <Text className="text-sm text-gray-600 m-0 mt-1">
                    <strong>Payment:</strong> {getPaymentMethod()}
                  </Text>
                  <Text className="text-sm text-gray-600 m-0 mt-1">
                    <strong>Status:</strong>{" "}
                    {order.payment_status?.toUpperCase()}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Items Table Header */}
            <Section className="bg-gray-50 rounded-t-lg p-3 border-b border-gray-200">
              <Row>
                <Column className="w-[50%]">
                  <Text className="text-xs font-bold text-gray-500 uppercase m-0">
                    Item
                  </Text>
                </Column>
                <Column className="w-[15%] text-center">
                  <Text className="text-xs font-bold text-gray-500 uppercase m-0">
                    Qty
                  </Text>
                </Column>
                <Column className="w-[35%] text-right">
                  <Text className="text-xs font-bold text-gray-500 uppercase m-0">
                    Total
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Items List */}
            {order.items?.map((item) => (
              <Section key={item.id} className="p-3 border-b border-gray-100">
                <Row>
                  <Column className="w-[50%]">
                    <Text className="text-sm font-semibold text-gray-800 m-0">
                      {item.product_title}
                    </Text>
                    {item.variant_title !== "Default variant" && (
                      <Text className="text-xs text-gray-500 m-0 mt-1">
                        {item.variant_title}
                      </Text>
                    )}
                  </Column>
                  <Column className="w-[15%] text-center">
                    <Text className="text-sm text-gray-600 m-0">
                      {item.quantity}x
                    </Text>
                  </Column>
                  <Column className="w-[35%] text-right">
                    <Text className="text-sm font-semibold text-gray-800 m-0">
                      {formatPrice(item.total)}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}

            {/* Summary / Totals */}
            <Section className="mt-6 pl-[40%]">
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Subtotal</Text>
                </Column>
                <Column align="right">
                  {/* Safely check for item_total or subtotal */}
                  <Text className="text-sm text-gray-800 m-0">
                    {formatPrice(order.item_total || order.subtotal || 0)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Tax</Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-800 m-0">
                    {formatPrice(order.tax_total || 0)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-4">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Shipping</Text>
                </Column>
                <Column align="right">
                  {/* Fixed: shipping_total lives at the root, not inside summary! */}
                  <Text className="text-sm text-gray-800 m-0">
                    {formatPrice(order.shipping_total || 0)}
                  </Text>
                </Column>
              </Row>

              <Hr className="border-gray-200 mb-4" />

              <Row>
                <Column>
                  <Text className="text-base font-bold text-gray-800 m-0">
                    Total
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="text-lg font-bold text-gray-900 m-0">
                    {formatPrice(orderTotal)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <Section className="mt-12 text-center">
              <Text className="text-sm text-gray-500">
                Thank you for shopping with Liqnic! 🥂
              </Text>
              <Text className="text-xs text-gray-400 mt-2">
                If you have any questions about this invoice, Please email at
                liqnichost@gmail.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
);
