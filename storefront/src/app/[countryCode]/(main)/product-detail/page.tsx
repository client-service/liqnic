"use client"
import { Breadcrumb } from "components/Breadcrumb"
import { ProductCard } from "components/ProductCard"
import { useState } from "react"
import { LuMinus, LuPlus } from "react-icons/lu"

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState("Apple Mint")
  const [quantity, setQuantity] = useState(5)
  const [activeTab, setActiveTab] = useState("Description")

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Category name", href: "/category" },
    { label: "Product name" },
  ]

  const variants = [
    "Apple Mint",
    "Coffee",
    "Cool Mint",
    "Spearmint",
    "Icy Blackcurrant",
  ]

  const tabs = ["Description", "How to use", "Details/Specifications"]

  const relatedProducts = [
    {
      id: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/83f101c0f6b9f179339c49178c453b552932f031?width=153",
      brand: "ZYN",
      variant: "Variant",
      name: "Product name",
      description: "Premium heated tobacco device with sophisticated design",
      price: 1599,
      originalPrice: 1899,
    },
    {
      id: 2,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a28564c0c9da67644cf41e0242ed1f2d3f355d90?width=153",
      brand: "IQOS",
      variant: "Variant",
      name: "Product name",
      description: "Premium heated tobacco device with sophisticated design",
      price: 1599,
      originalPrice: 1899,
    },
    {
      id: 3,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/44deaeb0096bbafa119e2a0ff40437289a8afdb2?width=153",
      brand: "IQOS",
      variant: "Variant",
      name: "Product name",
      description: "Premium heated tobacco device with sophisticated design",
      price: 1599,
      originalPrice: 1899,
    },
    {
      id: 4,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/8eece15299348c8641d5b2bd1a1a38614efa3f6c?width=153",
      brand: "Liqour",
      variant: "Variant",
      name: "Product name",
      description: "Premium heated tobacco device with sophisticated design",
      price: 1599,
      originalPrice: 1899,
    },
  ]

  const productThumbnails = [
    "https://api.builder.io/api/v1/image/assets/TEMP/83f101c0f6b9f179339c49178c453b552932f031?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/a28564c0c9da67644cf41e0242ed1f2d3f355d90?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/44deaeb0096bbafa119e2a0ff40437289a8afdb2?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/8eece15299348c8641d5b2bd1a1a38614efa3f6c?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/ed06411bdc6cfe2169cc26611a406902fd378d1d?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/bb148ec0092e849be98817ffce5fbf908ffd8fdd?width=153",
    "https://api.builder.io/api/v1/image/assets/TEMP/b120f51ce0f3cda8e202b2c77599cea5a39a645b?width=153",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <div className="px-4 lg:px-[100px] py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[55px]">
          {/* Product Gallery */}
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-auto">
            {/* Thumbnails - Horizontal on mobile, vertical on desktop */}
            <div className="flex lg:flex-col gap-2 lg:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
              {productThumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="w-16 h-16 lg:w-[77px] lg:h-[80px] flex-shrink-0 rounded overflow-hidden border border-gray-200 cursor-pointer hover:border-brand-primary transition-colors"
                >
                  <img
                    src={thumb}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full lg:w-[628px] h-64 sm:h-96 lg:h-[656px] rounded overflow-hidden order-1 lg:order-2">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0284c3d2a9203fe0a1da07f9dfaa33685bc0ee50?width=1257"
                alt="ZYN Product Main"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-[459px] flex flex-col gap-5">
            {/* Status Badges */}
            <div className="flex gap-[10px]">
              <span className="px-2 py-0 bg-success-light text-success text-sm font-bold rounded">
                New!
              </span>
              <span className="px-2 py-0 bg-info-light text-info text-sm font-bold rounded">
                Category name
              </span>
              <span className="px-2 py-0 bg-error-light text-error text-sm font-bold rounded">
                Out of stock
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight lg:leading-[48px] tracking-[-0.792px]">
              ZYN Product Name
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-[13px] font-medium leading-5">
              Tobacco-free nicotine pouches with smooth, refreshing flavor.
              Discreet, convenient, and ready whenever you are.
            </p>

            {/* Price */}
            <div className="flex items-end gap-[9px]">
              <span className="text-gray-600 text-[28px] font-bold leading-[48px] tracking-[-0.616px]">
                Rs 899
              </span>
              <span className="text-gray-400 text-base font-medium leading-[48px] tracking-[-0.352px] line-through">
                Rs 1099
              </span>
            </div>

            <hr className="border-gray-300" />

            {/* Product Info */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-[10px]">
                <span className="text-gray-900 text-sm font-medium">Size:</span>
                <span className="text-gray-500 text-[13px] font-medium">
                  20 pouches per can
                </span>
              </div>
              <div className="flex gap-[10px]">
                <span className="text-gray-900 text-sm font-medium">
                  Nicotine Strength:
                </span>
                <span className="text-gray-500 text-[13px] font-medium">
                  3 mg per pouch
                </span>
              </div>
            </div>

            {/* Variant Selection */}
            <div className="flex flex-col gap-4">
              <label className="text-gray-600 text-sm font-normal">
                Variant
              </label>
              <div className="flex flex-wrap gap-2 lg:gap-[11px]">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 lg:px-[30px] py-[10px] rounded-md text-xs lg:text-[13px] font-bold transition-colors ${
                      selectedVariant === variant
                        ? "bg-brand-primary text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="flex flex-col gap-4">
              <label className="text-gray-600 text-sm font-normal">
                Quantity
              </label>
              <div className="flex items-center w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-[10px] bg-gray-200 border-r border-gray-300 rounded-l-md hover:bg-gray-300 transition-colors"
                >
                  <LuMinus className="w-4 h-4" />
                </button>
                <div className="px-5 py-[10px] bg-gray-200 border-r border-gray-300 text-gray-900 text-sm font-normal min-w-[60px] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-[10px] bg-gray-200 rounded-r-md hover:bg-gray-300 transition-colors"
                >
                  <LuPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-[15px]">
              <button className="flex-1 py-3 lg:py-[11px] px-4 lg:px-2 border border-gray-300 rounded text-gray-900 text-sm lg:text-[13px] font-bold hover:bg-gray-50 transition-colors">
                Add to cart
              </button>
              <button className="flex-1 py-3 lg:py-[11px] px-4 lg:px-2 bg-black text-white text-sm lg:text-[13px] font-bold rounded hover:bg-gray-800 transition-colors">
                Buy now (Rs 4,495)
              </button>
            </div>

            {/* Product Description Tabs */}
            <div className="flex flex-col gap-5 mt-5">
              {/* Tab Headers */}
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 sm:px-5 py-[10px] text-sm font-medium transition-colors text-left ${
                      activeTab === tab
                        ? "border-b border-black text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="text-gray-500 text-[13px] font-medium leading-5">
                {activeTab === "Description" && (
                  <div>
                    <p className="mb-4">
                      <strong>Zyn Apple Mint – 3 mg</strong>
                    </p>
                    <p className="mb-4">
                      Experience the refreshing blend of crisp green apple and
                      cool mint in every pouch. Zyn Apple Mint is completely
                      tobacco-free, offering smooth nicotine satisfaction
                      without the smoke or ash. Each slim can contains 20
                      pouches, designed for discreet, on-the-go use whenever you
                      need a quick nicotine boost.
                    </p>
                    <p className="mb-4">
                      The carefully balanced Apple Mint flavor provides a
                      refreshing taste that lingers, while the nicotine delivers
                      a smooth and controlled experience. Zyn is perfect for
                      those who want convenience, discretion, and flavor all in
                      one.
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>
                        Tobacco-free for a cleaner, more modern nicotine
                        experience
                      </li>
                      <li>
                        Long-lasting flavor that keeps your taste buds satisfied
                      </li>
                      <li>
                        Slim, portable can fits easily in your pocket or bag
                      </li>
                      <li>Discreet usage anywhere, anytime</li>
                    </ul>
                    <p>
                      Whether you're at work, commuting, or relaxing with
                      friends, Zyn Apple Mint is your go-to pouch for a crisp,
                      refreshing nicotine experience.
                    </p>
                  </div>
                )}
                {activeTab === "How to use" && (
                  <div>
                    <p>
                      Instructions for using the product will be displayed here.
                    </p>
                  </div>
                )}
                {activeTab === "Details/Specifications" && (
                  <div>
                    <p>
                      Product specifications and detailed information will be
                      displayed here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
