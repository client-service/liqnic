"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import Input from "@modules/common/components/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const cartMetadata = cart?.metadata as
    | { pan_vat?: string; business_name?: string }
    | undefined
  const [isBusiness, setIsBusiness] = useState(!!cartMetadata?.pan_vat)

  const handleEdit = () => router.push(pathname + "?step=address")

  const [message, formAction, isPending] = useActionState(setAddresses, null)

  // Intercept any step that isn't "address" or "review" and normalise to
  // "review" so the address section collapses and the payment selector
  // (which lives on the same page) is visible below it.
  // We do NOT redirect "delivery" → "review" here anymore because that
  // was causing the page to jump past the payment selector entirely.
  useEffect(() => {
    const step = searchParams.get("step")
    if (step === "delivery" || step === "payment") {
      router.replace(pathname + "?step=review")
    }
  }, [searchParams, pathname, router])

  return (
    <div className="bg-white">
      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
          Shipping Address
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="text-[#C5A163]" />
          )}
        </h2>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            data-testid="edit-address-button"
            className="text-sm font-medium text-[#C5A163] hover:text-[#B3935A] transition-colors min-h-[44px] px-1"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        /* ── Open: address form ────────────────────────────────────────── */
        <form action={formAction}>
          <div className="pb-8 flex flex-col gap-6">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <input
                  type="checkbox"
                  name="is_business"
                  checked={isBusiness}
                  onChange={(e) => setIsBusiness(e.target.checked)}
                  className="h-4 w-4"
                  data-testid="is-business-checkbox"
                />
                Ordering as a registered business? (VAT tax invoice)
              </label>
              {isBusiness && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Business / Company Name"
                    name="business_name"
                    defaultValue={cartMetadata?.business_name || ""}
                    required
                    data-testid="business-name-input"
                  />
                  <Input
                    label="PAN/VAT No."
                    name="pan_vat"
                    defaultValue={cartMetadata?.pan_vat || ""}
                    required
                    inputMode="numeric"
                    pattern="[0-9]{9}"
                    maxLength={9}
                    title="Nepal PAN/VAT numbers are 9 digits"
                    data-testid="pan-vat-input"
                  />
                </div>
              )}
            </div>

            {!sameAsBilling && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-5">
                  Billing address
                </h2>
                <BillingAddress cart={cart} />
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="
                w-full h-12
                rounded-xl bg-black hover:bg-gray-900
                text-white text-sm font-semibold
                active:scale-[0.98] transition-all
                disabled:opacity-50
              "
              data-testid="submit-address-button"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Processing...
                </span>
              ) : (
                "Continue"
              )}
            </button>

            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        /* ── Collapsed: address summary ────────────────────────────────── */
        <div>
          {cart && cart.shipping_address ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Shipping address */}
              <div
                className="flex flex-col gap-0.5"
                data-testid="shipping-address-summary"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Shipping Address
                </p>
                <p className="text-sm text-gray-700">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {cart.shipping_address.address_1}
                  {cart.shipping_address.address_2
                    ? `, ${cart.shipping_address.address_2}`
                    : ""}
                </p>
                <p className="text-sm text-gray-500">
                  {cart.shipping_address.postal_code},{" "}
                  {cart.shipping_address.city}
                </p>
                <p className="text-sm text-gray-500">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </p>
              </div>

              {/* Contact */}
              <div
                className="flex flex-col gap-0.5"
                data-testid="shipping-contact-summary"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Contact
                </p>
                <p className="text-sm text-gray-700">
                  {cart.shipping_address.phone}
                </p>
                <p className="text-sm text-gray-500">{cart.email}</p>
              </div>

              {/* Billing address */}
              <div
                className="flex flex-col gap-0.5"
                data-testid="billing-address-summary"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Billing Address
                </p>
                {sameAsBilling ? (
                  <p className="text-sm text-gray-500">Same as shipping.</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-700">
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {cart.billing_address?.address_1}
                      {cart.billing_address?.address_2
                        ? `, ${cart.billing_address?.address_2}`
                        : ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      {cart.billing_address?.postal_code},{" "}
                      {cart.billing_address?.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-6">
              <Spinner />
            </div>
          )}
        </div>
      )}

      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses

// "use client"

// import { setAddresses } from "@lib/data/cart"
// import compareAddresses from "@lib/util/compare-addresses"
// import { CheckCircleSolid } from "@medusajs/icons"
// import { HttpTypes } from "@medusajs/types"
// import { useToggleState } from "@medusajs/ui"
// import Divider from "@modules/common/components/divider"
// import Spinner from "@modules/common/icons/spinner"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { useActionState } from "react"
// import BillingAddress from "../billing_address"
// import ErrorMessage from "../error-message"
// import ShippingAddress from "../shipping-address"
// import { SubmitButton } from "../submit-button"

