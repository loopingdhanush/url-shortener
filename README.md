# High-Performance Asynchronous URL Shortener & Analytics Platform

A high-performance, enterprise-ready, asynchronous URL Shortener and Analytics platform built as a TypeScript monorepo using **Turborepo** and **pnpm**. 

The system features ultra-fast redirection leveraging **Redis caching**, asynchronous analytics job processing using **BullMQ**, robust authentication via **Better Auth**, and type-safe database access with **Prisma & PostgreSQL**.

---

## 🏗️ Monorepo Architecture

```
url-shortener/
├── apps/
│   ├── backend/             # Express 5 API Server & BullMQ Worker
│   └── frontend/            # React 19 + Vite SPA
├── packages/
│   ├── database/            # Prisma Schema, Database Client & Migrations (@repo/database)
│   ├── redis/               # Redis Client, Cache Abstraction & Keys (@repo/redis)
│   └── shared/              # Shared Types and Utilities (@repo/shared)
├── docker-compose.yml       # Infrastructure (PostgreSQL 17 & Redis 7)
├── package.json             # Root workspace configuration & scripts
├── pnpm-workspace.yaml      # Workspace packages definition
└── turbo.json               # Turborepo task pipeline configuration
```

---

## 🚀 Key Features

* **Ultra-Fast Redirection**: `GET /:slug` redirects requests with minimal latency using Redis cache lookup.
* **Asynchronous Analytics Pipeline**: High-throughput click recording using **BullMQ** background queues and dedicated worker threads (concurrency 25) to prevent HTTP response blockages.
* **User Agent & Metadata Parsing**: Captures browser, operating system, device type (`ua-parser-js`), IP address, referrer, and click timestamps.
* **Custom Aliases & Expiration**: Allows custom short code aliases and expiration timestamps (`expiresAt`).
* **Soft Deletion**: Implements `deletedAt` soft deletes for URLs and automated cache purging upon update/deletion.
* **Authentication**: Multi-provider authentication (Email/Password & Google OAuth) managed by **Better Auth** with Prisma session adapter.
* **Security & Reliability**: Rate limiting (`express-rate-limit`), security headers (`helmet`), environment schema validation (`zod`), structured logging (`pino`), and unified error handling.

---

## 🛠️ Tech Stack

### Core Technologies
* **Language**: TypeScript (`ESNext`)
* **Monorepo Manager**: Turborepo
* **Package Manager**: `pnpm` (Workspace mode)

### Backend (`apps/backend`)
* **Framework**: Express 5 (Node.js ESM)
* **Authentication**: Better Auth (`better-auth`)
* **Queue System**: BullMQ
* **Validation**: Zod
* **Logger**: Pino & Pino Pretty
* **Parsing**: UA-Parser-JS (`ua-parser-js`)

### Frontend (`apps/frontend`)
* **Framework**: React 19
* **Build Tool**: Vite

### Database & Storage (`packages/database` & `packages/redis`)
* **Database**: PostgreSQL 17
* **ORM**: Prisma ORM
* **Caching & Queue Store**: Redis 7 & `ioredis`

---

## 📊 Database Schema Summary

The database uses PostgreSQL managed via Prisma (`packages/database/prisma/schema.prisma`):

* **`User`**: Manages user profiles, emails, verification state, and relations to sessions, accounts, and created URLs.
* **`Session` & `Account`**: Stores auth session tokens and third-party OAuth provider credentials.
* **`Url`**: Represents shortened URLs:
  * `shortCode`: Unique randomly generated slug.
  * `customAlias`: Optional unique user-defined slug.
  * `originalUrl`: Target redirection destination URL.
  * `expiresAt`: Optional expiration date.
  * `isActive`: Soft toggle status flag.
  * `deletedAt`: Timestamp for soft deletion.
* **`ClickEvent`**: Captures analytics per click event (`urlId`, `browser`, `device`, `operatingSystem`, `referrer`, `ipAddress`, `createdAt`).

---

## 🚦 Getting Started

### Prerequisites
* **Node.js**: `v20+` or `v22+`
* **pnpm**: `v10+` or `v11+` (`npm install -g pnpm`)
* **Docker & Docker Compose** (for PostgreSQL and Redis)

---

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install workspace dependencies**:
   ```bash
   pnpm install
   ```

3. **Start Infrastructure Containers (PostgreSQL & Redis)**:
   ```bash
   docker-compose up -d
   ```

4. **Environment Configuration**:
   Create a `.env` file in `apps/backend` and `packages/database`:

   **`apps/backend/.env`**:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/urlshortener?schema=public"
   REDIS_URL="redis://localhost:6379"
   SHORT_CODE_LENGTH=7
   BETTER_AUTH_SECRET="your-better-auth-secret"
   BETTER_AUTH_URL="http://localhost:5000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

   **`packages/database/.env`**:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/urlshortener?schema=public"
   ```

5. **Generate Prisma Client & Run Database Migrations**:
   ```bash
   pnpm --filter @repo/database exec prisma migrate dev
   ```

---

## 🏃 Running the Application

### Concurrent Development Mode (Turborepo)
To run all apps and packages in development mode:
```bash
pnpm dev
```

### Running Backend API Server & Analytics Worker Separately

1. **Start Backend API Server**:
   ```bash
   cd apps/backend
   pnpm dev
   ```

2. **Start Background Analytics Worker**:
   ```bash
   cd apps/backend
   pnpm worker
   ```

3. **Start Prisma Studio (Optional DB GUI)**:
   ```bash
   pnpm --filter @repo/database exec prisma studio
   ```

---

## ⚡ API Endpoints Reference

### Public / Redirection Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/:slug` | Resolves short code/alias and performs HTTP 302 redirect. Enqueues analytics job. |
| `GET` | `/api/health` | System health check endpoint. |

### Auth Endpoints (`/api/auth/*`)
Handled automatically by **Better Auth** (`/api/auth/sign-in`, `/api/auth/sign-up`, `/api/auth/sign-out`, Google OAuth, etc.).

### URL Management Endpoints (`/api/url/*`) *(Requires Authentication)*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/url` | Create a shortened URL (supports custom alias & expiration). |
| `GET` | `/api/url` | Retrieve all active URLs belonging to the authenticated user. |
| `GET` | `/api/url/:id` | Fetch specific URL details by ID. |
| `PATCH` | `/api/url/:id` | Update target URL, alias, or expiration. Invalidates cache. |
| `DELETE` | `/api/url/:id` | Soft delete URL (`deletedAt` & `isActive: false`). Invalidates cache. |

---

## 📜 Available Workspace Scripts

* `pnpm dev`: Runs development servers across all packages/apps concurrently.
* `pnpm build`: Builds production packages and applications via Turborepo.
* `pnpm lint`: Runs ESLint checks across workspace projects.
* `pnpm worker`: Launches the BullMQ analytics background worker script (`apps/backend`).
