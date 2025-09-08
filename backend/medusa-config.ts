import { loadEnv, defineConfig, Modules, ContainerRegistrationKeys } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

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
          // other providers...
          {
            resolve: "@medusajs/medusa/auth-google",
            id: "google",
            options: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackUrl: process.env.GOOGLE_CALLBACK_URL,
            },
          },
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
          // Uncomment this to enable stripe
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
            },
          },
        ]
      }
    },

    /**
     * Event Bus
     */
    {
      key: "eventBus",
      resolve: "@medusajs/event-bus-local",
    },
    // This module allows you to utilize Redis for the event bus functionality. When installed, the Medusa’s events system is powered by BullMQ and io-redis. 
    // BullMQ is responsible for the message queue and worker, and io-redis is the underlying Redis client that BullMQ connects to for events storage.
    // {
    //   key: "eventBus",
    //   resolve: "@medusajs/event-bus-redis",
    //   options: {
    //     redisUrl: process.env.EVENTS_REDIS_URL, // production
    //   },
    // },

    /**
     * Notifications
     */
    {
      resolve: '@medusajs/medusa/notification',
      options: {
        providers: [
          // Default provider
          {
            resolve: "@medusajs/medusa/notification-local",
            id: "local",
            options: {
              name: "Local Notification Provider",
              channels: ["feed"],
            },
          },
          // {
          //   resolve: "./src/modules/resend",
          //   id: "resend",
          //   options: {
          //     channels: ["email"],
          //     api_key: process.env.RESEND_API_KEY,
          //     from: process.env.RESEND_FROM_EMAIL,
          //   },
          // },
        ]
      },
    },

    /**
     * Custom Modules
     */
    {
      resolve: "./src/modules/events"
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
          // Add other events visit https://github.com/minpham-com/medusa-plugin-smtp/blob/main/src/services/smtp.js
        },
      },
    },
  ],
  projectConfig: {
    databaseDriverOptions: {
      connection: {
        ssl: false
      }
    },
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
