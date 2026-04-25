export const printPosReceipt = (order: any) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const formatMoney = (amount: number) => {
    return `Rs. ${(amount).toLocaleString()}`;
  };

  // Extract and format the payment method safely from the nested collections
  const getPaymentMethod = () => {
    const providerId = order.payment_collections?.[0]?.payments?.[0]?.provider_id;
    if (!providerId) return "N/A";

    if (providerId.includes("cod-payment")) return "CASH ON DELIVERY";
    if (providerId.includes("qr-payment")) return "BANK TRANSFER (QR)";

    return providerId.replace("pp_", "").toUpperCase();
  };

  // Grabs the exact dashboard URL they are currently on!
  const qrData = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;

  // The two copies we want to print
  const copies = ["Customer Copy", "Merchant Copy / Proof of Delivery"];

  const invoiceHTML = `
    <html>
      <head>
        <title>Invoice - Order #${order.display_id}</title>
        <style>
          /* Set standard A4 paper proportions */
          @page { size: A4; margin: 20mm; }
          body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            color: #333;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
          }
          .invoice-container { max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #000; }
          .qr-code { text-align: right; }
          .qr-code img { width: 100px; height: 100px; border: 1px solid #eee; padding: 4px; border-radius: 4px; }
          
          .info-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .info-block { width: 48%; }
          h3 { margin-top: 0; color: #555; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; }
          
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background-color: #f8f9fa; color: #333; font-weight: bold; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; }
          td { padding: 12px; border-bottom: 1px solid #ddd; }
          .text-right { text-align: right; }
          
          .summary-box { float: right; width: 300px; }
          .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .summary-row.total { font-size: 18px; font-weight: bold; border-bottom: none; border-top: 2px solid #333; padding-top: 12px; margin-top: 5px; color: #000; }
          .clearfix::after { content: ""; clear: both; display: table; }
          
          .footer { text-align: center; margin-top: 80px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        ${copies.map(copyType => `
          <div class="invoice-page">
          <div class="header">
            <div>
              <img 
                src="https://liqnic.com/_next/image?url=%2Flogo.png&w=256&q=75" 
                alt="Liqnic Logo" 
                style="max-height: 60px; max-width: 250px; object-fit: contain;" 
              />
              <div style="color: #666; margin-top: 4px;">Kathmandu, Nepal</div>
              <div style="color: #666;">liqnichost@gmail.com</div>
            </div>
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="Order QR Code" />
              <div style="font-size: 10px; margin-top: 5px; color: #666;">Scan for Order ID</div>
            </div>
          </div>

          <div class="info-section">
            <div class="info-block">
              <h3>Invoice To:</h3>
              <strong>${order.shipping_address?.first_name || 'Guest'} ${order.shipping_address?.last_name || ''}</strong><br>
              ${order.shipping_address?.address_1 || 'N/A'}<br>
              ${order.shipping_address?.city || ''}, ${order.shipping_address?.province || ''} ${order.shipping_address?.postal_code || ''}<br>
              Email: ${order.email}<br>
              Phone: ${order.shipping_address?.phone || 'N/A'}
            </div>
            <div class="info-block" style="text-align: right;">
              <h3>Order Details:</h3>
              <strong>Invoice #:</strong> ${order.display_id}<br>
              <strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}<br>
              <strong>Payment Method:</strong> ${getPaymentMethod()}<br>
              <strong>Status:</strong> ${order.payment_status.toUpperCase()}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr>
                  <td>
                    <strong>${item.title}</strong>
                    ${item.variant?.title && item.variant.title !== 'Default variant' ? `<br><span style="font-size: 12px; color: #777;">${item.variant.title}</span>` : ''}
                  </td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right">${formatMoney(item.unit_price)}</td>
                  <td class="text-right">${formatMoney(item.total)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="clearfix">
            <div class="summary-box">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatMoney(order.subtotal)}</span>
              </div>
              <div class="summary-row">
                <span>Tax:</span>
                <span>${formatMoney(order.tax_total)}</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>${formatMoney(order.shipping_total)}</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>${formatMoney(order.total)}</span>
              </div>
            </div>
          </div>

          <div class="footer">
              *** ${copyType} ***
            </div>
            <div style="text-align: center; margin-top: 10px; font-size: 12px; color: #777;">
              ${copyType === "Customer Copy" ? "Thank you for shopping with Liqnic!" : "Driver Signature: _______________________"}
            </div>
          </div>
        `).join('')}
        
        <script>
          window.onload = function() {
            // We add a 500ms delay to ensure the QR code image fully downloads before the print dialog opens!
            setTimeout(function() {
              window.print();
              window.onafterprint = function() { window.close(); }
            }, 500);
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
};