import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
} from "@react-email/components";

export const adminOrderAlertEmail = ({ order }: { order: any }) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <Container
          style={{
            border: "1px solid #eaeaea",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Heading style={{ color: "#d9534f" }}>🚨 New Order Received!</Heading>
          <Text>
            <strong>Order ID:</strong> #{order.display_id}
          </Text>
          <Text>
            <strong>Total Amount:</strong> {order.total}{" "}
            {order.currency_code?.toUpperCase()}
          </Text>
          <Text>
            <strong>Custmer Name:</strong>{" "}
            {order.customer?.first_name || order.shipping_address?.first_name}{" "}
            {order.customer?.last_name || order.shipping_address?.last_name}
          </Text>
          <Text>
            <strong>Customer Email:</strong> {order.email}
          </Text>
          <Text style={{ marginTop: "20px" }}>
            Please log into the{" "}
            <a href="https://cms.liqnic.com">Admin Dashboard</a> to view full
            details, print the invoice, and fulfill the items.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
