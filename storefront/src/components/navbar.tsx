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
import { LuUser } from "react-icons/lu"
import SearchTrigger from "./SearchTrigger"

const MEGA_MENU_THRESHOLD = 8

function columnCount(itemCount: number): number {
  if (itemCount <= 9) return 2
  if (itemCount <= 16) return 3
  return 4
}

function DropdownMenu({ item }: { item: MenuItem }) {
  const children = item.children ?? []
  const isMega = children.length > MEGA_MENU_THRESHOLD
  const cols = columnCount(children.length)

  if (!isMega) {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl shadow-black/[0.08] opacity-0 invisible translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
        <div className="p-2">
          {children.map((child) => (
            <Link
              key={child.label}
              href={child.href || "#"}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C5A163] hover:shadow-sm hover:rounded-lg transition-all font-manrope"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const gridColsClass =
    cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4"

  return (
    <div
      className={`
        absolute top-full left-1/2 -translate-x-1/2 mt-3
        bg-white border border-gray-100 rounded-2xl
        shadow-2xl shadow-black/[0.10]
        opacity-0 invisible translate-y-1
        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 ease-out z-50
      `}
      style={{ width: cols === 2 ? 480 : cols === 3 ? 660 : 820 }}
    >
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <Link
          href={`/categories/${item.href}` || "#"}
          className="text-xs font-semibold uppercase tracking-widest text-[#C5A163] hover:text-[#b08b4f] transition-colors font-manrope"
        >
          Browse all {item.label} →
        </Link>
      </div>
      <div className={`grid ${gridColsClass} gap-3 p-5`}>
        {children.map((child) => (
          <Link
            key={child.label}
            href={child.href || "#"}
            className="
              px-4 py-3
              text-sm text-gray-700 font-manrope
              bg-white border border-transparent
              rounded-xl
              hover:border-gray-200 hover:shadow-md hover:shadow-black/[0.06] hover:text-[#C5A163]
              transition-all duration-150
            "
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function Navbar() {
  const regions: StoreRegion[] = await listRegions()
  const MENU_ITEMS: MenuItem[] = await buildMenuItems()
  const countryCode = regions[0]?.countries?.[0]?.iso_2 ?? "np"

  return (
    <nav className="w-full py-2 bg-white border-b border-gray-200 top-0 sticky z-30">
      <div className="component-px h-full flex items-center justify-between gap-4">
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Liqnic"
            width={100}
            height={100}
            className="w-12 md:w-32"
          />
        </Link>

        {/* ── Desktop nav links ─────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-[25px] flex-1 justify-center">
          {MENU_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative group">
                <Link
                  href={`/categories/${item.href}` || "#"}
                  className="flex items-center gap-[5px]"
                >
                  <span className="text-black text-[14.4px] font-medium leading-[150%] group-hover:text-[#C5A163] transition-colors font-manrope">
                    {item.label}
                  </span>
                  <ChevronDown className="w-4 h-4 text-black group-hover:text-[#C5A163] group-hover:rotate-180 transition-all duration-200" />
                </Link>
                <DropdownMenu item={item} />
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

        {/* ── Right actions ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <SearchTrigger countryCode={countryCode} />

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-5 bg-gray-200" />

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

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-5 bg-gray-200" />

          {/* Account — desktop only */}
          <LocalizedClientLink
            className="hidden lg:flex items-center gap-1.5 text-gray-700 hover:text-[#C5A163] transition-colors"
            href="/account"
            data-testid="nav-account-link"
          >
            <LuUser className="w-5 h-5" />
            <span className="text-[14.4px] font-medium font-manrope">
              My Profile
            </span>
          </LocalizedClientLink>

          {/* Mobile hamburger — separated with a divider */}
          <div className="lg:hidden w-px h-5 bg-gray-200" />
          <div className="lg:hidden">
            <SideMenu regions={regions} menuItems={MENU_ITEMS} />
          </div>
        </div>
      </div>
    </nav>
  )
}
