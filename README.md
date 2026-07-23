# Internship Applicant Management API

<p align="center">
  <strong>Backend Internship Practical Challenge</strong><br>
  INFNOVA Technologies
</p>

<p align="center">
  A secure REST API for managing internship applicants through an administrator dashboard backend.
</p>

<h2 align="center">📸 Project Screenshots</h2>

<p align="center"> <a href="screenshot.md"> <strong>👉 View Project Screenshots</strong> </a> 
</p>

---

## 📑 Table of Contents

* [📌 Overview](#-overview)
* [✨ Features](#-features)
* [🛠️ Technology Stack](#️-technology-stack)
* [📂 Project Structure and Architecture](#-project-structure)
* [2️⃣ Install Dependencies and set up the project](#2️⃣-install-dependencies)
* [⚙️ Environment Configuration](#️-environment-configuration)
* [🗃️ Database](#️-database)
* [🔄 Prisma Setup](#-prisma-setup)
* [🌱 Database Seeding](#-database-seeding)
* [▶️ Running the Application](#️-running-the-application)
* [📚 API Documentation](#-api-documentation)
* [🔮 Future Improvements](#-future-improvements)
* [📌 Assumptions and Known Limitations](#-assumptions-and-known-limitations)
* [👨‍💻 Author](#-author)

---

## 📌 Overview

The **Internship Applicant Management API** is a backend application built with **NestJS and TypeScript**.

The API allows authenticated administrators to:

* Manage internship applicants
* Search and filter applications
* Update applicant statuses
* Add internal notes
* Soft-delete applicants
* View dashboard statistics
* Authenticate using JWT bearer tokens

This project was developed as part of the **INFNOVA Technologies Backend Internship Practical Challenge**.

---

---

## 🔗 Resources

| Resource | URL                          |
| -------- | ---------------------------- |
| API      | `http://localhost:3000/api`  |
| Swagger  | `http://localhost:3000/docs` |

---

## ✨ Features

*  Administrator authentication using JWT bearer tokens
*  Secure password hashing with bcrypt
*  Protected routes using NestJS Guards and Passport JWT
*  Applicant CRUD operations
*  Soft deletion of applicants
*  Paginated applicant listing
*  Search by applicant name or email
*  Filter by application status and internship track
* ↕ Sort applicants
*  Update applicant status
*  Add and update internal notes
*  Dashboard summary statistics
*  DTO-based request validation
*  Centralized HTTP exception handling
*  Swagger/OpenAPI documentation
*  Prisma ORM with SQLite
*  Database migrations
*  Database seed data
*  Environment-based configuration
*  Automated testing

---

## 🛠️ Technology Stack

| Technology                                                      | Purpose                 |
| --------------------------------------------------------------- | ----------------------- |
| [NestJS](https://nestjs.com/)                                   | Backend framework       |
| [TypeScript](https://www.typescriptlang.org/)                   | Programming language    |
| [Prisma](https://www.prisma.io/)                                | ORM and database access |
| [SQLite](https://www.sqlite.org/)                               | Relational database     |
| [JWT](https://jwt.io/)                                          | Authentication          |
| [Passport](https://www.passportjs.org/)                         | Authentication strategy |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                  | Password hashing        |
| [class-validator](https://github.com/typestack/class-validator) | Request validation      |
| [Swagger](https://swagger.io/)                                  | API documentation       |
| [Jest](https://jestjs.io/)                                      | Testing                 |

---

## 📂 Project Structure

```text
backend/
│
├── src/
│   │
│   ├── applicants/
│   │   ├── dto/
│   │   │   ├──applicant-query.dto.ts
│   │   │   ├── create-applicant.dto.ts
│   │   │   ├── update-applicant.dto.ts
│   │   │   ├── update-status.dto.ts
│   │   │   └── update-notes.dto.ts
│   │   ├── applicants.controller.spec.ts
│   │   ├── applicants.controller.ts
│   │   ├── applicants.service.ts
│   │   ├── applicants.service.spec.ts
│   │   └── applicants.module.ts
│   │
│   ├── auth/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   │
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   │
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   │
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── dashboard/
│   │   ├── dashboard.controller.spec.ts
│   │   ├── dashboard.controller.ts
│   │   ├── dashboard.service.spec.ts
│   │   ├── dashboard.service.ts
│   │   └── dashboard.module.ts
│   │
│   ├── common/
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.spec.ts
│   │   └── prisma.service.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── prisma/
│   ├── migrations/
│   │   ├── 20260719152000_init/
│   │         ├── migration.sql
│   │    ├── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
│
├── prisma.config.ts
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🏗️ Architecture

The application follows a **modular NestJS architecture**.

```text
                    ┌──────────────────────┐
                    │       Client         │
                    │  Swagger / Postman   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Controllers      │
                    │  HTTP Request/Response│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Guards         │
                    │   JWT Authentication  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Services       │
                    │    Business Logic    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    PrismaService     │
                    │    Database Access   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │        SQLite        │
                    │       dev.db         │
                    └──────────────────────┘
```

### Responsibilities

| Layer             | Responsibility                      |
| ----------------- | ----------------------------------- |
| **Controller**    | Handles HTTP requests and responses |
| **Guard**         | Protects authenticated routes       |
| **Strategy**      | Validates JWT tokens                |
| **Service**       | Contains business logic             |
| **DTO**           | Validates incoming data             |
| **PrismaService** | Communicates with the database      |
| **Filter**        | Provides consistent error responses |
| **Module**        | Organizes related functionality     |

Business logic is kept inside services rather than controllers to improve maintainability and testability.

---


## 1️⃣ Clone the Repository

```bash
git clone https://github.com/TOT8894/INFNOVA-Internship-Applicant-Management-API.git
```

Navigate into the backend project:

```bash
cd backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

ACCESS_KEY=your-access-token-secret
ACCESS_EXPIRE_DATE=15m

REFRESH_KEY=your-refresh-token-secret
REFRESH_EXPIRE_DATE=7d

PORT=3000
```


---

# 🗃️ Database

This project uses **Prisma ORM with SQLite**.

```text
NestJS Application
        │
        ▼
      Prisma
        │
        ▼
      SQLite
        │
        ▼
     dev.db
```

SQLite stores the database locally in:

```text
dev.db
```

# 🔄 Prisma Setup

## Generate Prisma Client

```bash
npx prisma generate
```

The client is generated from:

```text
prisma/schema.prisma
```

Example Prisma operations:

```typescript
prisma.applicant.findMany()
prisma.applicant.findUnique()
prisma.applicant.create()
prisma.applicant.update()
prisma.applicant.delete()
```

---

## Create a database
create dev.db file

## Reset the Database

```bash
npx prisma migrate reset
```

This will:

1. Delete the existing local database
2. Recreate the database
3. Apply all migrations
4. Run the configured seed command

> ⚠️ This deletes existing local database data.

---

## Open Prisma Studio

```bash
npx prisma studio
```

Prisma Studio provides a graphical interface for viewing and managing database records.

---

# 🌱 Database Seeding

The seed file is located at:

```text
prisma/seed.ts
```

Run the seed command:

```bash
npx prisma db seed
```
Run the command to push seed data to dev.db
```bash
npx prisma db pull
```
The administrator credentials are read from:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
```

---

# ▶️ Running the Application

## Development

```bash
npm run start:dev
```

The API will run at:

```text
http://localhost:3000/api
```

---

## Production

Build the application:

```bash
npm run build
```

Start the compiled application:

```bash
npm run start:prod
```


---

# 📚 API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/docs
```

Swagger allows you to:

* View API endpoints
* View request and response schemas
* Test API endpoints
* Authenticate using a JWT bearer token

---

# 🔐 Authentication

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

Use the access token in the request header:

```http
Authorization: Bearer <access-token>
```

Protected routes use JWT authentication guards.

Only authenticated administrators can access protected operations.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint          | Description               | Auth |
| ------ | ----------------- | ------------------------- | ---- |
| `POST` | `/api/auth/login` | Administrator login       | ❌    |
| `GET`  | `/api/auth/me`    | Get current administrator | ✅    |

---

## Applicants

| Method   | Endpoint                     | Description              | Auth |
| -------- | ---------------------------- | ------------------------ | ---- |
| `POST`   | `/api/applicants`            | Create applicant         | ✅    |
| `GET`    | `/api/applicants`            | Get paginated applicants | ✅    |
| `GET`    | `/api/applicants/:id`        | Get one applicant        | ✅    |
| `PATCH`  | `/api/applicants/:id`        | Update applicant         | ✅    |
| `DELETE` | `/api/applicants/:id`        | Soft-delete applicant    | ✅    |
| `PATCH`  | `/api/applicants/:id/status` | Update applicant status  | ✅    |
| `PATCH`  | `/api/applicants/:id/notes`  | Update internal notes    | ✅    |

---

## Dashboard

```http
GET /api/dashboard/summary
```

Example response:

```json
{
  "totalApplicant": 80,
  "applicantsGroupByStatus": [
    {
      "status": "ACCEPTED",
      "totalApplicants": 22
    },
    {
      "status": "PENDING",
      "totalApplicants": 25
    },
    {
      "status": "REJECTED",
      "totalApplicants": 8
    },
    {
      "status": "SHORTLISTED",
      "totalApplicants": 25
    }
  ],
  "applicantsGroupByTrack": [
    {
      "track": "BACKEND_DEVELOPMENT",
      "totalApplicants": 17
    },
    {
      "track": "DATA_ANALYTICS",
      "totalApplicants": 15
    },
    {
      "track": "FRONTEND_DEVELOPMENT",
      "totalApplicants": 17
    },
    {
      "track": "MOBILE_DEVELOPMENT",
      "totalApplicants": 16
    },
    {
      "track": "UI_UX_DESIGN",
      "totalApplicants": 15
    }
  ]
}
```

Soft-deleted applicants are excluded from the statistics.

---

# 📄 Pagination

Example:

```http
GET /api/applicants?page=1&limit=10
```

Example response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

Pagination prevents the API from loading all applicants at once.

---

# 🔍 Search

Search by applicant name or email:

```http
GET /api/applicants?search=shanbel
```

---

# 🏷️ Filtering

Filter by status:

```http
GET /api/applicants?status=SHORTLISTED
```

Filter by internship track:

```http
GET /api/applicants?track=BACKEND_DEVELOPMENT
```

---

# ↕️ Sorting

```http
GET /api/applicants?sortBy=createdAt&sortOrder=desc
```

Parameters can be combined:

```http
GET /api/applicants?search=shanbel&status=PENDING&page=1&limit=10
```

---

# 📊 Applicant Statuses

```text
PENDING
SHORTLISTED
ACCEPTED
REJECTED
```

### Business Rule

An applicant cannot move directly from:

```text
REJECTED ──────────────► ACCEPTED
```

---

# 💼 Internship Tracks

```text
FRONTEND_DEVELOPMENT
BACKEND_DEVELOPMENT
MOBILE_DEVELOPMENT
UI_UX_DESIGN
DATA_ANALYTICS
```

---

# 📝 Internal Notes

Notes are limited to:

```text
1,000 characters
```

Example:

```json
{
  "notes": "Strong backend fundamentals and good API design experience."
}
```

---

# 🗑️ Soft Deletion

Applicants are never permanently removed from the database.

Before deletion:

```text
deletedAt = null
```

After deletion:

```text
deletedAt = 2026-07-21T10:00:00.000Z
```

Normal queries exclude deleted applicants:

```typescript
where: {
  deletedAt: null,
}
```

This preserves historical data while hiding deleted applicants from normal operations.

---

# ✅ Validation

Global validation is configured in `main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

This provides:

* DTO validation
* Rejection of invalid input
* Rejection of unexpected properties
* Automatic transformation of request values

Example DTO:

```typescript
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
```

---

# ⚠️ Error Handling

The application uses a centralized HTTP exception filter.

Example response:

```json
{
  "statusCode": 404,
  "timestamp": "2026-07-21T10:00:00.000Z",
  "path": "/api/applicants/100",
  "message": "Applicant not found"
}
```

This provides a consistent error response format across the API.

---

# 🔒 Security

The application implements:

* Password hashing with bcrypt
* JWT access tokens
* JWT refresh tokens
* Bearer authentication
* Passport JWT strategy
* Protected routes using NestJS guards
* Environment-based secrets
* DTO validation
* Soft deletion
* No secrets committed to Git

---



# 🧠 Key Design Decisions

## Prisma + SQLite

Prisma was selected because it provides a strongly typed database layer and makes database queries easier to maintain.

SQLite was selected because:

* It requires no external database server
* It is easy to configure locally
* It is suitable for this practical challenge
* The project can later migrate to PostgreSQL or MySQL

---

## Modular NestJS Architecture

The project is divided into feature-based modules:

```text
Auth
Applicants
Dashboard
Prisma
```

Each feature can contain its own controllers, services, DTOs, and module configuration.

This makes the application easier to maintain and extend.

---

## Service-Based Business Logic

Controllers are responsible for HTTP communication.

Services contain business logic.

```text
Controller
    │
    ▼
Service
    │
    ▼
Prisma
    │
    ▼
Database
```

This prevents controllers from becoming too large and makes business logic easier to test.

---

## Soft Deletion

Applicants are soft-deleted instead of permanently removed.

This preserves historical data and prevents accidental permanent deletion.

---

## JWT Authentication

JWT bearer authentication was selected because it works well for stateless REST APIs.

The authentication flow is:

```text
Administrator
      │
      ▼
POST /auth/login
      │
      ▼
Validate email and password
      │
      ▼
Generate JWT access token
      │
      ▼
Client sends:
Authorization: Bearer <token>
      │
      ▼
JWT Guard
      │
      ▼
JWT Strategy validates token
      │
      ▼
Protected endpoint
```

---

# 🔮 Future Improvements

With more time, I would improve the project by adding:

* More comprehensive unit and integration tests
* Refresh token rotation and revocation
* Rate limiting for authentication endpoints
* Audit logs for administrator actions
* Structured application logging
* Role-based authorization
* Docker support
* PostgreSQL production configuration
* CI/CD pipeline
* More advanced dashboard analytics
* Improved API integration tests

---

# 📌 Assumptions and Known Limitations

* The system currently supports administrator authentication.
* SQLite is used for local development.
* All administrators currently have the same permission level.
* Refresh token rotation could be added for stronger production security.
* The API is designed as a backend REST API and does not include a frontend application.
* The local `dev.db` database file is intentionally excluded from version control.
* The database can be recreated using the Prisma schema, migrations, and seed script.

---



# 👨‍💻 Author

**Shanbel Dires**

Backend Internship Practical Challenge

INFNOVA Technologies

---

<p align="center">
  Built with NestJS, TypeScript, Prisma, and SQLite.
</p>
