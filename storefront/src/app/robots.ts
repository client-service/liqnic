import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://liqnic.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/account",
          "/account/*",
          "/api/",
          "/*?step=*",      // checkout steps
          "/*?cart=*",      // cart params
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}