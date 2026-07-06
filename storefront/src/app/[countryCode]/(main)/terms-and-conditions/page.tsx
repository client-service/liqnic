import React from "react"

export default function TermsAndConditions() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-gray-800 font-sans">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
          Terms & Conditions — Liqnic
        </p>
        <p className="text-xs text-gray-400">
          Operated by Khirkhirya Enterprises Pvt. Ltd. · Effective immediately
          upon posting · Governed by the laws of Nepal
        </p>
      </div>

      <p className="text-xs leading-relaxed text-gray-600 mb-6">
        By accessing this website and purchasing products, you agree to be bound
        by the following terms. Please read them carefully before placing an
        order.
      </p>

      {[
        {
          title: "1. Age Verification & Legal Compliance",
          content: (
            <>
              <p>
                You represent that you are at least 18 years of age, the legal
                age for purchasing e-cigarettes and alcohol/whiskey as defined
                by the Government of Nepal.
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  <strong>Verification:</strong> A valid government-issued ID
                  (Citizenship, Passport, or License) may be required upon
                  delivery. Failure to present ID will result in order
                  cancellation without a refund of delivery fees.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "2. Products and Pricing",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Inventory:</strong> Product colors and images are
                displayed as accurately as possible; exact monitor reproduction
                cannot be guaranteed.
              </li>
              <li>
                <strong>Pricing:</strong> All prices are in Nepalese Rupees
                (NPR) and inclusive of applicable taxes unless stated otherwise.
                Prices may change without prior notice.
              </li>
              <li>
                <strong>Prohibitions:</strong> Products are for personal use
                only. Reselling without a valid wholesale license is strictly
                prohibited.
              </li>
            </ul>
          ),
        },
        {
          title: "3. No Refund and No Exchange Policy",
          content: (
            <>
              <p>
                Due to the consumable and sensitive nature of our products, we
                maintain a{" "}
                <strong>strict no-refund and no-exchange policy</strong>. All
                purchases are final once dispatched or the seal is broken.
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  <strong>Exception:</strong> Items physically damaged on
                  arrival or incorrectly shipped. You must notify us within{" "}
                  <strong>2 hours</strong> of delivery with photographic
                  evidence.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Shipping and Delivery",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Coverage:</strong> We deliver across Nepal.
              </li>
              <li>
                <strong>Delays:</strong> We are not liable for delays caused by
                roadblocks, bandhs, or extreme weather conditions.
              </li>
              <li>
                <strong>Delivery Fees:</strong> Shipping costs are calculated at
                checkout and are non-refundable.
              </li>
            </ul>
          ),
        },
        {
          title: "5. Order Cancellations",
          content: (
            <p>
              Orders may be cancelled within <strong>12 hours</strong> of
              placement, provided they have not been processed or dispatched.
            </p>
          ),
        },
        {
          title: "6. Delivery Conditions",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Proof of Identity:</strong> Goods will only be handed to
                the person who placed the order and can verify their age.
              </li>
              <li>
                <strong>Refusal of Service:</strong> We reserve the right to
                refuse delivery if the recipient appears intoxicated or underage
                at the point of delivery.
              </li>
            </ul>
          ),
        },
        {
          title: "7. Billing & Account Information",
          content: (
            <p>
              You agree to provide accurate and complete account information.
              Khirkhirya Enterprises Pvt. Ltd. is not responsible for delivery
              failures due to incorrect addresses or contact numbers.
            </p>
          ),
        },
        {
          title: "8. Health Warning & Liability",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Health Risk:</strong> Consumption of alcohol and
                tobacco/nicotine products is injurious to health. By purchasing,
                you acknowledge the associated risks.
              </li>
              <li>
                <strong>Limitation of Liability:</strong> Khirkhirya Enterprises
                Pvt. Ltd. shall not be held liable for any health complications,
                accidents, or misuse resulting from the use of products sold on
                this site.
              </li>
            </ul>
          ),
        },
        {
          title: "9. Prohibited Uses",
          content: (
            <p>
              You may not use this site for any unlawful purpose, to solicit
              unlawful acts, or to violate any applicable Nepalese or
              international regulations.
            </p>
          ),
        },
        {
          title: "10. Compliance with Nepalese Law",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Taxation:</strong> All prices include applicable VAT and
                Excise Duty as mandated by the Government of Nepal.
              </li>
              <li>
                <strong>Restricted Areas:</strong> We do not ship to areas where
                the sale of alcohol or nicotine products is restricted by local
                municipality bylaws.
              </li>
            </ul>
          ),
        },
        {
          title: "11. Changes to Terms",
          content: (
            <p>
              We reserve the right to update these Terms at any time. Amendments
              take effect immediately upon posting. Continued use of the website
              constitutes acceptance of any changes.
            </p>
          ),
        },
      ].map(({ title, content }) => (
        <div key={title} className="mb-5">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-600 border-b border-gray-200 pb-1 mb-2">
            {title}
          </p>
          <div className="text-xs leading-relaxed text-gray-600 space-y-1">
            {content}
          </div>
        </div>
      ))}

      <div className="border-t border-gray-200 mt-6 pt-4">
        <p className="text-xs text-gray-400">
          For queries, contact us before placing your order. · Khirkhirya
          Enterprises Pvt. Ltd. reserves all rights under applicable law.
        </p>
      </div>
    </div>
  )
}
