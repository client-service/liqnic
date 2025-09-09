interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 px-4 lg:px-[100px] py-4 overflow-x-auto">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 whitespace-nowrap">
          {item.href ? (
            <a
              href={item.href}
              className="text-gray-500 text-[13px] font-medium hover:text-brand-primary transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-gray-500 text-[13px] font-medium">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-gray-500 text-[13px] font-medium">&gt;</span>
          )}
        </div>
      ))}
    </div>
  )
}
