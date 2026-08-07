# Invoice Generator & Management System

A production-ready full-stack MERN (MongoDB, Express.js, React, Node.js) application built for **Ravikiran Infotech** to streamline invoice creation, proforma invoices, credit notes, customer management, multi-company profile administration, SAC/HSN code tracking, dynamic document numbering, audit logging, and automated PDF rendering.

---

## 📑 Table of Contents

- [Features Overview](#-features-overview)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Seeding](#database-seeding)
- [API Endpoints Reference](#-api-endpoints-reference)
- [User Roles & Permissions](#-user-roles--permissions)
- [Directory Structure](#-directory-structure)
- [Development Guidelines](#-development-guidelines)

---

## 🚀 Features Overview

### 1. 📊 Interactive Dashboard & Analytics
- Live statistics counters for Total Customers, Total Documents, Users, and Activity metrics.
- Graphical visualizations using **Chart.js** & **React-Chartjs-2** (Monthly document trends & Document type breakdown).
- Recent activity log feed and recent document shortcuts with skeleton loaders.

### 2. 📄 Document Generator & PDF Engine
- Supports **Invoices**, **Proforma Invoices**, and **Credit Notes**.
- Real-time tax computation (CGST, SGST, IGST), SAC/HSN code dropdown selection/manual entry, and subtotal calculation.
- Automated server-side PDF generation using **PDFKit** with company branding, tax breakdown, notes, terms, and auto-download capability.
- Document history management with soft-delete support and PDF regeneration.

### 3. ⚙️ Dynamic Document Settings
- Per-company prefix customization for Invoices, Proforma Invoices, and Credit Notes.
- Auto-incrementing running sequences with optional yearly sequence resets.

### 4. 👥 Customer Management
- Maintain detailed records for customers including Billing and Shipping addresses.
- Built-in validation for **GSTIN**, **PAN**, phone numbers, and email formats.
- Active/Inactive status toggle (Inactive customers are hidden during document creation to prevent errors).

### 5. 🏢 Company Profile Management
- Store and manage multi-company profiles (Company name, GSTIN, PAN, Bank Details, Addresses).
- Logo upload support handled via **Multer** stored under `/uploads`.

### 6. 🏷️ SAC Code Management
- Centralized Service Accounting Code (SAC) master directory.
- Standardized dropdown selection with manual override flexibility.

### 7. 🔒 Authentication & Role-Based Authorization
- **JWT Authentication** with token state persistence and session expiry checking.
- Password hashing with **bcryptjs** (10 salt rounds).
- User roles: `CO_FOUNDER`, `MANAGER`, `ACCOUNTANT`, `OTHERS`.
- Dedicated User Management module reserved exclusively for `CO_FOUNDER`.
- Password change capability with automatic logout across sessions upon credential update.

### 8. 🛡️ Audit Logging
- Automated activity auditing recording action types, target entities, user IDs, timestamps, and metadata diffs.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (built with Vite)
- **UI & Styling**: Bootstrap 5, React Bootstrap, Material UI (MUI), React Icons
- **State Management & Data Fetching**: `@tanstack/react-query` (TanStack Query v5)
- **Routing**: `react-router-dom` (v7)
- **Form Management**: `react-hook-form` paired with `zod` schema resolvers (`@hookform/resolvers`)
- **HTTP Client**: Axios with request/response interceptors for auth token handling
- **Charts**: `chart.js` & `react-chartjs-2`
- **Notifications**: `react-toastify`

### Backend
- **Runtime**: Node.js (ES Modules - `"type": "module"`)
- **Framework**: Express.js (v5)
- **Database / ODM**: MongoDB & Mongoose (v9)
- **Authentication**: `jsonwebtoken` & `bcryptjs`
- **PDF Generation**: `pdfkit`
- **File Uploads**: `multer`
- **Security & Utilities**: `helmet`, `cors`, `compression`, `express-validator`, `morgan`

---

## 🏗️ Project Architecture

```
invoice-generator/
├── backend/                   # Node.js + Express REST API Server
│   ├── scripts/               # DB maintenance & seeding scripts
│   ├── src/                   # Server source code
│   │   ├── config/            # Database connection, env loader, multer setup
│   │   ├── constants/         # App constants (roles, document types, status codes)
│   │   ├── controllers/       # Route request handlers
│   │   ├── errors/            # Custom API error & response wrappers
│   │   ├── middleware/        # Auth, error handling, validation middleware
│   │   ├── models/            # Mongoose schemas (User, Document, Customer, etc.)
│   │   ├── pdfs/              # PDFKit templates & document builder logic
│   │   ├── routes/            # Express API endpoint definitions
│   │   ├── services/          # Business logic & DB interaction layer
│   │   ├── utils/             # Pagination, QueryFeatures, helper utilities
│   │   └── validators/        # Express-validator input schemas
│   ├── uploads/               # Stored uploaded company logos
│   ├── .env                   # Backend environment variables
│   └── package.json
│
├── frontend/                  # React 19 SPA (Vite)
│   ├── public/                # Static web assets
│   ├── src/
│   │   ├── api/               # Axios instance configuration & QueryClient setup
│   │   ├── components/        # Shared reusable UI elements (DataTable, Modal, Buttons)
│   │   ├── config/            # Route paths, menu constants, environment config
│   │   ├── context/           # React context providers (AuthContext)
│   │   ├── features/          # Feature-based modular folders (auth, documents, etc.)
│   │   ├── hooks/             # Custom React & React Query hooks
│   │   ├── routes/            # App router, Protected/Public/Role-based route wrappers
│   │   ├── styles/            # Global & modular CSS styles
│   │   └── utils/             # Token storage, formatting, helper functions
│   ├── .env                   # Frontend environment variables
│   └── package.json
└── README.md                  # Project Documentation
```

---

## 🔑 Environment Variables

### Backend Configuration (`backend/.env`)

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/invoice_generator_app
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend Configuration (`frontend/.env`)

```env
VITE_SERVER_URL=http://localhost:3000
VITE_BASE_URL=http://localhost:3000/api/v1
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Local MongoDB instance running on port 27017 or MongoDB Atlas connection URI.

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure `backend/.env` is configured properly (refer to [Environment Variables](#-environment-variables)).

4. Seed the initial Super Admin account (if starting fresh):
   ```bash
   npm run seed:admin
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000` (or specified `PORT`).*

---

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure `frontend/.env` is configured properly.

4. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will open at `http://localhost:5173`.*

---

### Database Seeding

To quickly populate an initial Co-Founder user into your database, run:
```bash
cd backend
npm run seed:admin
```
**Default Credentials:**
- **Email:** `admin@gmail.com`
- **Password:** `Admin@123`
- **Role:** `CO_FOUNDER`

---

## 📡 API Endpoints Reference

Base Path: `/api/v1`

| Module | Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/auth/login` | `POST` | Public | Authenticate user & return JWT token |
| **User** | `/users` | `GET` | Protected | Fetch list of users (Search, Paginated) |
| | `/users` | `POST` | Co-Founder | Register new system user |
| | `/users/:id` | `GET` | Protected | Get detailed user information |
| | `/users/:id` | `PATCH` | Protected | Update user details |
| | `/users/:id/status` | `PATCH` | Co-Founder | Toggle user active/inactive status |
| | `/users/change-password`| `PATCH` | Protected | Change logged-in user password |
| **Customers** | `/customers` | `GET` | Protected | Fetch customer directory |
| | `/customers` | `POST` | Protected | Add new customer record |
| | `/customers/:id` | `GET` | Protected | Get customer details |
| | `/customers/:id` | `PATCH` | Protected | Update customer record |
| | `/customers/:id/status`| `PATCH` | Protected | Toggle active/inactive status |
| **Documents** | `/documents` | `GET` | Protected | Get all invoices/proformas/credit notes |
| | `/documents` | `POST` | Protected | Create new document & trigger PDF generation |
| | `/documents/:id` | `GET` | Protected | Get document breakdown |
| | `/documents/:id` | `PATCH` | Protected | Update document |
| | `/documents/:id` | `DELETE`| Protected | Soft delete document |
| | `/documents/:id/pdf` | `GET` | Protected | Stream/Download PDF document |
| | `/documents/:id/regenerate-pdf` | `POST` | Protected | Force regenerate PDF file |
| **Companies** | `/companies` | `GET` | Protected | List registered company profiles |
| | `/companies` | `POST` | Protected | Register company profile |
| | `/companies/:id` | `PATCH` | Protected | Update company details |
| | `/companies/:id/logo` | `POST` | Protected | Upload company logo image |
| **Settings** | `/document-settings/:id` | `GET/PATCH` | Protected | View/Update invoice prefixes & running sequence |
| **SAC Codes** | `/sac-codes` | `GET/POST` | Protected | SAC code master management |
| | `/sac-codes/dropdown` | `GET` | Protected | Fetch SAC codes for select dropdowns |
| **Dashboard** | `/dashboard/stats` | `GET` | Protected | General dashboard counter statistics |
| | `/dashboard/charts` | `GET` | Protected | Document trend and distribution charts |
| | `/dashboard/recent-documents` | `GET` | Protected | List recently generated documents |
| | `/dashboard/recent-activities` | `GET` | Protected | List recent system activity logs |
| **Audit Logs**| `/audit-logs` | `GET` | Protected | Fetch system audit logs |

---

## 👥 User Roles & Permissions

| Feature / Module | Co-Founder | Manager | Accountant | Others |
| :--- | :---: | :---: | :---: | :---: |
| **Dashboard & Analytics** | ✅ | ✅ | ✅ | ✅ |
| **View / Generate Documents** | ✅ | ✅ | ✅ | ✅ |
| **Edit / Delete Documents** | ✅ | ✅ | ✅ | ✅ |
| **Manage Customers** | ✅ | ✅ | ✅ | View Only |
| **Company & Document Settings** | ✅ | ✅ | View Only | View Only |
| **User Management (Create/Edit Users)** | ✅ | ❌ | ❌ | ❌ |
| **Audit Logs View** | ✅ | ✅ | ✅ | ✅ |

---

## 💻 Development Guidelines

- **ES Modules**: Both frontend and backend use ES Modules (`import/export`). Do not mix `require()` unless strictly necessary.
- **Validation**:
  - Client-side validation: Handled via `Zod` schemas with `react-hook-form`.
  - Server-side validation: Standardized via `express-validator` middleware array passed to routes.
- **API Response Structure**:
  All backend responses adhere to standard wrappers (`ApiResponse` and `ApiError`):
  ```json
  {
    "statusCode": 200,
    "message": "Success message",
    "data": { ... }
  }
  ```
- **Error Handling**: Async route handlers are wrapped with `asyncHandler` middleware to avoid unhandled promise rejections.

---

## 📄 License

Internal proprietary software developed for **Ravikiran Infotech**. All rights reserved.
