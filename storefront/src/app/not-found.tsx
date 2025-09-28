import Footer from "@modules/layout/templates/footer"
import Navbar from "components/navbar"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-6xl font-bold text-gray-600 mb-4 font-manrope">
              404
            </h1>
            <h2 className="text-2xl font-bold text-gray-600 mb-4 font-manrope">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-500 mb-8 font-manrope">
              Sorry, the page you're looking for doesn't exist or has been
              moved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <button className="px-6 py-3 bg-[#C5A163] text-white font-medium rounded-lg hover:bg-brand-secondary transition-colors">
                  Return Home
                </button>
              </Link>
              <Link href="/shop">
                <button className="px-6 py-3 border border-[#C5A163] text-[#C5A163] font-medium rounded-lg hover:bg-[#C5A163] hover:text-white transition-colors">
                  Browse Shop
                </button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-400">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
