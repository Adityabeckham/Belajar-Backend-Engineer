**ROADMAP PERSIAPAN INTERNSHIP BACKEND ENGINEER**

**Node.js + Express.js • Production-Like Backend Project • 8 Sprint**

Dokumen ini dibuat sebagai roadmap belajar dan project portfolio untuk mempersiapkan technical screening, take-home assessment, dan interview Internship Backend Engineer. Fokus utama menggunakan Node.js + Express.js karena stack tersebut sudah pernah digunakan, sehingga waktu belajar dapat diarahkan ke software engineering, database, testing, production practices, dan system design.

# 1\. Target Akhir

Membangun project bernama Subscription & API Gateway Backend yang bersifat production-like. Project tidak berhenti pada CRUD, tetapi mencakup authentication, authorization, PostgreSQL, Redis, API key, rate limiting, background job, webhook, testing, Docker, CI/CD, deployment, logging, monitoring dasar, dan dokumentasi API.

# 2\. Tech Stack

| Area                       | Teknologi               | Tujuan                             |
| -------------------------- | ----------------------- | ---------------------------------- |
| Runtime                    | Node.js                 | Menjalankan backend                |
| Framework                  | Express.js              | REST API dan middleware            |
| Language                   | JavaScript              | Implementasi backend               |
| Database                   | PostgreSQL              | Relational database                |
| DB Driver                  | pg                      | Koneksi dan query PostgreSQL       |
| Migration                  | node-pg-migrate         | Versioning schema database         |
| Validation                 | Zod                     | Validasi request                   |
| Authentication             | JWT + bcrypt            | Login dan proteksi endpoint        |
| Cache / Rate Limit / Queue | Redis                   | Caching, throttling, dan job queue |
| Queue                      | BullMQ                  | Background job                     |
| Testing                    | Jest + Supertest        | Unit dan integration/API test      |
| API Docs                   | Swagger / OpenAPI       | Dokumentasi endpoint               |
| Logging                    | Pino                    | Structured logging                 |
| Security                   | Helmet + CORS           | HTTP security dan policy           |
| Container                  | Docker + Docker Compose | Local production-like environment  |
| CI/CD                      | GitHub Actions          | Automated test, lint, build        |
| Deployment                 | Railway                 | Deploy API, PostgreSQL, Redis      |
| API Testing                | Postman                 | Manual API testing                 |
| Version Control            | Git + GitHub            | Branching, PR, code review         |

# 3\. Arsitektur Target

Client → Express API → Middleware → Controller → Service → Repository → PostgreSQL. Redis digunakan untuk cache dan rate limiting. BullMQ digunakan untuk background jobs. GitHub Actions menjalankan quality checks sebelum deployment ke Railway.

Struktur folder target:  
subscription-api/  
├── src/  
│ ├── config/  
│ ├── controllers/  
│ ├── middlewares/  
│ ├── routes/  
│ ├── services/  
│ ├── repositories/  
│ ├── schemas/  
│ ├── jobs/  
│ ├── utils/  
│ ├── app.js  
│ └── server.js  
├── migrations/  
├── tests/  
├── docs/  
├── Dockerfile  
├── docker-compose.yml  
├── package.json  
└── README.md

# 4\. Git Workflow

Gunakan main sebagai branch stabil dan develop sebagai branch integrasi. Setiap fitur dibuat melalui branch feature/\* atau bugfix/\* dan masuk melalui Pull Request.

Workflow: Issue → Branch → Development → Test → Commit → Pull Request → Self Code Review → Merge → Done.

Contoh branch: feature/auth, feature/subscription, feature/redis-cache, feature/rate-limit, feature/background-job, feature/ci-cd.

# SPRINT 1 — Node.js, Express.js & Project Foundation

Target: menyiapkan project backend dengan struktur profesional dan memahami alur request Express.

## Langkah-langkah

- Install/check Node.js LTS, Git, VS Code, Postman, Docker Desktop.
- Inisialisasi project: npm init -y.
- Install Express, dotenv, cors, helmet, pino/pino-http, zod, nodemon.
- Buat app.js dan server.js. Pisahkan konfigurasi dari bootstrap server.
- Buat GET /health dan GET /ready.
- Tambahkan centralized error handler dan 404 handler.
- Tambahkan environment variable melalui .env dan .env.example.
- Buat ESLint dan Prettier.
- Buat README berisi setup, scripts, architecture awal, dan cara menjalankan project.
- Commit dan push ke GitHub.

## Materi yang harus dipahami

- Node.js event loop
- Express middleware
- HTTP methods
- status code
- REST basics
- environment variables
- error handling
- logging
- Git branching

## Definition of Done

☐ Install/check Node.js LTS, Git, VS Code, Postman, Docker Desktop.

☐ Inisialisasi project: npm init -y.

