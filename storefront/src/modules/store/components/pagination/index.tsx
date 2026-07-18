"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  if (totalPages <= 1) return null

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, i) => start + i)

  const PageButton = ({ p, isCurrent }: { p: number; isCurrent: boolean }) => (
    <button
      onClick={() => handlePageChange(p)}
      disabled={isCurrent || isPending}
      aria-label={`Page ${p}`}
      aria-current={isCurrent ? "page" : undefined}
      className={`
        w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0
        flex items-center justify-center
        rounded-lg text-xs sm:text-sm font-medium
        transition-all duration-150
        ${
          isCurrent
            ? "bg-[#C5A163] text-white shadow-sm cursor-default"
            : isPending
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 active:scale-95"
        }
      `}
    >
      {p}
    </button>
  )

  const Ellipsis = ({ id }: { id: string }) => (
    <span
      key={id}
      className="w-5 sm:w-6 flex items-center justify-center text-gray-400 text-sm select-none flex-shrink-0"
    >
      ···
    </span>
  )

  const renderPageButtons = (compact: boolean) => {
    const delta = compact ? 0 : 1
    const btns: React.ReactNode[] = []
    const threshold = compact ? 5 : 7

    if (totalPages <= threshold) {
      arrayRange(1, totalPages).forEach((p) =>
        btns.push(<PageButton key={p} p={p} isCurrent={p === page} />)
      )
    } else if (page <= 2 + delta) {
      arrayRange(1, 3 + delta).forEach((p) =>
        btns.push(<PageButton key={p} p={p} isCurrent={p === page} />)
      )
      btns.push(<Ellipsis key="e1" id="e1" />)
      btns.push(
        <PageButton
          key={totalPages}
          p={totalPages}
          isCurrent={totalPages === page}
        />
      )
    } else if (page >= totalPages - 1 - delta) {
      btns.push(<PageButton key={1} p={1} isCurrent={page === 1} />)
      btns.push(<Ellipsis key="e2" id="e2" />)
      arrayRange(totalPages - 2 - delta, totalPages).forEach((p) =>
        btns.push(<PageButton key={p} p={p} isCurrent={p === page} />)
      )
    } else {
      btns.push(<PageButton key={1} p={1} isCurrent={page === 1} />)
      btns.push(<Ellipsis key="e3" id="e3" />)
      arrayRange(page - delta, page + delta).forEach((p) =>
        btns.push(<PageButton key={p} p={p} isCurrent={p === page} />)
      )
      btns.push(<Ellipsis key="e4" id="e4" />)
      btns.push(
        <PageButton
          key={totalPages}
          p={totalPages}
          isCurrent={totalPages === page}
        />
      )
    }
    return btns
  }

  const NavButton = ({
    onClick,
    disabled,
    label,
    children,
  }: {
    onClick: () => void
    disabled: boolean
    label: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-lg border text-sm transition-all duration-150
        ${
          disabled
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
        }`}
    >
      {children}
    </button>
  )

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-2 w-full mt-10 sm:mt-14"
      data-testid={dataTestid}
    >
      {/* Progress bar — visible instantly on click */}
      <div className="w-full h-0.5 rounded-full bg-gray-100 overflow-hidden mb-1">
        <div
          className={`h-full bg-[#C5A163] transition-all duration-300 ${
            isPending ? "w-3/4 animate-pulse" : "w-0"
          }`}
        />
      </div>

      <div
        className={`flex items-center gap-1 transition-opacity duration-200 ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        <NavButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1 || isPending}
          label="Previous page"
        >
          <LuChevronLeft size={15} />
        </NavButton>
        <div className="flex sm:hidden items-center gap-1">
          {renderPageButtons(true)}
        </div>
        <div className="hidden sm:flex items-center gap-1">
          {renderPageButtons(false)}
        </div>
        <NavButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages || isPending}
          label="Next page"
        >
          <LuChevronRight size={15} />
        </NavButton>
      </div>

      <p className="text-xs text-gray-400">
        {isPending ? "Loading..." : `Page ${page} of ${totalPages}`}
      </p>
    </nav>
  )
}