// const Addresses = ({
//   cart,
//   customer,
// }: {
//   cart: HttpTypes.StoreCart | null
//   customer: HttpTypes.StoreCustomer | null
// }) => {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const pathname = usePathname()

//   const isOpen = searchParams.get("step") === "address"

//   const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
//     cart?.shipping_address && cart?.billing_address
//       ? compareAddresses(cart?.shipping_address, cart?.billing_address)
//       : true
//   )

//   const handleEdit = () => router.push(pathname + "?step=address")
//   const [message, formAction, isPending] = useActionState(setAddresses, null)

//   return (
//     <div className="bg-white">
//       {/* ── Section header ───────────────────────────────────────────────── */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
//           Shipping Address
//           {!isOpen && <CheckCircleSolid className="text-[#C5A163]" />}
//         </h2>

//         {!isOpen && cart?.shipping_address && (
//           <button
//             onClick={handleEdit}
//             data-testid="edit-address-button"
//             className="text-sm font-medium text-[#C5A163] hover:text-[#B3935A] transition-colors min-h-[44px] px-1"
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       {isOpen ? (
//         /* ── Open: address form ────────────────────────────────────────── */
//         <form action={formAction}>
//           <div className="pb-8 flex flex-col gap-6">
//             <ShippingAddress
//               customer={customer}
//               checked={sameAsBilling}
//               onChange={toggleSameAsBilling}
//               cart={cart}
//             />

//             {!sameAsBilling && (
//               <div>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-5">
//                   Billing address
//                 </h2>
//                 <BillingAddress cart={cart} />
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isPending}
//               className="
//     w-full h-12
//     rounded-xl bg-black hover:bg-gray-900
//     text-white text-sm font-semibold
//     active:scale-[0.98] transition-all
//     disabled:opacity-50
//   "
//               data-testid="submit-address-button"
//             >
//               {isPending ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Spinner />
//                   Processing...
//                 </span>
//               ) : (
//                 "Continue to delivery"
//               )}
//             </button>

//             <ErrorMessage error={message} data-testid="address-error-message" />
//           </div>
//         </form>
//       ) : (
//         /* ── Collapsed: address summary ────────────────────────────────── */
//         <div>
//           {cart && cart.shipping_address ? (
//             /*
//               Mobile: stacked vertically (flex-col)
//               Tablet+: side by side (sm:grid-cols-3)
//               Fixes the w-1/3 issue — on a 375px phone three w-1/3 columns
//               gave only ~108px each, causing address text to wrap badly
//             */
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
//               {/* Shipping address */}
//               <div
//                 className="flex flex-col gap-0.5"
//                 data-testid="shipping-address-summary"
//               >
//                 <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//                   Shipping Address
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   {cart.shipping_address.first_name}{" "}
//                   {cart.shipping_address.last_name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {cart.shipping_address.address_1}
//                   {cart.shipping_address.address_2
//                     ? `, ${cart.shipping_address.address_2}`
//                     : ""}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {cart.shipping_address.postal_code},{" "}
//                   {cart.shipping_address.city}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {cart.shipping_address.country_code?.toUpperCase()}
//                 </p>
//               </div>

//               {/* Contact */}
//               <div
//                 className="flex flex-col gap-0.5"
//                 data-testid="shipping-contact-summary"
//               >
//                 <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//                   Contact
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   {cart.shipping_address.phone}
//                 </p>
//                 <p className="text-sm text-gray-500">{cart.email}</p>
//               </div>

//               {/* Billing address */}
//               <div
//                 className="flex flex-col gap-0.5"
//                 data-testid="billing-address-summary"
//               >
//                 <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//                   Billing Address
//                 </p>

//                 {sameAsBilling ? (
//                   <p className="text-sm text-gray-500">Same as shipping.</p>
//                 ) : (
//                   <>
//                     <p className="text-sm text-gray-700">
//                       {cart.billing_address?.first_name}{" "}
//                       {cart.billing_address?.last_name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {cart.billing_address?.address_1}
//                       {cart.billing_address?.address_2
//                         ? `, ${cart.billing_address?.address_2}`
//                         : ""}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {cart.billing_address?.postal_code},{" "}
//                       {cart.billing_address?.city}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {cart.billing_address?.country_code?.toUpperCase()}
//                     </p>
//                   </>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center py-6">
//               <Spinner />
//             </div>
//           )}
//         </div>
//       )}

//       <Divider className="mt-8" />
//     </div>
//   )
// }

// export default Addresses
