import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

const formatTitle = (title: string) => {
  return title
    .toLowerCase()
    .replace(/(\d+)\s*ml\b/g, "$1 ML")
    .replace(/(\d+)ml\b/g, "$1 ML")
    .replace(/(\d+)\s*ltr\b/g, "$1 LTR")
    .replace(/(\d+)ltr\b/g, "$1 LTR")
    .split(" ")
    .map((word) => {
      if (word === "ml" || word === "ltr") return word.toUpperCase()

      return word
        .split("'")
        .map((part, i) => {
          if (!part) return part
          if (i === 0) return part.charAt(0).toUpperCase() + part.slice(1) // ✅ only capitalize before apostrophe
          return part // ✅ leave "s", "t", "re" etc. as lowercase
        })
        .join("'")
    })
    .join(" ")
}

export async function generateStaticParams() {
  try {
    const { response } = await listProducts({
      countryCode: "np",
      queryParams: { limit: 100, fields: "handle" },
    })
    return response.products
      .filter((p) => p.handle)
      .map((p) => ({ countryCode: "np", handle: p.handle }))
  } catch (err: any) {
    console.warn("Failed to generate static params:", err.message)
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle, countryCode } = params

  let region = null
  try {
    region = await getRegion(countryCode)
  } catch (err: any) {
    console.warn("Could not fetch region:", err.message)
  }

  if (!region) {
    return {
      title: "Product Not Found | Liqnic",
      description: "Region not available",
      robots: { index: false, follow: false },
    }
  }

  let product = null
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: { handle },
    })
    product = response.products[0]
  } catch (err: any) {
    console.warn("Could not fetch product metadata:", err.message)
  }

  if (!product) {
    return {
      title: "Product Not Found | Liqnic",
      description: "Product data not available",
      robots: { index: false, follow: false },
    }
  }

  const description = `Buy authentic ${formatTitle(
    product.title
  )} online in Nepal at Liqnic. Genuine product with fast delivery across Kathmandu. Order today with cash on delivery available.`

  const title = `Buy ${formatTitle(product.title)} in Nepal`
  const canonical = `https://liqnic.com/${countryCode}/products/${handle}`

  // Category and collection for keywords
  const categoryNames =
    product.categories?.map((c: any) => c.name).join(", ") ?? ""
  const collectionName = product.collection?.title ?? ""

  return {
    title,
    description,
    keywords: [
      `buy ${formatTitle(product.title)} Nepal`,
      `${formatTitle(product.title)} price Nepal`,
      `${formatTitle(product.title)} Kathmandu`,
      `${formatTitle(product.title)} online Nepal`,
      ...(categoryNames
        ? [`${categoryNames} Nepal`, `buy ${categoryNames} online Nepal`]
        : []),
      ...(collectionName ? [`${collectionName} Nepal`] : []),
      "Liqnic",
      "buy liquor online Nepal",
      "cash on delivery Nepal",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | Liqnic`,
      description,
      type: "website",
      url: canonical,
      siteName: "Liqnic",
      images: product.thumbnail
        ? [
            {
              url: product.thumbnail,
              width: 800,
              height: 800,
              alt: `${formatTitle(
                product.title
              )} — Buy Online in Nepal at Liqnic`,
            },
          ]
        : [
            {
              url: "/images/og-image.png",
              width: 1200,
              height: 630,
              alt: "Liqnic Nepal",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Liqnic`,
      description,
      images: product.thumbnail
        ? [product.thumbnail]
        : ["/images/og-image.png"],
    },
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
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const { countryCode, handle } = params

  let region = null
  try {
    region = await getRegion(countryCode)
  } catch (err: any) {
    console.warn("Could not fetch region:", err.message)
  }

  if (!region) notFound()

  let product = null
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: { handle },
    })
    product = response.products[0]
  } catch (err: any) {
    console.warn("Could not fetch product:", err.message)
  }

  if (!product) notFound()

  // ── Product JSON-LD schema ────────────────────────────────────────────────
  // Enables Google rich snippets: price, availability, brand in search results
  const inStock =
    product.variants?.some(
      (v: any) => v.inventory_quantity === null || v.inventory_quantity > 0
    ) ?? false

  const price = product.variants?.[0]?.calculated_price?.calculated_amount
  const currencyCode =
    product.variants?.[0]?.calculated_price?.currency_code?.toUpperCase() ??
    "NPR"

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Product schema ──────────────────────────────────────────────────
      {
        "@type": "Product",
        "@id": `https://liqnic.com/${countryCode}/products/${handle}#product`,
        name: formatTitle(product.title),
        description:
          (product.description ?? "")
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim() ||
          `Buy ${formatTitle(product.title)} online in Nepal at Liqnic.`,
        image: product.images?.map((img: any) => img.url) ?? [],
        sku: product.variants?.[0]?.sku ?? handle,
        brand: {
          "@type": "Brand",
          name: product.collection?.title ?? "Liqnic",
        },
        ...(product.categories?.length
          ? {
              category: product.categories.map((c: any) => c.name).join(" > "),
            }
          : {}),
        offers: {
          "@type": "Offer",
          url: `https://liqnic.com/${countryCode}/products/${handle}`,
          priceCurrency: currencyCode,
          ...(price != null ? { price: price.toString() } : {}),
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Liqnic",
            url: "https://liqnic.com",
          },
          areaServed: {
            "@type": "Country",
            name: "Nepal",
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "NP",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnNotPermitted",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "NP",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 3,
                unitCode: "DAY",
              },
            },
          },
        },
      },
      // ── BreadcrumbList schema ───────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://liqnic.com/${countryCode}`,
          },
          ...(product.categories?.length
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: product.categories[0].name,
                  item: `https://liqnic.com/${countryCode}/categories/${product.categories[0].handle}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: formatTitle(product.title),
                  item: `https://liqnic.com/${countryCode}/products/${handle}`,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: formatTitle(product.title),
                  item: `https://liqnic.com/${countryCode}/products/${handle}`,
                },
              ]),
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductTemplate
        product={product}
        region={region}
        countryCode={countryCode}
      />
    </>
  )
}
