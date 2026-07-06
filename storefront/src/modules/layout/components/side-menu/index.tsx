"use client"

import { ArrowRightMini, XMark } from "@medusajs/icons"
import { clx, useToggleState } from "@medusajs/ui"
import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import {
  LuMenu,
  LuUser,
  LuShoppingBag,
  LuLayoutGrid,
  LuInfo,
  LuMail,
  LuTag,
  LuSparkles,
} from "react-icons/lu"
import type { MenuItem } from "@lib/menu"
import { FaHome } from "react-icons/fa"
import Image from "next/image"

const ICON_MAP: Record<string, React.ReactNode> = {
  home: <FaHome size={15} />,
  shop: <LuShoppingBag size={15} />,
  collections: <LuLayoutGrid size={15} />,
  "new arrivals": <LuSparkles size={15} />,
  sale: <LuTag size={15} />,
  about: <LuInfo size={15} />,
  contact: <LuMail size={15} />,
}

function NavIcon({ label }: { label: string }) {
  const icon = ICON_MAP[label.toLowerCase()]
  if (!icon) return null
  return (
    <span className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-lg bg-gray-100 text-gray-500">
      {icon}
    </span>
  )
}

export default function SideMenu({
  regions,
  menuItems,
}: {
  regions: HttpTypes.StoreRegion[] | null
  menuItems: MenuItem[]
}) {
  const toggleState = useToggleState()
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  const close = () => {
    setOpen(false)
    setOpenDropdown(null)
  }

  return (
    <>
      {/* ── Hamburger ── */}
      <button
        onClick={() => setOpen(true)}
        data-testid="nav-menu-button"
        aria-label="Open menu"
        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
      >
        <LuMenu size={20} />
      </button>

      {/* ── Backdrop ── */}
      <div
        className={clx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={clx(
          "fixed top-0 right-0 h-full z-50",
          "w-[85vw] sm:w-[320px]",
          "bg-white flex flex-col",
          "shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <LocalizedClientLink
            href="/"
            onClick={close}
            className="flex items-center gap-2.5"
          >
            {/* ── Logo ─────────────────────────────────────────────────────── */}
            <Image
              src="/logo.png"
              alt="Liqnic"
              width={100}
              height={100}
              className="w-12 md:w-32"
            />
          </LocalizedClientLink>

          <button
            onClick={close}
            data-testid="close-menu-button"
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <XMark />
          </button>
        </div>

        {/* ── Nav — this is the only scrollable zone ── */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-3">
          {/* Account */}
          <p className="px-2 pt-1 pb-1.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Account
          </p>
          <ul className="flex flex-col gap-0.5 mb-3">
            <li>
              <LocalizedClientLink
                href="/account"
                onClick={close}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors min-h-[44px]"
              >
                <span className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-lg bg-gray-100 text-gray-500">
                  <LuUser size={15} />
                </span>
                My Account
              </LocalizedClientLink>
            </li>
          </ul>

          <div className="h-px bg-gray-100 mx-2 mb-3" />

          {/* Dynamic menu items */}
          <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Shop
          </p>
          <ul className="flex flex-col gap-0.5">
            {menuItems.map((item) => (
              <li key={item.label} className="w-full">
                {/* ── Plain link ── */}
                {item.href && !item.dropdown ? (
                  <LocalizedClientLink
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors min-h-[44px]"
                  >
                    <NavIcon label={item.label} />
                    {item.label}
                  </LocalizedClientLink>
                ) : item.dropdown && item.children ? (
                  /* ── Parent: toggle row + inset submenu ── */
                  <div className="flex flex-col gap-0.5">
                    {/* Toggle row */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      aria-expanded={openDropdown === item.label}
                      aria-label={`${
                        openDropdown === item.label ? "Collapse" : "Expand"
                      } ${item.label}`}
                      className={clx(
                        "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl",
                        "text-sm font-medium text-gray-700 min-h-[44px]",
                        "hover:bg-gray-50 transition-colors",
                        openDropdown === item.label &&
                          "bg-gray-50 text-gray-900"
                      )}
                    >
                      <NavIcon label={item.label} />
                      <span className="flex-1 text-left">{item.label}</span>

                      {/* Child count badge */}
                      {item.children.length > 0 && (
                        <span className="text-[10px] font-medium bg-gray-100 text-gray-400 rounded px-1.5 py-0.5 leading-none">
                          {item.children.length}
                        </span>
                      )}

                      <ArrowRightMini
                        className={clx(
                          "text-gray-400 transition-transform duration-200 flex-shrink-0",
                          openDropdown === item.label ? "rotate-90" : ""
                        )}
                      />
                    </button>

                    {/* Inset submenu card */}
                    <div
                      className={clx(
                        "transition-all duration-300 overflow-hidden",
                        openDropdown === item.label
                          ? "max-h-[9999px] opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="mx-2 mb-1 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                        {/* "Show all [label]" header link */}
                        {item.href && (
                          <LocalizedClientLink
                            href={`/categories/${item.href}`}
                            onClick={close}
                            className="flex items-center justify-between px-4 py-3 min-h-[44px] text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-100"
                          >
                            <span>Show all {item.label}</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              className="text-gray-400 flex-shrink-0"
                            >
                              <path
                                d="M2 7h10M8 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </LocalizedClientLink>
                        )}

                        {/*
                          Subcategory list.
                          — When there are more than 8 children, cap the list at
                            ~260 px and let it scroll internally so the drawer
                            doesn't become impossibly long.
                          — For smaller lists, no cap is applied and the items
                            just flow naturally (the outer nav already scrolls).
                        */}
                        <ul
                          className={clx(
                            item.children.length > 8 &&
                              "max-h-[260px] overflow-y-auto overscroll-contain"
                          )}
                        >
                          {item.children.map((child, i) => (
                            <li key={child.label}>
                              <LocalizedClientLink
                                href={child.href!}
                                onClick={close}
                                className={clx(
                                  "flex items-center px-4 py-2.5 min-h-[44px]",
                                  "text-sm text-gray-600",
                                  "hover:bg-gray-100 hover:text-gray-900 transition-colors",
                                  i < item.children.length - 1 &&
                                    "border-b border-gray-100"
                                )}
                              >
                                {child.label}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Footer ── */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between gap-3 flex-shrink-0">
          {regions && (
            <div
              className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
              onMouseEnter={toggleState.open}
              onMouseLeave={toggleState.close}
            >
              <CountrySelect toggleState={toggleState} regions={regions} />
              <ArrowRightMini
                className={clx(
                  "transition-transform duration-150 text-gray-400",
                  toggleState.state ? "-rotate-90" : ""
                )}
              />
            </div>
          )}
          <p className="text-[11px] text-gray-300 ml-auto">
            © {new Date().getFullYear()} Liqnic
          </p>
        </div>
      </div>
    </>
  )
}
