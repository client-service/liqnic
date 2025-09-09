import { useState } from "react"
import { LuX } from "react-icons/lu"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  isSelected?: boolean
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "IQOS Iluma Prime - Obsedian Black",
    price: 3500,
    quantity: 3,
    isSelected: true,
  },
  {
    id: "2",
    name: "IQOS Iluma Prime - Obsedian Black",
    price: 2500,
    quantity: 2,
  },
  {
    id: "3",
    name: "IQOS Iluma Prime - Obsedian Black",
    price: 2500,
    quantity: 2,
  },
  {
    id: "4",
    name: "IQOS Iluma Prime - Obsedian Black",
    price: 2500,
    quantity: 2,
  },
]

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const toggleItemSelection = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shippingCost = 100
  const total = subtotal + shippingCost

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[386px] bg-white z-50 flex flex-col shadow-xl">
        <div className="flex flex-col h-full p-[28px] gap-[17.5px]">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-black text-sm font-medium leading-[150%] font-manrope">
              My cart
            </h2>
            <button onClick={onClose} className="p-1">
              <LuX
                className="w-[16.8px] h-[16.8px] text-black"
                strokeWidth={1.4}
              />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-[17.5px] flex-1 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={item.id} className="flex items-start gap-[13.3px]">
                {/* Product Image */}
                <div className="w-[74.2px] h-[74.2px] bg-[#ECECEC] rounded shrink-0"></div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-1 min-h-[74.2px]">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[#323232] text-[11.2px] font-semibold leading-[14px] font-manrope">
                      {item.name}
                    </h3>
                    <p className="text-[#323232] text-[11.2px] font-normal leading-[14px] font-manrope">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Controls for first item */}
                  {index === 0 && (
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex h-6 px-[10px] items-center justify-center gap-[10px] rounded-[2px] border border-[#DADADA] bg-[#F7F7F7]">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-[#323232] text-[11.2px] font-normal leading-[14px] font-manrope hover:text-[#C5A163] transition-colors"
                        >
                          -
                        </button>
                        <span className="text-[#323232] text-[11.2px] font-normal leading-[14px] font-manrope px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-[#323232] text-[11.2px] font-normal leading-[14px] font-manrope hover:text-[#C5A163] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-[15px]">
                        <button onClick={() => toggleItemSelection(item.id)}>
                          <svg
                            width="16.8"
                            height="16.8"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.8997 4.5L7.19971 12.2L3.69971 8.7"
                              stroke="#00EBAD"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button onClick={() => removeItem(item.id)}>
                          <svg
                            width="16.8"
                            height="16.8"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.69971 7.99999V12.2"
                              stroke="#FF0000"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.4995 7.99999V12.2"
                              stroke="#FF0000"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.9997 4.49999V14.3C13.9997 14.6713 13.8522 15.0274 13.5897 15.2899C13.3271 15.5525 12.971 15.7 12.5997 15.7H5.59971C5.2284 15.7 4.87231 15.5525 4.60976 15.2899C4.34721 15.0274 4.19971 14.6713 4.19971 14.3V4.49999"
                              stroke="#FF0000"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.7998 4.49999H15.3998"
                              stroke="#FF0000"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.2998 4.49999V3.09999C6.2998 2.72869 6.4473 2.37259 6.70986 2.11004C6.97241 1.84749 7.3285 1.69999 7.6998 1.69999H10.4998C10.8711 1.69999 11.2272 1.84749 11.4898 2.11004C11.7523 2.37259 11.8998 2.72869 11.8998 3.09999V4.49999"
                              stroke="#FF0000"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Edit and Delete for other items */}
                  {index !== 0 && (
                    <div className="flex items-start gap-[15.4px] mt-3">
                      <button>
                        <svg
                          width="16.8"
                          height="16.8"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.6001 15.3H15.2001"
                            stroke="#0035BB"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 4.09999L13.8 6.89999"
                            stroke="#0035BB"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.3217 5.36841C15.6918 4.9984 15.8997 4.49653 15.8998 3.9732C15.8998 3.44988 15.692 2.94795 15.322 2.57786C14.952 2.20776 14.4501 1.99981 13.9268 1.99974C13.4035 1.99967 12.9016 2.2075 12.5315 2.57751L3.18926 11.9218C3.02673 12.0839 2.90654 12.2834 2.83926 12.5028L1.91456 15.5492C1.89647 15.6097 1.8951 15.6741 1.9106 15.7353C1.92611 15.7966 1.9579 15.8525 2.00261 15.8971C2.04733 15.9418 2.10329 15.9735 2.16457 15.9889C2.22584 16.0043 2.29015 16.0028 2.35066 15.9846L5.39776 15.0606C5.61698 14.9939 5.81648 14.8745 5.97876 14.7127L15.3217 5.36841Z"
                            stroke="#0035BB"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button onClick={() => removeItem(item.id)}>
                        <svg
                          width="16.8"
                          height="16.8"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.7002 8.29999V12.5"
                            stroke="#FF0000"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5 8.29999V12.5"
                            stroke="#FF0000"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.0002 4.79999V14.6C14.0002 14.9713 13.8527 15.3274 13.5901 15.5899C13.3276 15.8525 12.9715 16 12.6002 16H5.6002C5.22889 16 4.8728 15.8525 4.61025 15.5899C4.34769 15.3274 4.2002 14.9713 4.2002 14.6V4.79999"
                            stroke="#FF0000"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.80029 4.79999H15.4003"
                            stroke="#FF0000"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.30029 4.79998V3.39998C6.30029 3.02868 6.44779 2.67259 6.71034 2.41004C6.97289 2.14748 7.32899 1.99998 7.70029 1.99998H10.5003C10.8716 1.99998 11.2277 2.14748 11.4902 2.41004C11.7528 2.67259 11.9003 3.02868 11.9003 3.39998V4.79998"
                            stroke="#FF0000"
                            strokeWidth="1.05"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-[#323232] text-[11.2px] font-semibold leading-[14px] font-manrope">
                  Rs. {item.price}
                </div>
              </div>
            ))}

            {/* Spacer */}
            <div className="h-[70px]"></div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-[14px] mt-auto">
            {/* Pricing Breakdown */}
            <div className="flex flex-col gap-[14px]">
              <div className="flex justify-between items-center">
                <span className="text-[#323232] text-sm font-normal leading-[14px] font-manrope">
                  Subtotal
                </span>
                <span className="text-[#323232] text-sm font-normal leading-[14px] font-manrope">
                  Rs {subtotal}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#323232] text-sm font-normal leading-[14px] font-manrope">
                  Shipping cost
                </span>
                <span className="text-[#323232] text-sm font-normal leading-[14px] font-manrope">
                  Rs {shippingCost}
                </span>
              </div>

              <div className="w-full h-[0.7px] bg-[#606060]"></div>

              <div className="flex justify-between items-center">
                <span className="text-[#111] text-[16.8px] font-bold leading-[14px] font-manrope">
                  Total
                </span>
                <span className="text-[#111] text-[16.8px] font-bold leading-[14px] font-manrope">
                  Rs {total}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-[14px]">
              <button
                onClick={onClose}
                className="flex-1 py-[10.5px] px-[7px] rounded-[3.5px] border border-[#838383] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-black text-[12.6px] font-medium leading-[150%] font-manrope">
                  Continue shopping
                </span>
              </button>

              <button className="flex-1 py-[10.5px] px-[7px] rounded-[3.5px] bg-[#B3935A] hover:bg-[#C5A163] transition-colors">
                <span className="text-white text-[12.6px] font-medium leading-[150%] font-manrope">
                  Go to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
