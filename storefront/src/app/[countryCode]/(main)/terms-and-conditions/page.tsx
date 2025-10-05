import React from "react"

// Terms & Conditions Page Component
export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
        Terms & Conditions
      </h1>

      <div className="space-y-6 leading-relaxed text-justify">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Agreement to Terms</h2>
          <p>
            By using this website (the “Site”), operated by{" "}
            <strong>Liqnic</strong>, you agree to be bound by these Terms &
            Conditions. If you do not agree, you may not use the Site. We
            reserve the right to update or modify these terms at any time
            without prior notice. Please review these terms periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Legal Age Requirement
          </h2>
          <p>
            You must be of legal age in your jurisdiction to purchase alcohol,
            cigarettes, or tobacco products. By placing an order, you confirm
            you meet the required legal age, and we may request proof of age
            (such as a government-issued ID) before fulfilling your order. If
            you are unable to provide satisfactory proof of age, your order will
            be canceled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Product Information & Pricing
          </h2>
          <p>
            While we aim for accuracy, product descriptions, images, and prices
            may contain errors. We reserve the right to correct any pricing
            errors or inaccuracies at our discretion. Prices are subject to
            change without notice, and all orders depend on stock availability
            at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Orders & Payments</h2>
          <p>
            Orders are confirmed once payment has been processed. It is your
            responsibility to provide accurate shipping and billing details. We
            accept payments through the following methods:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Cash on Delivery (COD)</strong> – Pay in cash at the time
              of delivery.
            </li>
            <li>
              <strong>Banking Services</strong> – Payments via bank transfer or
              other banking methods.
            </li>
            <li>
              <strong>Credit/Debit Cards</strong> – Payments via major credit or
              debit cards, including <strong>Visa</strong>,{" "}
              <strong>MasterCard</strong>, and <strong>American Express</strong>
              .
            </li>
            <li>
              <strong>Digital Wallets</strong> – Pay via digital wallets like{" "}
              <strong>PayPal</strong>, <strong>Google Pay</strong>, or{" "}
              <strong>Apple Pay</strong>.
            </li>
            <li>
              <strong>Mobile Payments</strong> – Payments through mobile apps
              like <strong>Khalti</strong> or <strong>eSewa</strong>.
            </li>
          </ul>
          <p className="mt-2">
            If your payment method is declined, we may cancel your order or
            request alternative payment details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Shipping & Delivery
          </h2>
          <p>
            Delivery is only available where permitted by law. Risk of loss or
            damage passes to you once the order has been handed to the carrier.
            Delivery timelines are estimates and may vary depending on carrier
            availability, weather, or other factors beyond our control. We will
            not be responsible for delays caused by such factors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Returns & Refunds</h2>
          <p>
            Due to legal restrictions, returns are limited. If you receive a
            damaged or incorrect order, you must report the issue within 3 days
            of delivery. We will process refunds or replacements in accordance
            with our Return & Refund Policy, subject to eligibility under our
            guidelines. All alcohol sales are final and cannot be returned or
            exchanged once the order has been completed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages
            related to your use of the Site or products purchased. Our total
            liability, under any circumstances, will not exceed the amount paid
            for your order. This includes any liability for errors,
            interruptions, or delays in service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These Terms & Conditions are governed by the laws of{" "}
            <strong>Nepal</strong>. Any disputes arising from or related to
            these Terms will be resolved exclusively in the courts of{" "}
            <strong>Nepal</strong>. By using this Site, you consent to the
            jurisdiction and venue of such courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            9. Changes to Terms & Conditions
          </h2>
          <p>
            We reserve the right to update or modify these Terms & Conditions at
            any time. When we make material changes to the Terms, we will post
            the updated version on this page with an updated effective date.
            Your continued use of the Site after such changes constitutes your
            acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            10. Contact Information
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms &
            Conditions, please contact us at <strong>support@liqnic.com</strong>{" "}
            or via our contact form.
          </p>
        </section>
      </div>
    </div>
  )
}