☐ Install Express, dotenv, cors, helmet, pino/pino-http, zod, nodemon.

☐ Buat app.js dan server.js. Pisahkan konfigurasi dari bootstrap server.

☐ Buat GET /health dan GET /ready.

☐ Tambahkan centralized error handler dan 404 handler.

☐ Tambahkan environment variable melalui .env dan .env.example.

☐ Buat ESLint dan Prettier.

☐ Buat README berisi setup, scripts, architecture awal, dan cara menjalankan project.

☐ Commit dan push ke GitHub.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 2 — PostgreSQL, SQL & REST API

Target: membuat database relational dan API inti tanpa mengandalkan ORM agar SQL tetap dipahami.

## Langkah-langkah

- Jalankan PostgreSQL menggunakan Docker Compose.
- Buat database schema: users, plans, subscriptions.
- Gunakan node-pg untuk koneksi PostgreSQL dengan connection pool.
- Gunakan node-pg-migrate untuk migration dan rollback.
- Tentukan primary key, foreign key, unique constraint, not-null, dan index yang diperlukan.
- Implementasikan repository layer untuk query database.
- Buat CRUD users dan plans.
- Buat endpoint subscription: create, list, detail, cancel.
- Gunakan transaction untuk operasi yang membutuhkan beberapa query.
- Uji semua endpoint menggunakan Postman.

## Materi yang harus dipahami

- SQL SELECT/INSERT/UPDATE/DELETE
- JOIN
- index
- transaction
- connection pool
- migration
- repository pattern
- HTTP status codes

## Definition of Done

☐ Jalankan PostgreSQL menggunakan Docker Compose.

☐ Buat database schema: users, plans, subscriptions.

☐ Gunakan node-pg untuk koneksi PostgreSQL dengan connection pool.

☐ Gunakan node-pg-migrate untuk migration dan rollback.

☐ Tentukan primary key, foreign key, unique constraint, not-null, dan index yang diperlukan.

☐ Implementasikan repository layer untuk query database.

☐ Buat CRUD users dan plans.

☐ Buat endpoint subscription: create, list, detail, cancel.

☐ Gunakan transaction untuk operasi yang membutuhkan beberapa query.

☐ Uji semua endpoint menggunakan Postman.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 3 — Authentication & Authorization

Target: membuat sistem autentikasi yang aman dan endpoint terproteksi.

## Langkah-langkah

- Implementasikan POST /auth/register.
- Hash password menggunakan bcrypt.
- Implementasikan POST /auth/login.
- Generate JWT setelah login.
- Buat auth middleware untuk memvalidasi token.
- Buat GET /me.
- Tambahkan role user dan admin.
- Buat authorization middleware untuk endpoint admin.
- Validasi body menggunakan Zod.
- Tangani error seperti duplicate email, invalid credentials, expired token, dan forbidden access.

## Materi yang harus dipahami

- Password hashing
- JWT
- middleware
- authentication vs authorization
- RBAC
- input validation
- security basics

## Definition of Done

☐ Implementasikan POST /auth/register.

☐ Hash password menggunakan bcrypt.

☐ Implementasikan POST /auth/login.

☐ Generate JWT setelah login.

☐ Buat auth middleware untuk memvalidasi token.

☐ Buat GET /me.

☐ Tambahkan role user dan admin.

☐ Buat authorization middleware untuk endpoint admin.

☐ Validasi body menggunakan Zod.

☐ Tangani error seperti duplicate email, invalid credentials, expired token, dan forbidden access.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 4 — Testing & Code Quality

Target: membuktikan bahwa backend bukan hanya berjalan, tetapi dapat diuji dan dipelihara.

## Langkah-langkah

- Setup Jest dan Supertest.
- Buat unit test untuk service seperti registration, login, subscription, dan pricing.
- Buat API/integration test untuk register, login, protected route, dan subscription.
- Buat test untuk success case dan failure case.
- Gunakan database test terpisah atau environment test.
- Tambahkan lint dan format check.
- Tambahkan script npm test, npm run lint, dan npm run format:check.
- Review coverage dan fokus pada business logic penting.
- Buat checklist code review sederhana.

## Materi yang harus dipahami

- Unit test
- integration test
- mocking
- test isolation
- edge cases
- linting
- code review
- regression testing

## Definition of Done

☐ Setup Jest dan Supertest.

☐ Buat unit test untuk service seperti registration, login, subscription, dan pricing.

☐ Buat API/integration test untuk register, login, protected route, dan subscription.

☐ Buat test untuk success case dan failure case.

☐ Gunakan database test terpisah atau environment test.

☐ Tambahkan lint dan format check.

☐ Tambahkan script npm test, npm run lint, dan npm run format:check.

☐ Review coverage dan fokus pada business logic penting.

