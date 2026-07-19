import { HttpTypes } from "@medusajs/types"
import { formatBsDate } from "./nepali-date"
import { amountInWords } from "./amount-in-words"

type TaxInvoiceMeta = {
  invoice_number: string
  issued_at: string | Date
}

/**
 * Prints the Nepal-compliant Tax Invoice for a B2B order (billing_address has
 * a PAN/VAT number attached). Mirrors the window.open + window.print()
 * pattern used by printPosReceipt in print-receipt.ts, but renders the exact
 * owner-supplied layout (Khirkhirya Enterprises Pvt. Ltd. letterhead).
 */
export const printTaxInvoice = (
  order: HttpTypes.AdminOrder,
  invoice: TaxInvoiceMeta,
  { title = "TAX INVOICE" }: { title?: "TAX INVOICE" | "INVOICE" } = {}
) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Customer-entered fields (company name, PAN/VAT, address) reach this
  // template unsanitized from the storefront checkout - escape before
  // interpolating so a crafted value can't execute script in the admin's
  // browser when this window is printed.
  const escapeHtml = (value: unknown): string =>
    String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char] as string));

  const formatMoney = (amount: number) => {
    return (amount ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getPaymentMethod = () => {
    const providerId = order.payment_collections?.[0]?.payments?.[0]?.provider_id;
    if (!providerId) return "N/A";

    if (providerId.includes("cod-payment")) return "Cash";
    if (providerId.includes("qr-payment")) return "QR";

    return providerId.replace("pp_", "").toUpperCase();
  };

  const billing = order.billing_address;
  const issuedAt = new Date(invoice.issued_at);

  const customerName = billing?.company || `${billing?.first_name || ''} ${billing?.last_name || ''}`.trim() || 'N/A';
  const customerAddress = [billing?.address_1, billing?.city, billing?.province, billing?.postal_code]
    .filter(Boolean)
    .join(', ');
  const panVat = (order.metadata as Record<string, unknown> | undefined)?.pan_vat as string | undefined;

  const items = (order.items || []) as any[];
  const shippingTotal = order.shipping_total || 0;
  const shippingSubtotal = (order as any).shipping_subtotal ?? shippingTotal;

  const rows = items.map((item, index) => {
    const product = item.variant?.product;
    const hsCode = product?.hs_code || '';
    const uom = product?.metadata?.uom || 'Pcs.';
    const qty = item.quantity;
    const lineAmount = item.subtotal ?? 0;
    const rate = qty ? lineAmount / qty : lineAmount;
    const particulars = item.variant_title && item.variant_title !== 'Default variant'
      ? `${item.title} (${item.variant_title})`
      : item.title;

    return { sn: index + 1, hsCode, particulars, qty, uom, rate, amount: lineAmount };
  });

  if (shippingSubtotal > 0) {
    rows.push({
      sn: rows.length + 1,
      hsCode: '',
      particulars: 'Delivery Charge',
      qty: 1,
      uom: '-',
      rate: shippingSubtotal,
      amount: shippingSubtotal,
    });
  }

  const discountTotal = order.discount_total || 0;
  // order.subtotal is the pre-tax sum of line items only; add the pre-tax
  // shipping subtotal (if a Delivery Charge row was appended above) so the
  // Taxable Amount reconciles with the sum of the printed rows.
  const taxableAmount = (order.subtotal || 0) + shippingSubtotal;
  const grossAmount = taxableAmount + discountTotal;
  const vatTotal = order.tax_total || 0;
  const grandTotal = order.total || 0;

  const invoiceHTML = `
    <html>
      <head>
        <title>${title} - ${invoice.invoice_number}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #222;
            line-height: 1.4;
            -webkit-print-color-adjust: exact;
          }
          .invoice-container { max-width: 800px; margin: 0 auto; }
          .title { text-align: center; font-size: 20px; font-weight: bold; letter-spacing: 1px; margin-bottom: 4px; }
          .company-name { text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 2px; }
          .company-vat { text-align: center; font-size: 12px; margin-bottom: 2px; }
          .company-meta { text-align: center; font-size: 11px; color: #555; margin-bottom: 16px; }

          .details-section { display: flex; justify-content: space-between; border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 10px 0; margin-bottom: 16px; }
          .details-block { width: 48%; font-size: 12px; }
          .details-block h4 { margin: 0 0 6px; font-size: 11px; letter-spacing: 1px; color: #555; }
          .details-row { display: flex; }
          .details-row .label { width: 90px; flex-shrink: 0; }

          table.items { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px; }
          table.items th { background: #1e293b; color: #fff; padding: 8px 6px; text-align: left; }
          table.items td { padding: 6px; border-bottom: 1px solid #ddd; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }

          .summary-section { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .words-block { width: 55%; font-size: 12px; }
          .totals-block { width: 40%; font-size: 12px; }
          .totals-row { display: flex; justify-content: space-between; padding: 4px 0; }
          .totals-row.grand { font-weight: bold; font-size: 14px; border-top: 2px solid #333; padding-top: 8px; margin-top: 4px; }

          .bank-section { font-size: 12px; margin-bottom: 16px; }
          .bank-section h4 { font-size: 11px; letter-spacing: 1px; color: #555; margin-bottom: 6px; }
          .terms { font-size: 10px; color: #555; margin-bottom: 40px; }
          .terms ol { margin: 4px 0 0 16px; padding: 0; }

          .signatures { display: flex; justify-content: space-between; margin-top: 40px; font-size: 12px; }
          .signature-line { border-top: 1px solid #333; width: 200px; text-align: center; padding-top: 4px; }

          .invoice-page { page-break-after: always; padding-bottom: 20px; }
          .invoice-page:last-child { page-break-after: auto; }
        </style>
      </head>
      <body>
        <div class="invoice-page">
          <div class="invoice-container">
            <div class="title">${title}</div>
            <div class="company-name">KHIRKHIRYA ENTERPRISES PVT. LTD.</div>
            <div class="company-vat">VAT: 623541122</div>
            <div class="company-meta">
              Head Office: Butwal-08, Rupandehi | Corporate Office: Ranibari-3, Kathmandu, Nepal<br>
              Tel: +977-9813074873 | Email: hello@liqnic.com
            </div>

            <div class="details-section">
              <div class="details-block">
                <h4>CUSTOMER DETAILS</h4>
                <div class="details-row"><span class="label">Name</span> : ${escapeHtml(customerName)}</div>
                <div class="details-row"><span class="label">Address</span> : ${escapeHtml(customerAddress) || 'N/A'}</div>
                <div class="details-row"><span class="label">PAN/VAT</span> : ${escapeHtml(panVat) || 'N/A'}</div>
                <div class="details-row"><span class="label">Tel/Mobile</span> : ${escapeHtml(billing?.phone) || '—'}</div>
              </div>
              <div class="details-block">
                <h4>INVOICE DETAILS</h4>
                <div class="details-row"><span class="label">Invoice No.</span> : ${invoice.invoice_number}</div>
                <div class="details-row"><span class="label">Miti Date</span> : ${formatBsDate(issuedAt)}</div>
                <div class="details-row"><span class="label">Transaction Date</span> : ${issuedAt.toLocaleDateString('en-GB')}</div>
                <div class="details-row"><span class="label">Payment Mode</span> : ${getPaymentMethod()}</div>
              </div>
            </div>

            <table class="items">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>HS CODE</th>
                  <th>PARTICULARS</th>
                  <th class="text-center">QTY</th>
                  <th class="text-center">UOM</th>
                  <th class="text-right">RATE (RS.)</th>
                  <th class="text-right">AMOUNT (RS.)</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(row => `
                  <tr>
                    <td>${row.sn}</td>
                    <td>${escapeHtml(row.hsCode)}</td>
                    <td>${escapeHtml(row.particulars)}</td>
                    <td class="text-center">${row.qty}</td>
                    <td class="text-center">${escapeHtml(row.uom)}</td>
                    <td class="text-right">${formatMoney(row.rate)}</td>
                    <td class="text-right">${formatMoney(row.amount)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="summary-section">
              <div class="words-block">
                <strong>Amount in Words:</strong><br>
                <em>${amountInWords(grandTotal)}</em>
              </div>
              <div class="totals-block">
                <div class="totals-row"><span>Gross Amount:</span><span>${formatMoney(grossAmount)}</span></div>
                <div class="totals-row"><span>Discount:</span><span>${formatMoney(discountTotal)}</span></div>
                <div class="totals-row"><span>Taxable Amount:</span><span>${formatMoney(taxableAmount)}</span></div>
                <div class="totals-row"><span>13% VAT:</span><span>${formatMoney(vatTotal)}</span></div>
                <div class="totals-row grand"><span>Grand Total:</span><span>${formatMoney(grandTotal)}</span></div>
              </div>
            </div>

            <div class="bank-section">
              <h4>BANK DETAILS (FOR PAYMENT)</h4>
              <div>Bank Name : Himalayan Bank Ltd.</div>
              <div>Branch : Dillibazar</div>
              <div>Account No : 12101860130013</div>
              <div>SWIFT/BIC Code : HIMANPKA</div>
            </div>

            <div class="terms">
              <strong>Terms &amp; Conditions:</strong>
              <ol>
                <li>This Invoice shall be treated as correct until &amp; unless claimed otherwise within 10 days of the invoice submission date.</li>
                <li>All cheque/draft to be issued in the name of 'Khirkhirya Enterprises Pvt. Ltd.'</li>
              </ol>
            </div>

            <div class="signatures">
              <div class="signature-line">Received By</div>
              <div class="signature-line">Approved By</div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); }
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
};
