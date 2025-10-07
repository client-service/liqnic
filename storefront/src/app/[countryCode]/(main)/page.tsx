import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import AgeVerificationWrapper from "components/AgeVerificationWrapper"
import Features from "components/features"
import IqosDeviceSection from "components/how-to-use"
import IcosDeviceShowcase from "components/icos-device-showcase"
import IllumaProducts from "components/illuma-products"
import LiquorShowcase from "components/liquor-showcase"
import CustomerTestimonials from "components/testimonials"
import ZYNProductsShowcase from "components/zyn-products-showcase"

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

  console.log("countryCode:", countryCode)

  if (!collections || !region) {
    return <p>No collections or region found</p> // safer than null
  }

  return (
    <>
      <AgeVerificationWrapper>
        <Hero />
        <Features />
        <IllumaProducts />
        <div className="component-px py-8 lg:pt-16">
          <h2 className="text-base md:text-xl lg:text-3xl  text-center font-semibold">
            Our Products
          </h2>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts region={region} />
          </ul>
        </div>
        <IcosDeviceShowcase />
        <ZYNProductsShowcase />
        <LiquorShowcase />
        <IqosDeviceSection />
        <CustomerTestimonials />
      </AgeVerificationWrapper>
    </>
  )
}
