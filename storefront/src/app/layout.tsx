import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Manrope } from "next/font/google"
import AgeVerificationWrapper from "components/AgeVerificationWrapper"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),

  title: {
    default: "Liqnic | Nepal's Premier Liquor & E-Cigarette Store",
    template: "%s | Liqnic",
  },
  description:
    "Buy authentic premium liquor, IQOS ILUMA, ZYN nicotine pouches & accessories online in Nepal. Fast delivery in Kathmandu. 100% genuine products.",
  keywords: [
    "buy liquor online Nepal",
    "IQOS ILUMA Nepal",
    "ZYN nicotine pouches Nepal",
    "e-cigarette shop Kathmandu",
    "premium whisky Nepal",
    "alcohol delivery Nepal",
    "Liqnic",
  ],
  openGraph: {
    type: "website",
    siteName: "Liqnic",
    title: "Liqnic | Nepal's Premier Liquor & E-Cigarette Store",
    description:
      "Authentic IQOS devices, ZYN pouches & premium spirits. Fast Kathmandu delivery. Nepal's most trusted 24/7 boutique.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Liqnic — Premium Liquor and E-Cigarettes in Nepal",
      },
    ],
    locale: "en_NP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liqnic | Nepal's Premier Liquor & E-Cigarette Store",
    description:
      "Authentic IQOS, ZYN & premium spirits. Fast Kathmandu delivery.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Liqnic",
  authors: [{ name: "Liqnic", url: getBaseURL() }],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={manrope.variable}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" sizes="512x512" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="">
        <AgeVerificationWrapper>
          <div className="relative">{props.children}</div>
        </AgeVerificationWrapper>
      </body>
    </html>
  )
}
