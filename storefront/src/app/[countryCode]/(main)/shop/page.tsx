import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { Suspense } from "react"
import SkeletonProductGrid from "../../../../modules/skeletons/templates/skeleton-product-grid"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),

  // ── Primary ────────────────────────────────────────────────────────────────
  title: "Shop — Premium Liquor, IQOS & ZYN in Nepal",
  description:
    "Browse Liqnic's full collection of authentic premium spirits, IQOS ILUMA devices, ZYN nicotine pouches and accessories. Fast delivery across Kathmandu, Nepal.",
  keywords: [
    "buy liquor Nepal",
    "IQOS ILUMA buy Nepal",
    "ZYN pouches Nepal",
    "premium whisky online Nepal",
    "e-cigarette shop Kathmandu",
    "cognac Nepal",
    "nicotine pouch Nepal",
    "alcohol delivery Kathmandu",
    "Liqnic shop",
  ],

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/shop",
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: `${getBaseURL()}/shop`,
    siteName: "Liqnic",
    title: "Shop — Premium Liquor, IQOS & ZYN | Liqnic",
    description:
      "Explore our curated selection of world-class spirits, IQOS heated tobacco devices, and ZYN nicotine pouches. 100% authentic. Fast Kathmandu delivery.",
    images: [
      {
        url: "/images/og-shop.jpg", // 1200×630px — create a collage of products
        width: 1200,
        height: 630,
        alt: "Liqnic Shop — Liquor, IQOS and ZYN products in Nepal",
      },
    ],
    locale: "en_NP",
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Shop Premium Liquor, IQOS & ZYN | Liqnic",
    description:
      "Authentic spirits, IQOS devices & ZYN pouches delivered fast in Kathmandu.",
    images: ["/images/og-shop.jpg"],
  },

  // ── Indexing ──────────────────────────────────────────────────────────────
  // Allow indexing but block query/sort params from creating duplicate pages
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured Data — ItemList signals to Google this is a product listing page
// ─────────────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Shop — Liqnic Nepal",
  description:
    "Browse all premium liquor, IQOS ILUMA devices, ZYN nicotine pouches and accessories available at Liqnic Nepal.",
  url: `${getBaseURL()}/shop`,
  provider: {
    "@type": "Organization",
    name: "Liqnic",
    url: getBaseURL(),
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getBaseURL(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${getBaseURL()}/shop`,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    query?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  // const searchParams = await props.searchParams
  // const { sortBy, page, query } = searchParams

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SkeletonProductGrid />}>
        {/* Pass the un-awaited searchParams promise down */}
        <StoreTemplateWrapper
          countryCode={params.countryCode}
          searchParamsPromise={props.searchParams}
        />
      </Suspense>
    </>
  )
}

// Wrapper to safely await searchParams inside the Suspense boundary
async function StoreTemplateWrapper({
  countryCode,
  searchParamsPromise,
}: {
  countryCode: string
  searchParamsPromise: Params["searchParams"]
}) {
  const searchParams = await searchParamsPromise
  const { sortBy, page, query } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
      query={query}
    />
  )
}
