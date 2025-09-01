import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  try {
    const { collections } = await listCollections({
      fields: "*products",
    })

    if (!collections) return []

    const countryCodes = await listRegions().then(
      (regions: StoreRegion[]) =>
        regions
          ?.map((r) => r.countries?.map((c) => c.iso_2))
          .flat()
          .filter(Boolean) as string[]
    )

    const collectionHandles = collections.map(
      (collection: StoreCollection) => collection.handle
    )

    const staticParams = countryCodes
      ?.map((countryCode: string) =>
        collectionHandles.map((handle: string | undefined) => ({
          countryCode,
          handle,
        }))
      )
      .flat()

    return staticParams
  } catch (err: any) {
    console.warn("Could not fetch collections during build:", err.message)
    // Return empty array so build succeeds
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const collection = await getCollectionByHandle(params.handle)

    if (!collection) {
      return {
        title: "Collection Not Found",
        description: "Collection not available",
      }
    }

    return {
      title: `${collection.title} | Medusa Store`,
      description: `${collection.title} collection`,
    } as Metadata
  } catch (err: any) {
    console.warn("Could not fetch collection metadata:", err.message)
    return {
      title: "Collection Not Available",
      description: "Collection data could not be fetched",
    }
  }
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  let collection: StoreCollection | null = null
  try {
    collection = await getCollectionByHandle(params.handle)
  } catch (err: any) {
    console.warn("Could not fetch collection:", err.message)
  }

  if (!collection) {
    return (
      <div>
        <p>Collection data is not available at build time.</p>
      </div>
    )
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
