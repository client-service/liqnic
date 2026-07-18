import { Metadata } from "next"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Suspense } from "react"
import SkeletonProductGrid from "../../../../../modules/skeletons/templates/skeleton-product-grid"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  try {
    const product_categories = await listCategories()
    if (!product_categories) return []

    const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    const categoryHandles = product_categories.map(
      (category: any) => category.handle
    )

    const staticParams = countryCodes
      ?.filter((c): c is string => !!c)
      .map((countryCode) =>
        categoryHandles.map((handle: string) => ({
          countryCode,
          category: [handle],
        }))
      )
      .flat()

    return staticParams
  } catch (err: any) {
    console.warn("Failed to generate static paths for categories:", err.message)
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)
    if (!productCategory) {
      return {
        title: "Category Not Found",
        description: "Category data not available",
        robots: { index: false, follow: false },
      }
    }

    const title = `Buy ${productCategory.name} Online in Nepal`
    const description = `Buy authentic ${productCategory.name} online in Nepal at Liqnic. Genuine products with fast delivery across Kathmandu. Order ${productCategory.name} today and get 100% verified products with cash on delivery available.`
    const canonical = `/${params.countryCode}/categories/${params.category.join(
      "/"
    )}`

    return {
      title,
      description,
      keywords: [
        `${productCategory.name} Nepal`,
        `buy ${productCategory.name} online Nepal`,
        `${productCategory.name} Kathmandu`,
        `${productCategory.name} delivery Nepal`,
        `${productCategory.name} cash on delivery Nepal`,
        "Liqnic",
      ],
      alternates: {
        canonical,
      },
      openGraph: {
        title: `${title} | Liqnic`,
        description,
        type: "website",
        url: `https://liqnic.com${canonical}`,
        siteName: "Liqnic",
        images: [
          {
            url: "/images/og-image.png",
            width: 1200,
            height: 630,
            alt: `${productCategory.name} — Liqnic Nepal`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Liqnic`,
        description,
        images: ["/images/og-image.png"],
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (err: any) {
    console.warn("Could not fetch category metadata:", err.message)
    return { title: "Category Not Available" }
  }
}

export default async function CategoryPage(props: Props) {
  const params = await props.params

  let productCategory = null
  try {
    productCategory = await getCategoryByHandle(params.category)
  } catch (err: any) {
    console.warn("Could not fetch category:", err.message)
  }

  if (!productCategory) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center w-full py-20 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-yellow-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m0-4h.01M12 12v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-yellow-800 text-lg font-medium">
          Oops! Category data is not available at build time.
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          Please try again later or check back soon.
        </p>
      </div>
    )
  }

  // BreadcrumbList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://liqnic.com/${params.countryCode}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: productCategory.name,
        item: `https://liqnic.com/${
          params.countryCode
        }/categories/${params.category.join("/")}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SkeletonProductGrid />}>
        <CategoryTemplateWrapper
          category={productCategory}
          countryCode={params.countryCode}
          searchParamsPromise={props.searchParams}
        />
      </Suspense>
    </>
  )
}

// Wrapper to safely await searchParams inside the Suspense boundary
async function CategoryTemplateWrapper({
  category,
  countryCode,
  searchParamsPromise,
}: {
  category: any
  countryCode: string
  searchParamsPromise: Props["searchParams"]
}) {
  const searchParams = await searchParamsPromise
  const { sortBy, page } = searchParams

  return (
    <CategoryTemplate
      category={category}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
