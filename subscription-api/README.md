# Subscription & API Gateway Backend - `subscription-api`

Backend REST API untuk pengelolaan Subscription dan API Gateway built with **Node.js**, **Express.js**, **PostgreSQL**, dan **Redis**.

Project ini dibangun secara bertahap mengikuti **Roadmap Persiapan Internship Backend Engineer (8 Sprint)**.

---

## 🚀 Sprint 1: Node.js, Express.js & Project Foundation

### Feature List (Sprint 1)

- [x] Separasi aplikasi (`app.js`) dan bootstrap server (`server.js`).
- [x] Environment variable configuration dengan Zod fail-fast validation (`src/config/env.js`).
- [x] Health Check Endpoints:
  - `GET /health` — Status kesehatan server dasar & uptime.
  - `GET /ready` — Readiness probe server.
- [x] Middlewares dasar:
  - Security Headers (`helmet`)
  - CORS Policy (`cors`)
  - HTTP Structured Logging (`pino-http`)
  - Centralized Error Handler (`src/middlewares/error-handler.js`)
  - 404 Route Not Found Handler (`src/middlewares/not-found.js`)
- [x] Code Quality setup dengan ESLint & Prettier.

---

## 📁 Folder Structure

```text
subscription-api/
├── src/
│   ├── config/          # Centralized configuration (env, db, redis)
│   ├── controllers/     # Request handlers & HTTP responses
│   ├── jobs/            # Background workers (BullMQ)
│   ├── middlewares/     # Custom Express middlewares
│   ├── repositories/    # Database query layer
│   ├── routes/          # API route definition modules
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic layer
│   ├── utils/           # Helper utilities (logger, error classes)
│   ├── app.js           # Express app initialization
│   └── server.js        # Server bootstrap & process lifecycle
├── docs/                # API documentation & diagrams
├── migrations/          # Database migrations
├── .env.example         # Environment template
├── .eslintrc.json       # ESLint rules
├── .prettierrc          # Prettier code formatting rules
├── package.json
└── README.md
```

---

## 🛠️ Cara Menjalankan Project

### 1. Prasyarat

- Node.js (v18+ LTS)
- npm / yarn

### 2. Setup Environment Variables

Salin file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Menjalankan Server

Mode Development (auto reload via nodemon):

```bash
npm run dev
```

Mode Production:

```bash
npm start
```

---

## 🧪 Code Quality & Script Commands

```bash
# Cek linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code dengan Prettier
npm run format

# Cek format tanpa mengubah file
npm run format:check
```

---

## 📡 API Endpoints (Sprint 1)

| Method | Endpoint  | Description     | Success Response                                                  |
| ------ | --------- | --------------- | ----------------------------------------------------------------- |
| `GET`  | `/health` | Health probe    | `200 OK` `{ "status": "UP", "uptime": 12.3, "timestamp": "..." }` |
| `GET`  | `/ready`  | Readiness probe | `200 OK` `{ "status": "READY", "checks": { "server": "OK" } }`    |

---

## 📌 Development Roadmap

- **Sprint 1**: Foundation & Express Setup _(Selesai)_
- **Sprint 2**: PostgreSQL, SQL & REST API _(Next)_
- **Sprint 3**: Authentication & Authorization
- **Sprint 4**: Testing & Code Quality
- **Sprint 5**: Redis, API Key & Rate Limiting
- **Sprint 6**: Background Job, Webhook & External API
- **Sprint 7**: Docker, CI/CD & Deployment
- **Sprint 8**: Monitoring, Security, Documentation & Portfolio
