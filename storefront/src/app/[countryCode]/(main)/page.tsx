import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Features from "components/features"
import IqosDeviceSection from "components/how-to-use"
import IcosDeviceShowcase from "components/icos-device-showcase"
import IllumaAd from "components/illuma-ad"
import LiquorShowcase from "components/liquor-showcase"
import ZYNProductsShowcase from "components/zyn-products-showcase"
import type { Metadata } from "next"
import Link from "next/link"

// ─────────────────────────────────────────────────────────────────────────────
// SEO Metadata — top-level export, NOT inside the component
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),

  // ── Primary ────────────────────────────────────────────────────────────────
  title: {
    default: "Liqnic | Nepal's Premier Online Liquor & E-Cigarette Store",
    // Used by child pages: "Product Name | Liqnic"
    template: "",
  },
  description:
    "Buy authentic premium liquor, IQOS ILUMA devices, ZYN nicotine pouches & e-cigarettes online in Nepal. Fast delivery in Kathmandu. 100% genuine products guaranteed.",
  keywords: [
    "buy liquor online Nepal",
    "IQOS ILUMA Nepal",
    "ZYN nicotine pouches Nepal",
    "e-cigarette shop Nepal",
    "premium whisky Nepal",
    "online alcohol delivery Kathmandu",
    "buy vape Nepal",
    "heated tobacco Nepal",
    "cognac Nepal",
    "champagne delivery Nepal",
    "Liqnic",
  ],

  // ── Canonical & Alternates ─────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, WhatsApp, LinkedIn previews) ────────────────────
  openGraph: {
    type: "website",
    url: getBaseURL(),
    siteName: "Liqnic",
    title: "Liqnic | Nepal's Premier Online Liquor & E-Cigarette Store",
    description:
      "Authentic IQOS ILUMA devices, ZYN pouches, premium spirits & more. Fast delivery across Kathmandu. Nepal's most trusted 24/7 smoke-free & spirits boutique.",
    images: [
      {
        url: "/images/og-image.png", // 1200×630px recommended
        width: 1200,
        height: 630,
        alt: "Liqnic — Premium Liquor and E-Cigarettes in Nepal",
      },
    ],
    locale: "en_NP",
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Liqnic — Premium Liquor & E-Cigarettes in Nepal",
    description:
      "Buy genuine IQOS, ZYN, whisky, cognac & more online. Fast Kathmandu delivery. Always authentic.",
    images: ["/images/og-image.png"],
    // site: "@liqnic",       // uncomment when you have a Twitter handle
    // creator: "@liqnic",
  },

  // ── Indexing & Crawl ──────────────────────────────────────────────────────
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

  // ── App / PWA ─────────────────────────────────────────────────────────────
  applicationName: "Liqnic",
  authors: [{ name: "Liqnic", url: getBaseURL() }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // ── Verification (add keys when ready) ────────────────────────────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured Data (JSON-LD) — helps Google show rich results
// ─────────────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${getBaseURL()}/#organization`,
      name: "Liqnic",
      url: getBaseURL(),
      logo: {
        "@type": "ImageObject",
        url: `${getBaseURL()}/images/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "liqnichost@gmail.com",
        contactType: "customer service",
        areaServed: "NP",
        availableLanguage: ["English", "Nepali"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      sameAs: [
        // "https://www.instagram.com/liqnic",  // add when available
        // "https://www.facebook.com/liqnic",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${getBaseURL()}/#website`,
      url: getBaseURL(),
      name: "Liqnic",
      publisher: { "@id": `${getBaseURL()}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${getBaseURL()}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Store",
      "@id": `${getBaseURL()}/#store`,
      name: "Liqnic",
      description:
        "Nepal's premier digital boutique for fine liquor and premium e-cigarette hardware.",
      url: getBaseURL(),
      telephone: "",
      email: "liqnichost@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "$$",
      currenciesAccepted: "NPR",
      paymentAccepted: "Cash, Credit Card, Online Transfer",
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default async function Home({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <IllumaAd
        src="https://res.cloudinary.com/dtc5wqlst/video/upload/v1778725714/iqos_iluma_ad_1_1_wykzd1.mp4"
        poster="/images/video-thumbnail.jpg"
      />

      {collections && region ? (
        // Reduced horizontal padding on mobile so cards have more room
        <div className="px-4 sm:component-px py-8 ">
          {/* Header */}
          <div className="flex flex-col items-center gap-1.5 text-center ">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              The Collection
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Where fine spirits meet premium smoke.
            </p>
          </div>
          <div className="flex justify-end ">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors /* Minimum 44px tap target height for mobile */ min-h-[44px] px-2"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <FeaturedProducts region={region} />
        </div>
      ) : // Don't show raw text to real users — just render nothing
      null}
      <Features />
      <IcosDeviceShowcase />
      <ZYNProductsShowcase />
      <LiquorShowcase />
      <IqosDeviceSection />
    </>
  )
}
