"use client"

import React from "react"

const Hero = () => {
  return (
    <section className="relative bg-gray-50">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
          Liqnic
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
          Premium Nicotine & Fine Spirits Delivered 24/7
        </p>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/shop"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Shop IQOS Devices
          </a>
          <a
            href="/shop-accessories"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Shop Accessories
          </a>
        </div>

        {/* Offer / Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">24/7 Delivery</h3>
            <p className="text-gray-600 text-sm">
              Nationwide, anytime you need.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Exclusive Bundles</h3>
            <p className="text-gray-600 text-sm">
              Save more with curated sets.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Premium Selection</h3>
            <p className="text-gray-600 text-sm">
              Trusted international brands only.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Responsible & Safe</h3>
            <p className="text-gray-600 text-sm">
              Age-verified, compliant deliveries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