☐ Buat checklist code review sederhana.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 5 — Redis, API Key & Rate Limiting

Target: mengenal kebutuhan backend production seperti caching dan proteksi API abuse.

## Langkah-langkah

- Jalankan Redis dengan Docker Compose.
- Buat cache untuk GET /plans dengan TTL.
- Implementasikan cache invalidation ketika plan berubah.
- Buat API key generation dan storage yang aman.
- Buat endpoint create/list/revoke API key.
- Tambahkan middleware API key untuk /api/v1/\*.
- Implementasikan rate limiting menggunakan Redis.
- Gunakan response 429 ketika limit tercapai.
- Tangani kondisi Redis down agar API tidak crash.

## Materi yang harus dipahami

- Redis
- cache-aside
- TTL
- cache invalidation
- API key
- rate limiting
- 429 Too Many Requests
- graceful degradation

## Definition of Done

☐ Jalankan Redis dengan Docker Compose.

☐ Buat cache untuk GET /plans dengan TTL.

☐ Implementasikan cache invalidation ketika plan berubah.

☐ Buat API key generation dan storage yang aman.

☐ Buat endpoint create/list/revoke API key.

☐ Tambahkan middleware API key untuk /api/v1/\*.

☐ Implementasikan rate limiting menggunakan Redis.

☐ Gunakan response 429 ketika limit tercapai.

☐ Tangani kondisi Redis down agar API tidak crash.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 6 — Background Job, Webhook & External API

Target: memahami asynchronous processing dan integrasi sistem eksternal.

## Langkah-langkah

- Install BullMQ dan hubungkan dengan Redis.
- Buat worker untuk notification atau subscription processing.
- Pisahkan API process dan worker process.
- Tambahkan retry dan failed job handling.
- Buat simulasi payment provider.
- Implementasikan POST /webhooks/payment.
- Validasi signature webhook.
- Tangani event payment.success, payment.failed, dan payment.expired.
- Implementasikan idempotency agar webhook yang sama tidak memproses transaksi dua kali.
- Tambahkan logging untuk job dan webhook.

## Materi yang harus dipahami

- Queue
- worker
- retry
- dead/failed jobs
- webhook
- signature verification
- idempotency
- external API
- async processing

## Definition of Done

☐ Install BullMQ dan hubungkan dengan Redis.

☐ Buat worker untuk notification atau subscription processing.

☐ Pisahkan API process dan worker process.

☐ Tambahkan retry dan failed job handling.

☐ Buat simulasi payment provider.

☐ Implementasikan POST /webhooks/payment.

☐ Validasi signature webhook.

☐ Tangani event payment.success, payment.failed, dan payment.expired.

☐ Implementasikan idempotency agar webhook yang sama tidak memproses transaksi dua kali.

☐ Tambahkan logging untuk job dan webhook.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 7 — Docker, CI/CD & Deployment

Target: membuat project reproducible dan dapat dijalankan serta di-deploy dengan proses otomatis.

## Langkah-langkah

- Buat Dockerfile untuk Express API.
- Buat docker-compose.yml untuk API, PostgreSQL, dan Redis.
- Pastikan npm install/build/start berjalan di container.
- Gunakan environment variables untuk production configuration.
- Buat GitHub Actions workflow.
- Pipeline minimal: install → lint → test → build.
- Deploy API ke Railway.
- Deploy PostgreSQL dan Redis.
- Set production environment variables.
- Pastikan migration production berjalan dengan aman.
- Dokumentasikan deployment dan rollback dasar.

## Materi yang harus dipahami

- Docker
- Docker Compose
- CI/CD
- GitHub Actions
- deployment
- secrets
- production environment

## Definition of Done

☐ Buat Dockerfile untuk Express API.

☐ Buat docker-compose.yml untuk API, PostgreSQL, dan Redis.

☐ Pastikan npm install/build/start berjalan di container.

☐ Gunakan environment variables untuk production configuration.

☐ Buat GitHub Actions workflow.

☐ Pipeline minimal: install → lint → test → build.

☐ Deploy API ke Railway.

☐ Deploy PostgreSQL dan Redis.

☐ Set production environment variables.

☐ Pastikan migration production berjalan dengan aman.

☐ Dokumentasikan deployment dan rollback dasar.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# SPRINT 8 — Monitoring, Security, Documentation & Interview

Target: production hardening dan menjadikan project sebagai portfolio yang siap dibahas saat interview.

## Langkah-langkah

