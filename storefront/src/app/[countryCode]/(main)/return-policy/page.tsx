export default function ReturnPolicy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-sans">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-1">
          Return Policy — Liqnic
        </p>
        <p className="text-xs text-gray-400">
          Operated by Khirkhirya Enterprises Pvt. Ltd. · Applicable to all
          orders placed on this platform
        </p>
      </div>

      <p className="text-xs leading-relaxed text-gray-600 mb-6">
        The following terms govern the conditions under which returns,
        replacements, and order cancellations may be initiated for products
        purchased through Liqnic, a platform operated by Khirkhirya Enterprises
        Pvt. Ltd.
      </p>

      {[
        {
          title: "1. Return",
          content: (
            <>
              <p>
                A <strong>return</strong> refers to sending back a product that
                was purchased on Liqnic. A return request may be considered
                valid in the following situations:
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  The item delivered was found to be defective or
                  non-functional.
                </li>
                <li>
                  The product sustained damage during transit or delivery.
                </li>
                <li>
                  An incorrect product was sent in place of the ordered item.
                </li>
                <li>
                  One or more items were missing from the delivered order.
                </li>
              </ul>
              <p className="mt-2">
                <strong>Important information:</strong>
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. reserves the right to approve
                  or decline return requests at its own discretion, regardless
                  of the above conditions.
                </li>
                <li>
                  If a return request is not approved, the Buyer may escalate
                  the matter through the Buyer Protection Program.
                </li>
                <li>
                  Buyers are advised to verify product details thoroughly before
                  completing a purchase. Returns will not be entertained for
                  items ordered by mistake.
                </li>
                <li>
                  All return requests must be submitted within{" "}
                  <strong>48 hours</strong> of payment confirmation.
                </li>
                <li>
                  Special or promotional sales may carry their own return terms
                  as communicated by Khirkhirya Enterprises Pvt. Ltd. at the
                  time of purchase.
                </li>
              </ul>
              <p className="mt-2">
                When a return is approved, the Buyer must send back the product
                in its original, unused condition. Upon receipt, the refund
                amount will be credited to the Buyer's account.
              </p>
            </>
          ),
        },
        {
          title: "2. Replacement",
          content: (
            <>
              <p>
                A <strong>replacement</strong> involves substituting a delivered
                item with a new one. Buyers may raise a replacement request in
                cases where the product arrived damaged, was defective, did not
                match the ordered item, or if items were missing from the
                shipment.
              </p>
              <p className="mt-2">
                <strong>Important information:</strong>
              </p>
              <ul className="list-disc ml-4 mt-1 space-y-1">
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. may approve or reject
                  replacement requests at its sole discretion, independent of
                  this policy.
                </li>
                <li>
                  Buyers whose replacement requests are declined may escalate
                  via the Buyer Protection Program.
                </li>
                <li>
                  Replacement requests must be submitted within{" "}
                  <strong>48 hours</strong> of receiving the delivery.
                </li>
              </ul>
              <p className="mt-2">
                Upon raising a replacement request, the following steps will be
                followed:
              </p>
              <ol className="list-decimal ml-4 mt-1 space-y-1">
                <li>
                  The Buyer will be asked to specify the reason for the request
                  (e.g. transit damage, defective product, missing item,
                  incorrect item, pricing error).
                </li>
                <li>
                  Khirkhirya Enterprises Pvt. Ltd. will evaluate the request and
                  communicate its decision.
                </li>
                <li>
                  If approved, the Buyer must return the original item before
                  the replacement is shipped out.
                </li>
                <li>
                  If declined, the Buyer may escalate by reaching out to{" "}
                  <strong>info@liqnic.com</strong>.
                </li>
                <li>
                  The original purchase invoice must be presented at the time of
                  returning the item or processing the replacement.
                </li>
              </ol>
              <p className="mt-2">
                In the event that the requested replacement item is out of
                stock, Khirkhirya Enterprises Pvt. Ltd. may issue a refund as an
                alternative, which the Buyer shall be required to accept.
              </p>
            </>
          ),
        },
        {
          title: "3. Cancellation",
          content: (
            <p>
              To cancel a placed order, please reach out to our customer support
              team no later than <strong>1 hour before</strong> the scheduled
              delivery time. Cancellation requests submitted after this window
              may not be accommodated.
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
          For any return or replacement concerns, please reach out within the
          applicable timeframe. · Khirkhirya Enterprises Pvt. Ltd. retains all
          rights as permitted under applicable law.
        </p>
      </div>
    </div>
  )
}
