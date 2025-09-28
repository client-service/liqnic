// components/Navbar.tsx
import { listRegions } from "@lib/data/regions"
import { buildMenuItems, MenuItem } from "@lib/menu"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { LuSearch } from "react-icons/lu"

export default async function Navbar() {
  const regions: StoreRegion[] = await listRegions()
  const MENU_ITEMS: MenuItem[] = await buildMenuItems()

  return (
    <nav className="w-full h-[71px] bg-white border-b border-gray-200 top-0 sticky z-40">
      <div className="component-px h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Liqnic" width={100} height={100} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-[25px]">
          {MENU_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <div className="flex items-center gap-[5px] cursor-pointer">
                  <span className="text-black text-[14.4px] font-medium leading-[150%] group-hover:text-[#C5A163] transition-colors font-manrope">
                    {item.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-black group-hover:text-[#C5A163] transition-colors" />
                </div>

                {/* Dropdown menu */}
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href || "#"}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href || "#"}
                className="text-black text-[14.4px] font-medium leading-[150%] hover:text-[#C5A163] transition-colors font-manrope"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="flex space-x-2 items-center">
          <div className="hidden small:flex items-center gap-x-6 h-full">
            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
          </div>
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/shop"
            data-testid="nav-account-link"
          >
            <div className="bg-gray-100 rounded-md p-2">
              <LuSearch />
            </div>
          </LocalizedClientLink>
          {/* Cart */}
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex gap-2"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart (0)
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <SideMenu regions={regions} menuItems={MENU_ITEMS} />
          </div>
        </div>
      </div>
    </nav>
  )
}
