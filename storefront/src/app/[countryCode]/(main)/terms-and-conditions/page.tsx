import React from "react";

// Terms & Conditions Page Component
export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
        Terms & Conditions
      </h1>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Agreement to Terms</h2>
          <p>
            By using this website (the “Site”), operated by <strong>[Your Company Name]</strong>, you agree to be bound by these Terms & Conditions. If you do not agree, you may not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Legal Age Requirement</h2>
          <p>
            You must be of legal age in your jurisdiction to purchase alcohol, cigarettes, or tobacco products. By placing an order, you confirm you meet the required legal age, and we may request proof of age before fulfilling your order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Product Information & Pricing</h2>
          <p>
            While we aim for accuracy, product descriptions, images, and prices may contain errors. Prices are subject to change without notice. All orders depend on stock availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Orders & Payments</h2>
          <p>
            Orders are confirmed once payment has been processed. It is your responsibility to provide accurate shipping and billing details. We accept payments through [list payment options].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Shipping & Delivery</h2>
          <p>
            Delivery is only available where permitted by law. Risk of loss passes to you once the order has been handed to the carrier. Delivery timelines are estimates and may vary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Returns & Refunds</h2>
          <p>
            Due to legal restrictions, returns are limited. Damaged or incorrect orders must be reported within [X days]. Refunds will be processed if eligible under our policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages related to your use of the Site or products purchased. Our liability will not exceed the amount paid for your order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of <strong>[Your Country/State]</strong>. Any disputes will be resolved exclusively in the courts of <strong>[Your Jurisdiction]</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

