interface ProductCardProps {
  image: string
  brand: string
  variant: string
  name: string
  description: string
  price: number
  originalPrice: number
  onBuyNow?: () => void
}

export function ProductCard({
  image,
  brand,
  variant,
  name,
  description,
  price,
  originalPrice,
  onBuyNow,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-[290px] p-4 lg:p-[22px] flex flex-col gap-[15px] border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="h-[120px] sm:h-[148px] flex items-center justify-center bg-gray-50 rounded overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-[9px]">
        {/* Brand and Variant */}
        <div className="flex items-center gap-[7px] text-gray-500 text-[13px] font-medium">
          <span>{brand}</span>
          <span>·</span>
          <span>{variant}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-black text-[18px] font-bold leading-[150%]">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-[13px] font-medium leading-[150%]">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-[12px]">
          <span className="text-gray-900 text-[18px] font-bold leading-[150%]">
            Rs. {price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-[13px] font-medium line-through">
            Rs. {originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={onBuyNow}
          className="w-full py-[11px] px-[15px] bg-brand-primary text-white text-[13px] font-medium rounded border border-gray-300 hover:bg-brand-secondary transition-colors"
        >
          Buy now
        </button>
      </div>
    </div>
  )
}
