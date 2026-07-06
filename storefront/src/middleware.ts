import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "np"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Liqnic Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: ["regions"],
      },
    }).then((res) => res.json())

    if (!regions?.length) {
      throw new Error(
        "No regions found. Please set up regions in your Liqnic Admin."
      )
    }

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Liqnic Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── 0. BYPASS SEO FILES ──────────────────────────────────────────────────
  // Never redirect sitemap.xml or robots.txt — Google must reach these at root
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next()
  }

  // ─── 1. FAST BYPASS FOR NEPAL (np) ──────────────────────────────────────────
  if (pathname.startsWith(`/${DEFAULT_REGION}`)) {
    let response = NextResponse.next()

    let cacheIdCookie = request.cookies.get("_medusa_cache_id")
    if (!cacheIdCookie) {
      response.cookies.set("_medusa_cache_id", crypto.randomUUID(), {
        maxAge: 60 * 60 * 24,
      })
    }

    const searchParams = request.nextUrl.searchParams
    const isOnboarding = searchParams.get("onboarding") === "true"
    const cartId = searchParams.get("cart_id")
    const checkoutStep = searchParams.get("step")
    const cartIdCookie = request.cookies.get("_medusa_cart_id")

    if (!isOnboarding && !cartId && !checkoutStep && cacheIdCookie) {
      return response
    }

    let redirectNeeded = false
    const redirectUrl = request.nextUrl.clone()

    if (isOnboarding) {
      response.cookies.set("_medusa_onboarding", "true", {
        maxAge: 60 * 60 * 24,
      })
      redirectUrl.searchParams.delete("onboarding")
      redirectNeeded = true
    }

    if (cartId && !cartIdCookie) {
      response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
      redirectUrl.searchParams.delete("cart_id")
      redirectNeeded = true
    }

    if (checkoutStep) {
      const isCheckoutPage = pathname.includes("/checkout")
      if (!isCheckoutPage) {
        redirectUrl.searchParams.delete("step")
        redirectUrl.pathname = `/${DEFAULT_REGION}/checkout`
        redirectNeeded = true
      }
    }

    if (redirectNeeded) {
      return NextResponse.redirect(redirectUrl, 307)
    }

    return response
  }

  // ─── 2. ROOT REDIRECT ─────────────────────────────────────────────────────
  if (pathname === "/") {
    const queryString = request.nextUrl.search ?? ""
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${DEFAULT_REGION}${queryString}`,
      307
    )
  }

  // ─── 3. HEAVY FALLBACK FOR OTHER ROUTES ───────────────────────────────────
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")
  const onboardingCookie = request.cookies.get("_medusa_onboarding")
  const cartIdCookie = request.cookies.get("_medusa_cart_id")

  let response = NextResponse.next()

  const regionMap = await getRegionMap()
  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return response
  }

  const redirectUrl = request.nextUrl.clone()

  if (!urlHasCountryCode) {
    redirectUrl.pathname = `/${countryCode || DEFAULT_REGION}${
      redirectUrl.pathname
    }`
  }

  if (isOnboarding) {
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
    redirectUrl.searchParams.delete("onboarding")
  }

  if (cartId && !cartIdCookie) {
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
    redirectUrl.searchParams.delete("cart_id")
  }

  if (checkoutStep) {
    redirectUrl.searchParams.delete("step")
    redirectUrl.pathname = `/${countryCode || DEFAULT_REGION}/checkout`
  }

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    // Exclude static files, api, AND sitemap/robots from middleware
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