- Tambahkan structured logging menggunakan Pino.
- Buat /health dan /ready dengan dependency checks.
- Tambahkan request ID atau correlation ID.
- Review Helmet, CORS, validation, JWT, API key, rate limit, dan secret handling.
- Review SQL injection risk dengan parameterized query.
- Tambahkan Swagger/OpenAPI.
- Dokumentasikan architecture dan database ERD.
- Buat Postman collection.
- Buat README portfolio yang menjelaskan problem, architecture, trade-off, setup, testing, dan deployment.
- Lakukan simulated code review terhadap PR sendiri.
- Latihan menjelaskan project dalam 3–5 menit.
- Siapkan jawaban interview tentang REST API, SQL, authentication, caching, rate limiting, queue, testing, Docker, dan CI/CD.

## Materi yang harus dipahami

- Structured logging
- health/readiness
- security review
- OpenAPI
- documentation
- trade-offs
- system design basics
- technical interview

## Definition of Done

☐ Tambahkan structured logging menggunakan Pino.

☐ Buat /health dan /ready dengan dependency checks.

☐ Tambahkan request ID atau correlation ID.

☐ Review Helmet, CORS, validation, JWT, API key, rate limit, dan secret handling.

☐ Review SQL injection risk dengan parameterized query.

☐ Tambahkan Swagger/OpenAPI.

☐ Dokumentasikan architecture dan database ERD.

☐ Buat Postman collection.

☐ Buat README portfolio yang menjelaskan problem, architecture, trade-off, setup, testing, dan deployment.

☐ Lakukan simulated code review terhadap PR sendiri.

☐ Latihan menjelaskan project dalam 3–5 menit.

☐ Siapkan jawaban interview tentang REST API, SQL, authentication, caching, rate limiting, queue, testing, Docker, dan CI/CD.

## Output Sprint

Minimal satu atau beberapa Pull Request yang merepresentasikan pekerjaan sprint, ditambah update README/dokumentasi. Jangan hanya mengumpulkan semua perubahan dalam satu commit.

# 5\. Checklist Final Project

☐ REST API berjalan dan terdokumentasi

☐ PostgreSQL dengan migration

☐ Repository/service/controller separation

☐ Authentication JWT

☐ Password hashing

☐ Role-based authorization

☐ Request validation

☐ Centralized error handling

☐ Unit tests

☐ Integration/API tests

☐ Redis cache

☐ API key

☐ Rate limiting

☐ Background worker

☐ Queue dan retry

☐ Webhook verification

☐ Idempotency

☐ Docker dan Docker Compose

☐ GitHub Actions CI

☐ Railway deployment

☐ Structured logging

☐ Health/readiness endpoint

☐ Swagger/OpenAPI

☐ Postman collection

☐ README portfolio

☐ Database ERD

☐ GitHub Issues dan Pull Requests

# 6\. Target Skill untuk Technical Interview

**Node.js & Express:** event loop, async/await, middleware, error handling, routing, REST API, process/environment.

**JavaScript:** scope, closure, promise, async/await, destructuring, module system, error handling.

**PostgreSQL:** JOIN, index, transaction, constraints, normalization, connection pooling, query optimization dasar.

**API Design:** resource naming, status code, pagination, validation, authentication, authorization, idempotency.

**Redis:** cache, TTL, rate limiting, cache invalidation, failure handling.

**Testing:** unit vs integration test, mocking, test cases, regression testing.

**Security:** password hashing, JWT, SQL injection, CORS, Helmet, secrets, rate limiting, webhook signature.

**DevOps:** Docker, CI/CD, environment variables, deployment, logs, health checks.

**System Design dasar:** load, bottleneck, cache, queue, worker, horizontal scaling, database, failure scenario.

# 7\. Cara Belajar Setiap Hari

Gunakan siklus: Learn → Implement → Break → Debug → Test → Document → Explain. Jangan hanya mengikuti tutorial. Setelah memahami contoh, tutup tutorial dan implementasikan kembali dari ingatan. Setiap fitur harus memiliki alasan teknis yang dapat dijelaskan saat interview.

Rekomendasi waktu: 2–3 jam per hari. Senin untuk konsep, Selasa–Kamis implementasi, Jumat testing/refactor, Sabtu documentation/project review, Minggu review ringan atau istirahat.

# 8\. Target Portfolio & Narasi Interview

Narasi akhir yang dapat digunakan setelah project benar-benar selesai: "I built a production-like subscription and API gateway backend using Node.js, Express.js, PostgreSQL, and Redis. I implemented JWT authentication, API key authentication, rate limiting, background jobs, webhook handling, automated testing, Docker, CI/CD, and deployment. I also documented the API and used GitHub Pull Requests to simulate a team development workflow."

Catatan: jangan mengklaim fitur production jika belum benar-benar dibuat dan diuji. Saat interview, prioritaskan kemampuan menjelaskan trade-off dan alasan desain.

# 9\. Urutan Mulai

Mulai dari Sprint 1. Jangan melompat ke Redis, Docker, atau system design sebelum fondasi Express dan database kuat. Setelah setiap sprint selesai, lakukan review dan baru lanjut ke sprint berikutnya.