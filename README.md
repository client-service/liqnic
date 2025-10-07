# 🛠️ MedusaJS Monorepo (Backend + Dashboard + Storefront)

This repository contains three main components: test

* **Backend** → [MedusaJS v2](https://medusajs.com/) (TypeScript)
* **Dashboard** → [Admin dashboard](https://github.com/medusajs/medusa/tree/develop/packages/admin/dashboard) (cloned from MedusaJS GitHub, Vite + React + TS)
* **Storefront** → [Next.js storefront example](https://github.com/medusajs/nextjs-starter-medusa) (TypeScript)

---

## 📂 Repository Structure

```bash
.
├── backend/        # MedusaJS v2 project (API, services, DB)
│   ├── .env.template
│   ├── .oas/       # API documentations (Swagger)
│   ├── emails/     # EJS Email templates
│   ├── src/ 
│   └── package.json
│
├── dashboard/      # Admin dashboard (Vite + React + TS)
│   ├── vite.config.mts
│   ├── src/
│   └── package.json
│
├── storefront/     # Next.js storefront example
│   ├── .env.template
│   ├── pages/
│   └── package.json
│
└── README.md       # Developer guide (this file)
```

---
## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/en/) (v20 or later)
* [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))
* [PostgreSQL](https://www.postgresql.org/)

---

## 🚀 Getting Started

You can use either **npm** or **yarn** to work with this repo.

* For **npm**, Medusa commands are run using `npx medusa ...`
* For **yarn**, you can run Medusa commands directly: `yarn medusa ...`

To see all available Medusa commands:

```bash
npx medusa --help
```

---

## ⚙️ Backend (MedusaJS v2)

### 🔑 Environment Variables

* Template file: `backend/.env.template`
* Copy it to `.env` and update values as needed.

### 🔑 Setup

1. Install dependencies (**use legacy-peer-deps to avoid conflicts**):

   ```bash
   cd backend
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

2. Setup the database:

   ```bash
   npx medusa db:setup
   ```

   This runs all migrations and seed data.

3. Create an admin user:

   ```bash
   npx medusa user -e <email> -p <password>
   ```

4. Start Medusa in dev mode:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

### 📜 Available Scripts

```json
"build": "medusa build",
"seed": "medusa exec ./src/scripts/seed.ts",
"start": "medusa start",
"dev": "medusa develop",
"test:integration:http": "TEST_TYPE=integration:http NODE_OPTIONS=--experimental-vm-modules jest --silent=false --runInBand --forceExit",
"test:integration:modules": "TEST_TYPE=integration:modules NODE_OPTIONS=--experimental-vm-modules jest --silent=false --runInBand --forceExit",
"test:unit": "TEST_TYPE=unit NODE_OPTIONS=--experimental-vm-modules jest --silent --runInBand --forceExit"
```

---

## 📊 Dashboard (Admin UI)

### 🔑 Setup

```bash
cd dashboard
npm install
# or
yarn install
```

### 📜 Available Scripts

```json
"generate:static": "node ./scripts/generate-currencies.js && prettier --write ./src/lib/currencies.ts",
"dev": "vite",
"build": "tsup && node ./scripts/generate-types.js",
"build:preview": "vite build",
"preview": "vite preview",
"test": "vitest --run",
"i18n:validate": "node ./scripts/i18n/validate-translation.js",
"i18n:schema": "node ./scripts/i18n/generate-schema.js",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
```

### ⚙️ Configuration

* Vite config is in: `dashboard/vite.config.mts`

---

## 🛍️ Storefront (Next.js)

### 🔑 Setup

```bash
cd storefront
npm install
# or
yarn install
```

### 📜 Available Scripts

```json
"dev": "next dev --turbopack -p 8000",
"build": "next build",
"start": "next start -p 8000",
"lint": "next lint",
"analyze": "ANALYZE=true next build"
```

### 🔑 Environment Variables

* Template file: `storefront/.env.template`
* Copy it to `.env` and update values as needed.

---

## 📖 API Documentation

Unlike Vendure, Medusa doesn’t provide an API playground by default.
But you can generate **OpenAPI Spec** docs with:

```bash
npx medusa-oas oas --out-dir .oas --type store | admin | combined
```

This will create files inside `backend/.oas`:

* `store.oas.json`
* `admin.oas.json`
* `combined.oas.json`

### View in Swagger Editor

1. Go to [https://editor.swagger.io/](https://editor.swagger.io/)
2. Click **File > Import File**
3. Select one of the generated OAS JSON files (e.g. `admin.oas.json`) from `backend/.oas`.

---

## ✅ Quick Start Summary

1. **Backend**

   ```bash
   cd backend
   npm install --legacy-peer-deps
   npx medusa db:setup
   npx medusa user -e admin@test.com -p supersecret
   npm run dev
   ```

2. **Dashboard**

   ```bash
   cd dashboard
   npm install
   npm run dev
   ```

3. **Storefront**

   ```bash
   cd storefront
   npm install
   npm run dev
   ```

You should now have:

* Backend API running
* Admin Dashboard accessible
* Storefront serving the shop

---

### 📌 Notes

* Backend and Storefront both require `.env` files (`.env.template` is provided).
* Dashboard configuration is in `vite.config.mts`.
* Use `npx medusa --help` to explore Medusa commands.

---
