# Invoice Generator & Management System

## Project Overview

The **Invoice Generator & Management System** is a full-stack MERN application developed for **Ravikiran Infotech** to streamline customer management, invoice generation, document tracking, and company administration.

The application enables authorized users to create and manage **Invoices, Proforma Invoices, and Credit Notes**, while maintaining audit logs, document settings, customer records, company information, and user management through role-based authentication.

---

# Objectives

- Digitize invoice generation process
- Reduce manual errors
- Maintain audit history
- Generate downloadable PDF invoices
- Secure data using authentication & authorization
- Provide a responsive admin dashboard

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- React Query (TanStack Query)
- React Hook Form
- Zod
- Axios
- Bootstrap 5
- React Bootstrap
- React Icons
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- PDFKit
- Express Validator

---

## Database

MongoDB Atlas / MongoDB

---

# Authentication

Implemented using JWT.

Features:

- Secure Login
- Remember Me
- Session TTL
- Protected Routes
- Role Based Authorization
- Change Password
- Mandatory Password Change (supported)
- Automatic Logout on Password Change

---

# User Roles

- Co-Founder
- Manager
- Accountant
- Others

Each role has different permissions.

---

# Modules

## 1. Dashboard

Provides overall business summary.

Features

- Total Customers
- Total Documents
- Total Users
- Recent Documents
- Recent Activities
- Monthly Document Chart
- Document Type Distribution
- Skeleton Loading
- Responsive Cards

---

## 2. Customer Management

Manage customer information.

Features

- Create Customer
- Edit Customer
- View Customer
- Activate / Deactivate
- Search
- Pagination
- Billing Address
- Shipping Address
- GST Validation
- PAN Validation
- Phone Validation
- Email Validation

Inactive customers cannot be selected while creating new documents.

---

## 3. Document Generator

Supports

- Invoice
- Proforma Invoice
- Credit Note

Features

- Customer Selection
- Item Management
- Multiple Tax Support
- Notes
- SAC/HSN Selection
- Manual SAC Entry
- PDF Generation
- PDF Download
- Edit Existing Documents
- Delete Documents
- Soft Delete

---

## 4. SAC Code Management

Master module for Service Accounting Codes.

Features

- Create SAC Code
- Dropdown Selection
- Optional Manual Entry
- Future Reuse
- Empty Selection Allowed

---

## 5. Company Management

Stores company details.

Features

- Company Name
- GST Number
- PAN
- Address
- Contact Details

---

## 6. Document Settings

Configure document numbering.

Features

- Prefix Management
- Invoice Prefix
- Proforma Prefix
- Credit Note Prefix
- Running Sequence
- Reset Year Option

---

## 7. User Management

Available for Co-Founder.

Features

- Create User
- Edit User
- View User
- Activate / Deactivate

---

## 8. Profile

Features

- View Profile
- Change Password
- Formatted Dates
- Role Display

---

## 9. Audit Logs

Tracks system activities.

Records

- User
- Action
- Entity
- Timestamp
- Details

---

# Dashboard Analytics

Includes

- Monthly Documents
- Document Type Distribution
- Recent Activities
- Statistics Cards

Aggregation pipelines are used to generate dashboard analytics.

---

# PDF Generation

PDFs are generated automatically using PDFKit.

Includes

- Company Information
- Customer Details
- Items
- Taxes
- Total
- Notes
- SAC Codes
- Download Support

After creating or updating a document:

- PDF regenerates automatically
- PDF downloads automatically
- Redirects to Documents page

---

# Security Features

- JWT Authentication
- Password Hashing
- Role Based Access
- Express Validators
- Input Sanitization
- Soft Delete
- Session Expiry (TTL)
- Protected APIs
- Password Confirmation
- Validation Middleware

---

# Validation

Implemented using

- Zod (Frontend)
- Express Validator (Backend)

Validated Fields

- Email
- Password
- GSTIN
- PAN
- Phone
- Pincode
- Amount
- Document Items
- Taxes

---

# Search

Implemented for

- Customers
- Documents
- Audit Logs

---

# Pagination

Implemented using reusable QueryFeatures utility.

Supports

- Page
- Limit
- Search
- Sorting
- Filtering

---

# Reusable Components

Frontend contains reusable UI components including

- DataTable
- Pagination
- ConfirmationModal
- PrimaryButton
- StatusBadge
- PageHeader
- Section
- TableSkeleton
- FormSkeleton
- EmptyState
- TableActions

---

# Reusable Hooks

Custom Hooks

- useCustomers
- useDocuments
- useUsers
- useAuditLogs
- useCompany
- useDocumentSettings
- useDownloadPdf
- useDebounce
- useTableParams

---

# Backend Architecture

```
src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── pdf/
└── app.js
```

---

# Frontend Architecture

```
src/
│
├── api/
├── assets/
├── components/
├── config/
├── constants/
├── context/
├── features/
├── hooks/
├── routes/
├── utils/
└── App.jsx
```

---

# Database Collections

- Users
- Customers
- Documents
- Companies
- DocumentSettings
- AuditLogs
- SacCodes

---

# Design Patterns Used

- Service Layer
- Controller Layer
- Repository (Mongoose)
- Middleware Pattern
- Context API
- Custom Hooks
- Query Feature Utility
- Component Reusability
- Soft Delete Pattern

---

# Performance Optimizations

- React Query Caching
- Debounced Search
- Skeleton Loading
- Reusable Components
- Pagination
- Lazy Data Fetching
- Query Features
- MongoDB Population
- Aggregation Pipelines

---

# User Experience Features

- Responsive Design
- Mobile Sidebar
- Navbar User Menu
- Skeleton Loaders
- Empty States
- Confirmation Dialogs
- Toast Notifications
- Automatic PDF Download
- Form Validation
- Loading Buttons

---

# Project Highlights

- Complete MERN Stack Application
- Production Style Folder Structure
- Role Based Authentication
- Modular Architecture
- Automatic PDF Generation
- Dashboard Analytics
- Audit Logging
- Reusable Components
- Clean UI
- Responsive Design

---

# Future Enhancements

- Email Invoice
- Refresh Token Authentication
- Multi Company Support
- Dark Mode
- Excel Export
- Document Templates
- Digital Signature
- Cloud Storage for PDFs
- GST Return Reports
- Payment Tracking

---

# Learning Outcomes

During this project, the following concepts were implemented and practiced:

- MERN Stack Development
- REST API Design
- MongoDB Schema Design
- JWT Authentication
- Role Based Authorization
- React Query
- React Hook Form
- Zod Validation
- PDF Generation
- Aggregation Pipelines
- Express Middleware
- Modular Architecture
- CRUD Operations
- Responsive UI Design
- State Management
- Error Handling
- Code Reusability
- Backend Optimization
- Frontend Performance Optimization

---

# Conclusion

The **Invoice Generator & Management System** is a complete enterprise-style MERN application designed to simplify invoice generation and administrative workflows. It incorporates secure authentication, role-based access control, customer and document management, dashboard analytics, audit logging, automatic PDF generation, and responsive user interfaces. The project follows a modular and scalable architecture, making it maintainable, extensible, and aligned with modern full-stack development practices. It serves as both a practical business solution and a comprehensive demonstration of full-stack software engineering skills.
