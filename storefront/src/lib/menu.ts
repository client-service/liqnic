import { fetchCategories } from "./get-categories"

export interface MenuItem {
  label: string
  href?: string
  dropdown?: boolean
  children?: MenuItem[]
}

export async function buildMenuItems(): Promise<MenuItem[]> {
  const parentCategories = await fetchCategories()

  const menuItems: MenuItem[] = await Promise.all(
    parentCategories.map(async (parent: any) => {
      const subcategories = await fetchCategories(parent.id)

      return {
        label: parent.name,
        href: parent.handle,
        dropdown: subcategories.length > 0,
        children: subcategories.map((sub: any) => ({
          label: sub.name,
          href: `/categories/${sub.handle || sub.id}`,
        })),
      }
    })
  )

  return [
    // { label: "Home", href: "/" }, 
    { label: "All Products", href: "/shop" },
    ...menuItems,
    // { label: "Bundles & Gifts", href: "/bundles" },
    // { label: "About us", href: "/about" }, 
    { label: "Contact", href: "/contact" },
  ]
}
