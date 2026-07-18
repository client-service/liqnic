export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-sans">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
          Privacy Policy — Liqnic
        </p>
        <p className="text-xs text-gray-400">
          Operated by Khirkhirya Enterprises Pvt. Ltd. · Governed by the laws of
          Nepal · Applies to all purchases made on this site
        </p>
      </div>

      <p className="text-xs leading-relaxed text-gray-600 mb-6">
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from
        Liqnic.
      </p>

      {[
        {
          title: "1. Personal Information We Collect",
          content: (
            <>
              <p>
                When you make or attempt to make a purchase, we collect the
                following:
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  <strong>Identity Data:</strong> Name, date of birth, and
                  copies of government-issued IDs (for age verification only).
                </li>
                <li>
                  <strong>Contact Data:</strong> Billing address, delivery
                  address, email address, and phone number.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, and
                  cookies to improve your shopping experience.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "2. How We Use Your Information",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                Fulfill orders placed through the site, including processing
                payment and arranging shipping.
              </li>
              <li>
                Verify your age to comply with Nepalese laws regarding the sale
                of restricted goods.
              </li>
              <li>
                Communicate with you regarding order status or promotional
                offers (if opted-in).
              </li>
            </ul>
          ),
        },
        {
          title: "3. Data Sharing & Security",
          content: (
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>Third Parties:</strong> We share your information only
                with parties necessary to fulfil your order — delivery partners
                and payment gateways such as eSewa/Khalti.
              </li>
              <li>
                <strong>Legal Compliance:</strong> We may share your information
                to comply with applicable Nepalese laws or in response to a
                lawful request.
              </li>
              <li>
                <strong>Security:</strong> We implement industry-standard
                encryption to protect your data. No method of internet
                transmission is 100% secure.
              </li>
            </ul>
          ),
        },
        {
          title: "4. Data Retention",
          content: (
            <p>
              We retain your order information for our records unless you
              request deletion, subject to our legal obligations to keep records
              of restricted sales.
            </p>
          ),
        },
        {
          title: "5. Consent & Electronic Acceptance",
          content: (
            <p>
              By clicking <strong>"Checkout"</strong> or{" "}
              <strong>"I Agree,"</strong> or by completing a purchase, you
              confirm that you have read, understood, and agreed to this Privacy
              Policy and our Terms and Conditions in their entirety.
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
          For privacy-related queries, contact us before placing your order. ·
          Khirkhirya Enterprises Pvt. Ltd. reserves all rights under applicable
          law.
        </p>
      </div>
    </div>
  )
}
