import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group w-full"
    >
      <div data-testid="product-wrapper">
        <div className="w-full p-4 sm:p-[22px] flex flex-col gap-3 sm:gap-[15px] rounded-lg border border-[#E6E6E6] bg-[#F9F9F9]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          <div className="flex flex-col gap-2 sm:gap-[9px]">
            {/* Brand and Variant */}
            <div className="flex items-center gap-[7px]">
              <span className="text-xs sm:text-[13px] font-medium text-[#606060] leading-[150%] font-manrope">
                ZYN
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#606060] leading-[150%] font-manrope">
                ·
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#606060] leading-[150%] font-manrope">
                Variant
              </span>
            </div>

            {/* Product Name */}
            <h2 className="text-base sm:text-[18px] font-bold text-black leading-[150%] font-manrope">
              {product.title}
            </h2>
            {/* Description */}
            <p className="text-xs sm:text-[13px] font-medium text-[#A6A6A6] leading-[150%] font-manrope">
              {product?.description}
            </p>
            {/* Pricing */}
            <div className="flex items-center gap-3 sm:gap-[12px]">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>

            {/* Buy Now Button */}
            <button className="w-full py-2 sm:py-[11px] px-3 sm:px-[15px] rounded-[4px] border border-[#C8C8C8] bg-[#C5A163] flex items-center justify-center gap-[7px] hover:bg-[#B8956B] transition-colors">
              <span className="text-xs sm:text-[13px] font-medium text-white leading-[150%] font-manrope">
                Buy now
              </span>
            </button>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
