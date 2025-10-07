import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductTabsClient from "./product-tab-client"
import { Span } from "next/dist/trace"
import { divide } from "lodash"
import ProductGalleryClient from "./product-gallery-client"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate = async ({
  product,
  region,
  countryCode,
}: ProductTemplateProps) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <>
      <section
        className="grid grid-cols-1 md:grid-cols-6 gap-8 lg:gap-16 component-px w-full py-8 lg:py-16 bg-gray-100"
        data-testid="product-container"
      >
        {/* Left Section (Gallery + Info) */}
        <div className="md:col-span-4">
          <ProductGalleryClient
            images={product?.images || []}
            title={product?.title}
          />
        </div>

        {/* Right Section (Details + Actions) */}
        <aside className="col-span-2 flex flex-col small:sticky small:top-48 w-full py-8 gap-y-6">
          {/* Tags */}
          <div className="flex gap-2">
            <span className="px-2 py-0 bg-success-light text-success text-sm font-bold rounded">
              New!
            </span>
            {product?.collection?.title && (
              <span className="px-2 py-0 bg-info-light text-info text-sm font-bold rounded">
                {product.collection.title}
              </span>
            )}
            {!product?.variants?.length ? (
              <span className="px-2 py-0 bg-error-light text-error text-sm font-bold rounded">
                Out of stock
              </span>
            ) : (
              <span className="px-2 py-0 text-green-800 text-success text-sm font-bold rounded">
                Available
              </span>
            )}
          </div>

          {/* Product Title */}
          <h1 className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight lg:leading-[48px] tracking-[-0.792px]">
            {product.title}
          </h1>

          {/* Subtitle */}
          {product?.subtitle && (
            <p className="text-gray-500 text-[13px] font-medium leading-5">
              {product.subtitle}
            </p>
          )}

          <hr />

          {/* Variants */}
          {product?.variants?.length > 0 && (
            <div className="flex flex-col gap-4">
              <label className="text-gray-600 text-sm font-normal">
                Variant
              </label>
              <div className="flex flex-wrap gap-2 lg:gap-[11px]">
                {product?.variants?.map((variant) => (
                  <button
                    key={variant?.id}
                    className="px-4 lg:px-[30px] py-[10px] rounded-md text-xs lg:text-[13px] font-bold border border-gray-200 hover:border-black transition-colors"
                  >
                    {variant?.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA + Actions */}
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions disabled product={product} region={region} />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          {/* Tabs (Client component handles state) */}
          <ProductTabsClient product={product} />
        </aside>
      </section>

      {/* Related Products */}
      <section
        className="py-8 component-px bg-gray-100"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </section>
    </>
  )
}

export default ProductTemplate
