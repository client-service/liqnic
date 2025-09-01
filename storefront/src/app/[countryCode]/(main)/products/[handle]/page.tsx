import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean)
    )

    if (!countryCodes) return []

    const promises = countryCodes.map(async (country) => {
      try {
        const { response } = await listProducts({
          countryCode: country,
          queryParams: { limit: 100, fields: "handle" },
        })
        return { country, products: response.products || [] }
      } catch (err: any) {
        console.warn(`Could not fetch products for ${country}:`, err.message)
        return { country, products: [] }
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (err: any) {
    console.warn(
      "Failed to generate static paths for product pages:",
      err.message
    )
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
      title: "Product Not Found",
      description: "Region not available",
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
      title: "Product Not Found",
      description: "Product data not available",
    }
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
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

  if (!region) {
    return <p>Region data not available at build time.</p>
  }

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

  if (!product) {
    return <p>Product data not available at build time.</p>
  }

  return (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={countryCode}
    />
  )
}
