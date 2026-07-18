import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductGalleryClient from "./product-gallery-client"
import ProductTabsClient from "./product-tab-client"

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

  return (
    <>
      <section
        className="w-full grid grid-cols-1 md:grid-cols-7 md:gap-8 component-px py-8 lg:py-16 bg-gray-100"
        data-testid="product-container"
      >
        {/* Left Section (Gallery + Info) */}
        <div className="md:col-span-4 w-full">
          <ProductGalleryClient
            images={product?.images || []}
            title={product?.title}
          />
        </div>

        {/* Right Section (Details + Actions) */}
        <aside className="col-span-3 flex flex-col small:sticky small:top-48 w-full py-8 gap-y-6 md:px-4">
          {/* Tags */}

          <div className="flex flex-wrap items-center gap-2">
            {/* Stock status */}
            {!product?.variants?.length ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/5 text-black/60 border border-black/10">
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 inline-block" />
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
                In Stock
              </span>
            )}

            <span className="w-px h-4 bg-black/10" />

            {/* New badge */}
            {/* <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white tracking-wide uppercase">
              New
            </span> */}

            {/* Collection */}
            {product?.collection?.title && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-black/5 text-black/70 border border-black/10">
                {product.collection.title}
              </span>
            )}

            {/* Categories */}
            {product?.categories?.map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-black/5 text-black/70 border border-black/10"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Product Title */}
          <h1 className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight lg:leading-[48px] tracking-[-0.792px]">
            {formatTitle(product.title)}
          </h1>

          {/* Subtitle */}
          {product?.subtitle && (
            <p className="text-gray-500 text-[13px] font-medium leading-5">
              {product.subtitle}
            </p>
          )}

          <hr />

          {/* Variants */}
          {/* {product?.variants?.length > 0 && (
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
          )} */}

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
