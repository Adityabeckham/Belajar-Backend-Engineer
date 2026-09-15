# 🚀 Panduan Belajar Mandiri & Challenge Sprint 1 - 8
## Subscription & API Gateway Backend (Node.js + Express.js)

Dokumen ini disusun sebagai **panduan praktis langkah-demi-langkah (step-by-step guide)** untuk menyelesaikan project backend *production-like* secara mandiri tanpa bergantung pada AI code generation. Gunakan panduan ini untuk menguji dan memperkuat *software engineering skills*, *database design*, *testing*, dan *system design*.

> [!TIP]
> **Catatan Setup Ringan (Tanpa Docker Desktop)**: Untuk menghemat ruang disk dan RAM laptop, database PostgreSQL di Sprint 2 menggunakan **Neon.tech (Cloud PostgreSQL Serverless)** dan Redis di Sprint 5 menggunakan **Upstash Redis / Cloud Redis**. Laptop Anda tetap 100% ringan, tidak memakan memori/disk berlebih, dan persis seperti arsitektur production!

---

## 💡 Strategi Belajar Self-Challenge (Tanpa AI)

1. **Gunakan Dokumentasi Resmi First**: Saat bingung dengan sintaks atau API, buka dokumentasi resmi (misal: [node-pg](https://node-postgres.com/), [Neon Docs](https://neon.tech/docs/introduction), [Express](https://expressjs.com/), [Zod](https://zod.dev/), [BullMQ](https://docs.bullmq.io/)).
2. **Pahami Error Log**: Jangan panik saat ada error. Baca *stack trace* dari baris paling atas untuk menemukan penyebab utama error.
3. **Siklus Belajar**: **Riset Konsep → Desain Schema/Fungsi → Koding Mandiri → Uji Endpoint (Postman/cURL) → Refactor & Commit**.
4. **Disiplin Branching**: Setiap Sprint dikerjakan di branch terpisah (misal `feature/sprint-2-postgresql`) dan di-merge melalui Pull Request ke `develop`/`main`.

---

## 📅 SPRINT 1 — Foundation & Express Setup *(Status: SELESAI ✅)*

- **Branch Git**: `1-sprint-1-nodejs-expressjs-project-foundation`
- **Fokus Utama**: Menyiapkan struktur Express, logging, environment validation, error handling, dan code quality.
- **Checklist Done**:
  - [x] Separasi `app.js` dan `server.js` + *graceful shutdown*.
  - [x] Structured logger (`pino` & `pino-http`).
  - [x] Environment validation (`Zod`).
  - [x] Health check endpoints (`/health` & `/ready`).
  - [x] Centralized error handler & 404 handler.
  - [x] ESLint 10 + Prettier code formatting.

--

## 📅 SPRINT 2 — PostgreSQL (Neon.tech Cloud), SQL & REST API (Raw Query & Repository Pattern)

- **Target Utama**: Menghubungkan aplikasi ke Cloud PostgreSQL (Neon.tech), membuat schema migration tanpa ORM (`pg` & `node-pg-migrate`), dan mengimplementasikan Repository Pattern & Database Transactions.
- **Branch Git**: `feature/sprint-2-postgresql`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Setup Managed PostgreSQL di Neon.tech**:
   - Buat akun gratis di [Neon.tech](https://neon.tech/).
   - Buat project baru bernama `subscription-api-db`.
   - Salin **Connection String** yang diberikan oleh Neon dashboard (format: `postgres://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`).
2. **Konfigurasi Environment Variable (`.env` & `src/config/env.js`)**:
   - Tambahkan `DATABASE_URL` ke `.env` dan `.env.example`.
   - Update Zod schema di `src/config/env.js` untuk menyertakan `DATABASE_URL: z.string().url()`.
3. **Setup Connection Pool (`src/config/database.js`)**:
   - Install package `pg` (`npm install pg`).
   - Buat instance `Pool` dari `pg` menggunakan `connectionString`:
     ```js
     const { Pool } = require("pg");
     const env = require("./env");

     const pool = new Pool({
       connectionString: env.DATABASE_URL,
       ssl: { rejectUnauthorized: false }, // Wajib untuk SSL koneksi Cloud Neon
     });

     module.exports = pool;
     ```
   - Tambahkan tes query awal (`SELECT NOW()`) di `src/server.js` saat server boot untuk memastikan koneksi ke Neon sukses.
4. **Setup Migration dengan `node-pg-migrate`**:
   - Install `node-pg-migrate` sebagai devDependency (`npm install -D node-pg-migrate`).
   - Tambahkan script migration di `package.json`:
     - `"migrate:create": "node-pg-migrate create"`
     - `"migrate:up": "node-pg-migrate up -m migrations"`
     - `"migrate:down": "node-pg-migrate down -m migrations"`
   - Buat file migration tabel pertama:
     - `users` (`id` UUID DEFAULT gen_random_uuid() PK, `email` VARCHAR UNIQUE NOT NULL, `password` VARCHAR NOT NULL, `name` VARCHAR, `role` VARCHAR DEFAULT 'user', `created_at`, `updated_at`).
     - `plans` (`id` UUID DEFAULT gen_random_uuid() PK, `name` VARCHAR NOT NULL, `price` DECIMAL NOT NULL, `duration_days` INT NOT NULL, `is_active` BOOLEAN DEFAULT true, `created_at`, `updated_at`).
     - `subscriptions` (`id` UUID DEFAULT gen_random_uuid() PK, `user_id` FK -> users, `plan_id` FK -> plans, `status` VARCHAR ('ACTIVE', 'EXPIRED', 'CANCELLED'), `start_date`, `end_date`, `created_at`, `updated_at`).
   - Jalankan migration: `npm run migrate:up`. Cek hasilnya di Dashboard Neon Console.
5. **Implementasikan Repository Layer (`src/repositories/`)**:
   - `user.repository.js`: Query SQL murni (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) menggunakan `pool.query()`.
   - `plan.repository.js`: Query SQL murni untuk CRUD paket langganan.
   - `subscription.repository.js`: Query SQL murni untuk transaksi langganan.
6. **Implementasikan Service & Controller Layer**:
   - `src/services/plan.service.js` & `src/controllers/plan.controller.js` (CRUD Paket).
   - `src/services/subscription.service.js` & `src/controllers/subscription.controller.js` (Create subscription, cancel, list active).
7. **Gunakan Transaction untuk Operasi Multi-Query**:
   - Saat user membuat subscription baru, dapatkan client dari pool (`const client = await pool.connect()`), panggil `await client.query('BEGIN')`, periksa status user & plan, insert subscription baru, lalu `await client.query('COMMIT')` (atau `ROLLBACK` di blok `catch`). Selalu panggil `client.release()` di blok `finally`.

### 🧠 Konsep Penting yang Harus Dikuasai:
- Parameterized Queries di `pg` (`$1`, `$2`) untuk mencegah SQL Injection.
- Connection Pooling vs Single Connection.
- Database Migration & Rollback.
- ACID Transaction (`BEGIN`, `COMMIT`, `ROLLBACK`) & Client Release.
- Repository Pattern vs Active Record.

### 🧪 Cara Pengujian:
- Verifikasi koneksi Neon saat `npm run dev`.
- Jalankan `npm run migrate:up` dan pastikan tabel muncul di Neon SQL Editor / Dashboard.
- Uji endpoint `/api/v1/plans` dan `/api/v1/subscriptions` via Postman/cURL.

---

## 📅 SPRINT 3 — Authentication & Authorization (JWT & Password Hashing)

- **Target Utama**: Menambahkan sistem pendaftaran (register), login aman dengan bcrypt, proteksi endpoint dengan JSON Web Token (JWT), dan Role-Based Access Control (RBAC).
- **Branch Git**: `feature/sprint-3-auth`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Install Library Auth**:
   - Install `bcrypt` (atau `bcryptjs`) dan `jsonwebtoken`.
2. **Setup Password Hashing (`src/utils/password.js`)**:
   - Buat helper `hashPassword(password)` dengan salt rounds 10.
   - Buat helper `comparePassword(plainText, hash)` untuk validasi login.
3. **Setup Token Service (`src/utils/jwt.js`)**:
   - Tambahkan `JWT_SECRET` dan `JWT_EXPIRES_IN` di `.env` dan `src/config/env.js`.
   - Buat fungsi `generateToken(payload)` dan `verifyToken(token)`.
4. **Endpoint Register & Login**:
   - `POST /api/v1/auth/register`: Validasi body (Zod), pastikan email unik, hash password, simpan user ke database Neon, kembalikan user data (tanpa password!).
   - `POST /api/v1/auth/login`: Validasi body, cari user berdasar email, bandingkan password hash. Jika cocok, kembalikan JWT Token.
5. **Middleware Authentication (`src/middlewares/auth.middleware.js`)**:
   - Ekstrak token dari header `Authorization: Bearer <token>`.
   - Verifikasi token dengan `jwt.verify()`. Jika valid, tempel `req.user = decodedPayload` dan panggil `next()`.
6. **Middleware Authorization / RBAC (`src/middlewares/role.middleware.js`)**:
   - Buat middleware `requireRole('admin')` yang memeriksa `req.user.role === 'admin'`. Jika bukan admin, kembalikan HTTP 403 Forbidden.
7. **Endpoint `/me` dan Proteksi Route**:
   - `GET /api/v1/auth/me`: Mengembalikan profil user yang sedang login (`req.user`).
   - Proteksi route sensitif seperti `POST /api/v1/plans` khusus untuk role `admin`.

### 🧠 Konsep Penting yang Harus Dikuasai:
- Hashing vs Encryption (kenapa bcrypt butuh salt).
- Anatomi JWT (Header, Payload, Signature).
- Stateless Authentication vs Session-based.
- Authentication (Siapa Anda?) vs Authorization (Boleh tidak melakukan X?).

### 🧪 Cara Pengujian:
- Coba registrasi user baru via Postman.
- Coba login dan dapatkan JWT token.
- Panggil `GET /api/v1/auth/me` tanpa header token (harus 401 Unauthorized).
- Panggil `POST /api/v1/plans` menggunakan token user biasa (harus 403 Forbidden).

---

## 📅 SPRINT 4 — Automated Testing & Code Quality (Jest & Supertest)

- **Target Utama**: Membuktikan backend stabil dengan membuat Unit Testing untuk Service Layer dan Integration/API Testing untuk HTTP Endpoints.
- **Branch Git**: `feature/sprint-4-testing`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Setup Jest & Supertest**:
   - Install `jest` dan `supertest` sebagai devDependencies.
   - Buat `jest.config.js` (`testEnvironment: 'node'`, `coverageDirectory: 'coverage'`).
   - Tambahkan script di `package.json` (`"test"`, `"test:watch"`, `"test:coverage"`).
2. **Setup Test Isolation**:
   - Untuk Unit Test: Mock repository layer menggunakan Jest mock (`jest.fn()`) tanpa perlu menyentuh database Neon.
   - Untuk Integration Test: Gunakan Neon branch terpisah atau mock `pool.query` untuk pengujian HTTP endpoint secara cepat.
3. **Tulis Unit Tests (`tests/unit/`)**:
   - Tes `auth.service.test.js`: Success case register, duplicate email error case, wrong password login error case.
   - Tes `subscription.service.test.js`: Calculation expiry date, plan non-active case.
4. **Tulis Integration Tests (`tests/integration/`)**:
   - Menggunakan `supertest(app)` untuk menembak endpoint HTTP asli.
   - Tes flow register → login → dapat token → panggil protected endpoint.
   - Tes error handling (400 Bad Request untuk Zod invalid body, 401 Unauthenticated, 404 Not Found).
5. **Setup Lint & Format Check di Script Test**:
   - Update script `"test"` agar menjalankan `npm run lint` dan `jest`.

### 🧠 Konsep Penting yang Harus Dikuasai:
- Unit Test vs Integration Test vs E2E Test.
- Mocking, Stubs, & Spies.
- Test Isolation (memastikan tes tidak saling mempengaruhi).
- Code Coverage (Line, Branch, Function Coverage).

---

## 📅 SPRINT 5 — Redis Caching (Upstash Cloud / Local Redis), API Key & Rate Limiting

- **Target Utama**: Meningkatkan performa baca dengan Caching Redis, serta melindungi API dari serangan abuse dengan API Key dan Rate Limiting.
- **Branch Git**: `feature/sprint-5-redis-rate-limit`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Setup Redis Client (Upstash Redis Cloud - Ringan 0 MB Laptop)**:
   - Buat database Redis gratis di [Upstash.com](https://upstash.com/).
   - Dapatkan Connection URL (`REDIS_URL=rediss://default:password@xyz.upstash.io:6379`).
   - Install `ioredis` dan buat file `src/config/redis.js`.
2. **Implementasikan Caching Strategy (Cache-Aside Pattern)**:
   - Buat `GET /api/v1/plans`: Cek data di Redis cache lebih dahulu. Jika ada (*cache hit*), kembalikan dari Redis. Jika tidak ada (*cache miss*), query ke PostgreSQL Neon, simpan di Redis dengan TTL (misal 1 jam), lalu kembalikan data.
   - Implementasikan *Cache Invalidation*: Ketika Admin mengupdate/menghapus plan via `PUT /api/v1/plans/:id`, hapus key cache di Redis.
3. **Fitur API Key Authentication**:
   - Buat tabel `api_keys` di database (`id`, `user_id`, `key_hash`, `name`, `status`, `expires_at`).
   - Buat endpoint `POST /api/v1/api-keys` untuk meng-generate API Key acak (misal `sk_live_...`). Simpan versi hash-nya di database.
   - Buat middleware `apiKey.middleware.js` untuk memeriksa header `X-API-Key`.
4. **Implementasikan Rate Limiting dengan Redis**:
   - Buat middleware `rateLimiter.middleware.js` menggunakan sliding window di Redis (misal max 100 request / 15 menit per API Key atau IP).
   - Jika limit terlampaui, kembalikan HTTP `429 Too Many Requests` dengan header `Retry-After`.
5. **Graceful Degradation (Fallback jika Redis Down)**:
   - Bungkus pemanggilan Redis dengan `try-catch`. Jika Redis mengalami gangguan, log error dan biarkan request lanjut query ke PostgreSQL tanpa membuat server crash.

---

## 📅 SPRINT 6 — Background Jobs, Webhooks & External API

- **Target Utama**: Memahami Pemrosesan Asinkron (Asynchronous Background Job) menggunakan BullMQ & Redis, serta menangani Integrasi Webhook Eksternal secara Idempotent.
- **Branch Git**: `feature/sprint-6-queue-webhook`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Install BullMQ & Setup Queue**:
   - Install `bullmq`.
   - Buat modul queue `src/jobs/queues/email.queue.js` dan `subscription.queue.js`.
2. **Pisahkan Worker Process (`src/jobs/workers/`)**:
   - Buat worker terpisah untuk memproses job di background (misal: mengirim email konfirmasi langganan atau memeriksa langganan yang akan kedaluwarsa).
   - Tambahkan fitur automatic retry (exponential backoff) dan dead-letter queue / failed job handler.
3. **Simulasi Payment Provider Webhook**:
   - Buat endpoint `POST /webhooks/payment`.
   - Tambahkan Signature Verification (HMAC SHA-256) menggunakan secret key untuk memastikan request benar-benar berasal dari Payment Gateway.
4. **Implementasikan Idempotency**:
   - Buat tabel `webhook_events` atau simpan `event_id` di Redis.
   - Saat webhook masuk, cek apakah `event_id` transaksi sudah pernah diproses. Jika sudah, kembalikan HTTP `200 OK` tanpa memproses ulang transaksi.
   - Jika belum diproses, update status subscription dan masukkan job kirim email ke BullMQ queue.

---

## 📅 SPRINT 7 — Deployment & CI/CD Pipeline (GitHub Actions & Railway/Render)

- **Target Utama**: Membangun pipeline CI/CD otomatis menuju platform cloud (Railway/Render) menggunakan managed database Neon & Upstash yang sudah siap.
- **Branch Git**: `feature/sprint-7-deployment`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Setup GitHub Actions CI Workflow (`.github/workflows/ci.yml`)**:
   - Trigger workflow pada event `push` dan `pull_request` ke branch `main` atau `develop`.
   - Job steps: Checkout code → Setup Node.js → Install dependencies → Run Linter (`npm run lint`) → Run Tests (`npm test`) → Build Check.
2. **Deployment ke Cloud (Railway / Render)**:
   - Hubungkan repository GitHub dengan Railway/Render.
   - Set environment variables production (`DATABASE_URL` Neon, `REDIS_URL` Upstash, `JWT_SECRET`) di dashboard cloud.
   - Pastikan database migration otomatis berjalan saat proses deployment (`npm run migrate:up`).

---

## 📅 SPRINT 8 — Production Hardening, Monitoring & Interview Readiness

- **Target Utama**: Menjadikan project portfolio yang siap diuji secara teknis dan dipresentasikan saat interview backend engineer.
- **Branch Git**: `feature/sprint-8-monitoring-portfolio`

### 🛠️ Langkah-Langkah Eksekusi:
1. **Request Correlation ID Middleware**:
   - Tambahkan middleware yang menempelkan `x-request-id` (UUID) pada setiap request HTTP untuk mempermudah penelusuran log (*distributed tracing*).
2. **Document API dengan Swagger / OpenAPI**:
   - Install `swagger-ui-express` dan `yamljs` (atau `zod-to-openapi`).
   - Buat file spesifikasi OpenAPI `docs/openapi.yaml` untuk seluruh endpoint.
   - Serve swagger UI di route `/docs`.
3. **Database Schema & ERD Documentation**:
   - Dokumentasikan Entity Relationship Diagram (ERD) database PostgreSQL dalam format Mermaid atau diagram gambar di folder `docs/`.
4. **Penyusunan Portfolio README.md**:
   - Tulis README lengkap yang mencakup Architecture Diagram, Problem Statement, Tech Stack Trade-offs, dan API Documentation link.
5. **Simulasi Technical Interview Pitch**:
   - Latihan menjelaskan project dalam 3 menit dan menjawab pertanyaan seputar Database Connection Pool, Transaction Locking, Rate Limiting, dan Webhook Idempotency.

---

## 🏆 Checklist Akhir Sebelum Melamar Internship

- [ ] Repository GitHub tertata rapi dengan commit history yang jelas.
- [ ] Pull Requests (PR) untuk setiap Sprint sudah di-merge ke branch `main`.
- [ ] API terdeploy dan dapat diakses publik di Cloud (Railway/Render).
- [ ] Seluruh pengujian otomatis (`npm test`) hijau/pass di GitHub Actions.
- [ ] README.md tampil profesional seperti project tim engineer sungguhan.

**Selamat Berjuang & Selamat Belajar Mandiri dengan Setup Cloud Neon Ringan! 🚀**
