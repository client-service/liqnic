"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { CiShoppingCart } from "react-icons/ci"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const total = cartState?.total ?? 0
  const subtotal = cartState?.subtotal ?? 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <div className="flex items-center gap-[11px]">
              <div className="relative">
                <div className="w-[34.22px] h-[34.22px] rounded-[7.528px] bg-[#F0F0F0] flex items-center justify-center">
                  <CiShoppingCart className="w-4 h-4 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-[12px] h-[12px] bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">
                    {totalItems}
                  </span>
                </div>
              </div>
              <span className="text-black text-[14.4px] font-medium leading-[150%] font-manrope hidden md:flex">
                Rs. {total}
              </span>
            </div>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 rounded-lg bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex ">
              <h3 className="text-base"> My Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 lg:gap-y-12 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-2 gap-x-16"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <div className="flex gap-2 lg:gap-8">
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="w-24"
                          >
                            <div className="w-[74.2px] h-[74.2px] lg:w-28 lg:h-28 rounded shrink-0 overflow-hidden">
                              <img
                                src={item.thumbnail}
                                // images={item.variant?.product?.images}
                                // size="square"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </LocalizedClientLink>
                          <div className="flex flex-col overflow-ellipsis whitespace-nowrap space-y-2 w-full">
                            <h3 className="text-base-regular overflow-hidden text-ellipsis">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h3>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                              className="text-sm"
                            >
                              Qty: {item.quantity}
                            </span>
                            <DeleteButton
                              id={item.id}
                              className="mt-1"
                              data-testid="cart-item-remove-button"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end items-start">
                          <div className="flex flex-col items-end">
                            <div className="flex justify-end">
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <hr className="mt-8 lg:mt-16 h-2" />
                <div className="p-4 flex flex-col gap-y-4 text-small-regular ">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(incl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: total,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="">
                    <LocalizedClientLink
                      href="/cart"
                      passHref
                      className="w-full"
                    >
                      <button className="w-full cursor-pointer py-[10.5px] px-[7px] rounded-[3.5px] bg-[#B3935A] hover:bg-[#C5A163] transition-colors">
                        <span className="text-white text-[12.6px] font-medium leading-[150%] font-manrope">
                          Go to Cart
                        </span>
                      </button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/shop">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
