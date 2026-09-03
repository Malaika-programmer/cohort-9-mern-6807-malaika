# cohort-9-mern-6807-malaika
Cohort 9 — MERN (NodeJS+ReactJS) assignment for Malaika Azam

# MindPlanAI

<p align="center">
  <img src="./docs/images/mindplanai-banner.png" alt="MindPlanAI Banner" width="100%">
</p>

<p align="center">
  <strong>A modern full-stack productivity platform for organizing notes, managing tasks, and managing a personal workspace.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white" alt="React.js">
  <img src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/API-Express.js-000000?logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma">
</p>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Clone the Repositories](#clone-the-repositories)
- [Backend Installation](#backend-installation)
- [Database Setup](#database-setup)
- [Backend Environment Variables](#backend-environment-variables)
- [Frontend Installation](#frontend-installation)
- [Frontend Environment Variables](#frontend-environment-variables)
- [Run the Application](#run-the-application)
- [API Overview](#api-overview)
- [API Testing](#api-testing)
- [Authentication Flow](#authentication-flow)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Security](#security)
- [Development Guidelines](#development-guidelines)
- [Current Dashboard Scope](#current-dashboard-scope)
- [Troubleshooting](#troubleshooting)
- [Git Workflow](#git-workflow)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Project Overview

MindPlanAI is a full-stack productivity application that provides users with a secure and centralized workspace for managing notes and tasks.

The application is divided into two independent applications:

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **ORM:** Prisma

The frontend communicates with the backend through RESTful APIs, while the backend handles authentication, validation, business logic, and database operations.

### Dashboard

<p align="center">
  <img src="./docs/images/dashboard.png" alt="MindPlanAI Dashboard" width="90%">
</p>

### Notes

<p align="center">
  <img src="./docs/images/notes.png" alt="MindPlanAI Notes Management" width="90%">
</p>

### Tasks

<p align="center">
  <img src="./docs/images/tasks.png" alt="MindPlanAI Tasks Management" width="90%">
</p>

### Profile

<p align="center">
  <img src="./docs/images/profile.png" alt="MindPlanAI Profile" width="90%">
</p>

### Settings

<p align="center">
  <img src="./docs/images/settings.png" alt="MindPlanAI Settings" width="90%">
</p>

---

# Features

## Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Dashboard Routes
- Password Hashing with bcrypt
- Logout
- Forgot Password
- Password Reset
- User-specific data access

## Dashboard

- Dashboard Overview
- Notes Management
- Tasks Management
- Profile Management
- Account Settings

## Notes Management

- Create notes
- View notes
- Edit notes
- Delete notes
- User-specific notes
- Persistent database storage
- Protected API access

## Tasks Management

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Task status
- Task priority
- Due dates
- Categories
- Search
- Filtering
- Sorting

## Profile Management

- View profile
- Update profile information
- Manage account details

## Settings

- Appearance / Theme
- Privacy Settings
- Security Settings
- Account Settings
- Password Management

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User interface |
| Vite | Development and build tool |
| React Router | Client-side routing |
| JavaScript | Programming language |
| CSS Modules | Scoped component styling |
| Lucide React | Interface icons |
| Context API | Application preferences |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| JavaScript / ESM | Programming language |
| Prisma | Database ORM |
| MySQL | Relational database |
| Pino | Application logging |
| Pino HTTP | HTTP request logging |
| Joi | Request validation |
| Zod | Schema validation |
| bcrypt | Password hashing |
| JSON Web Token | Authentication |
| Nodemailer | Email functionality |

## Security & Middleware

- Helmet
- CORS
- Express Rate Limit
- Cookie Parser
- Compression
- JWT
- bcrypt

## Testing & Code Quality

- Jest
- Mocha
- Chai
- Supertest
- ESLint
- Prettier
- SonarQube
- Git & GitHub

---

# Application Architecture

  <p align="center">
  <img src="./docs/images/Archi.png" alt="Architecture" width="100%">
</p>


# Prerequisites

Install the following before starting:

- Node.js
- npm
- Git
- MySQL

Recommended:

- Visual Studio Code
- Thunder Client
- MySQL Workbench or phpMyAdmin

Verify installations:

```bash
node --version
npm --version
git --version
mysql --version
```

---

# Getting Started

The frontend and backend are separate applications. Both applications must be installed, configured, and running.

---

# Clone the Repositories

```bash
git clone https://github.com/10pshine-cohort-9/cohort-9-mern-6807-malaika.git


---

# Backend Installation

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Database Setup

MindPlanAI uses MySQL with Prisma ORM.

## 1. Start MySQL

Make sure that the MySQL server is running.


## 2. Create the Database

```sql
CREATE DATABASE mindplanai;
```

## 3. Configure Database Connection

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/mindplanai"
```

For a local MySQL installation with no password:

```env
DATABASE_URL="mysql://root:@localhost:3306/mindplanai"
```

## 4. Generate Prisma Client

```bash
npm run prisma:generate
```

## 5. Run Database Migration

```bash
npm run prisma:migrate
```

## 6. Open Prisma Studio

```bash
npm run prisma:studio
```

---

# Backend Environment Variables

Create `.env` in the backend root:

```env
PORT=5000

DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/mindplanai"

JWT_SECRET="Create_secret"
JWT_EXPIRES_IN="3d"

FRONTEND_URL="http://localhost:5173"

SMTP_HOST="your_smtp_host"
SMTP_PORT=587
SMTP_USER="email"
SMTP_PASS="email_password"
MAIL_FROM="email"
```

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `DATABASE_URL` | MySQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRES_IN` | JWT expiration duration |
| `FRONTEND_URL` | Frontend URL for CORS |
| `SMTP_HOST` | SMTP server |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `MAIL_FROM` | Sender email |

---

# Frontend Installation

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Frontend Environment Variables

Create `.env` in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

This variable is used by the frontend to communicate with the backend.

---

# Run the Application

Both applications must be running.

## Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

## Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# API Overview

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## Notes

```text
GET    /api/notes
GET    /api/notes/:id
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

## Tasks

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```
---

# API Testing

APIs can be tested using **Thunder Client**.

Recommended flow:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Add Authorization Token
   ↓
Access Protected APIs
   ↓
Create / Read / Update / Delete Data
```

---

# Authentication Flow

```text
User Registration
       ↓
Password Hashing
       ↓
User Created
       ↓
User Login
       ↓
Credential Validation
       ↓
JWT Generated
       ↓
Authentication Data Stored
       ↓
Protected Dashboard
```

---

# Testing

## Jest

```bash
npm test
```
  <img src="./docs/images/Frontendtestresult.jpg" alt="MindPlanAI Test Result" width="100%">

## Mocha

```bash
npm run test:mocha
```
  <img src="./docs/images/backendresult.jpg" alt="MindPlanAI Test Result" width="100%">

## ESLint

```bash
npm run lint
```

## Prettier

```bash
npm run format
```

---

# Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Backend

```bash
npm run dev
npm start
npm test
npm run test:mocha
npm run lint
npm run format
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

---

# Security

MindPlanAI uses multiple security practices.

### Password Security

Passwords are hashed using bcrypt.

### Authentication

JWT tokens are used to authenticate users and protect private routes.

### API Security

The backend uses:

- Helmet
- CORS
- Express Rate Limit
- Cookie Parser
- Request Validation
- Authentication Middleware

### Data Ownership

Notes and tasks are associated with authenticated users. Protected APIs verify the authenticated user before accessing user-owned records.

---

# Development Guidelines

The project follows:

- Modular Architecture
- Separation of Concerns
- DRY Principle
- SOLID Principles
- Clean Code
- Reusable Components
- Consistent Error Handling
- Secure API Design
- Maintainable Code

Changes should preserve existing routes, APIs, authentication, database integration, and application functionality.

---

# Current Dashboard Scope

The current dashboard focuses on the core productivity features:

```text
Dashboard
│
├── Notes
├── Tasks
├── Profile
└── Settings
```

The following modules are not part of the current dashboard:

- AI Roadmaps
- Progress
- Schedule
- Notifications

---

# Troubleshooting

## `npm install` fails

Check Node.js and npm:

```bash
node --version
npm --version
```

Then reinstall dependencies.

### Linux / macOS

```bash
rm -rf node_modules package-lock.json
npm install
```

### Windows CMD

```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Prisma Error

```bash
npm run prisma:generate
npm run prisma:migrate
```

Then restart the backend.

## Database Connection Error

Check:

1. MySQL is running.
2. `mindplanai` database exists.
3. Username is correct.
4. Password is correct.
5. `DATABASE_URL` is correct.
6. MySQL is using port `3306`.

## CORS Error

Backend:

```env
FRONTEND_URL="http://localhost:5173"
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart both servers after changing environment variables.

## Port Already in Use

Change:

```env
PORT=5000
```

to:

```env
PORT=5001
```

Then update:

```env
VITE_API_URL=http://localhost:5001/api
```

---

# Git Workflow

Pull latest changes:

```bash
git pull
```

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Check changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: add task management"
```

Push:

```bash
git push origin feature/your-feature-name
```

---

# Acknowledgements

MindPlanAI was developed as a full-stack web development project with a focus on modern software engineering practices, modular architecture, secure authentication, reusable components, RESTful API development, and maintainable code.

---

# License

This project is currently developed for educational and project purposes.

---

## Author

**Malaika Azam**
