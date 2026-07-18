const path = require("path")
const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Without this, Next.js detects the pnpm workspace root above `storefront/`
  // and nests the standalone build as `.next/standalone/storefront/server.js`
  // instead of `.next/standalone/server.js`, which breaks the Docker image's
  // `CMD ["node", "server.js"]` (expects a flat /app/server.js).
  outputFileTracingRoot: path.join(__dirname),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 1. Force WebP only. AVIF encoding requires significantly more CPU than WebP.
    formats: ['image/webp'], 
    
    // 2. Reduce the matrix of generated sizes. 
    // This prevents the CPU from generating 8 different sizes of the same image.
    deviceSizes: [640, 1080, 1920], // Mobile, Laptop, Desktop
    imageSizes: [256, 384],         // Thumbnails

    // 3. Maximize Cache TTL (in seconds). Set to 1 year (31536000).
    // The CPU will optimize the image exactly once, and serve from cache forever.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.liqnic.com",
      },
      {
        protocol: "https",
        hostname: "api.dev.liqnic.com",
      }
    ],
  },
}

module.exports = nextConfig
