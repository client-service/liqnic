// Privacy Policy Page Component
export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">
        Privacy Policy
      </h1>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We may collect personal details such as your name, email, phone, billing/shipping address, payment details, and age verification documents. We also collect non-personal data like browser type, IP address, and site usage information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Data</h2>
          <p>
            Your data is used to process orders, verify legal age, improve user experience, communicate with you, and send promotional offers if you opt in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Sharing of Information</h2>
          <p>
            We do not sell your data. Information may be shared with trusted third parties such as delivery services, payment processors, and as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Cookies & Tracking</h2>
          <p>
            We use cookies to improve site functionality, analyze usage, and personalize your experience. You can manage cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We implement reasonable safeguards like encryption and secure servers. However, no system can guarantee complete security of your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, update, or delete your data, as well as opt out of marketing communications at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Minors</h2>
          <p>
            Our services are not intended for individuals below the legal age for alcohol/tobacco purchases. If we discover data from underage users, we will promptly delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised effective date.
          </p>
        </section>
      </div>
    </div>
  );
}