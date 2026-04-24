import {
  loadEnv,
  defineConfig,
  Modules,
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  admin: {
    // Disable admin for custom admin dashboard
    disable: true,
  },
  featureFlags: {},
  modules: [
    /**
     * Authentication
     */
    {
      resolve: "@medusajs/medusa/auth",
      dependencies: [Modules.CACHE, ContainerRegistrationKeys.LOGGER],
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
          },
          // Add more providers here when needed
        ],
      },
    },

    /**
     * File System
     */
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              // provider options...
              upload_dir: "static",
              backend_url: process.env.MEDUSA_SERVE_STATIC_URL || "http://localhost:9000"
            },
          },
        ],
      },
    },

    /**
     * Payment Gateway
     */
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          // new COD Payment Provider
          {
            resolve: "./src/modules/cod-payment",
          },
          // new custom QR Payment Provider
          {
            resolve: "./src/modules/qr-payment",
          },
          // Uncomment this to enable Stripe later
          // {
          //   resolve: "@medusajs/medusa/payment-stripe",
          //   id: "stripe",
          //   options: {
          //     apiKey: process.env.STRIPE_API_KEY,
          //   },
          // },
        ],
      },
    },

    /**
     * Caching
     */
    {
      key: Modules.CACHE,
      resolve: "@medusajs/cache-redis",
      options: { 
        redisUrl: process.env.CACHE_REDIS_URL,
      },
    },

    /**
     * Event Bus
     */
    // Redis-based Event Bus (for production)
    {
      key: Modules.EVENT_BUS,
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
        
      },
    },

    /**
     * Distributed Locking (For multiple instance in Production)
     */
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/locking-redis",
            id: "locking-redis",
            // set this if you want this provider to be used by default
            // and you have other Locking Module Providers registered.
            is_default: true,
            options: {
              redisUrl: process.env.LOCKING_REDIS_URL,
            },
          },
        ],
      },
    },

    /**
     * Notifications
     */
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-local",
            id: "local",
            options: {
              name: "Local Notification Provider",
              channels: ["feed"],
            },
          },
          // Example for custom Resend module
          // {
          //   resolve: "./src/modules/resend",
          //   id: "resend",
          //   options: {
          //     channels: ["email"],
          //     api_key: process.env.RESEND_API_KEY,
          //     from: process.env.RESEND_FROM_EMAIL,
          //   },
          // },
        ],
      },
    },

    /**
     * Custom Modules
     */
    {
      resolve: "./src/modules/events",
    },
    {
      resolve: "./src/modules/loyalty"
    }
  ],
  plugins: [
    /**
     * Custom SMTP Email
     */
    {
      resolve: "medusa-plugin-smtp",
      options: {
        fromEmail: process.env.FROM_EMAIL_ADDRESS,
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secureConnection: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          preview: false,
          tls: {
            ciphers: "SSLv3",
          },
          requireTLS: false,
        },
        emailTemplatePath: "emails",
        templateMap: {
          "invite.created": "inviteCreated",
          "order.placed": "orderPlaced",
        },
      },
    },
  ],
  projectConfig: {
    databaseDriverOptions: {
      connection: {
        ssl: false
      },
      // Enforce connection pooling limits
      pool: {
        min: 2,
        max: 20, // Adjust based on your Postgres server's max_connections
        idleTimeoutMillis: 30000,
      },
      // Force Postgres to assassinate queries taking longer than 2.5 seconds
      extra: {
        statement_timeout: 2500 
      }
    },
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
});
