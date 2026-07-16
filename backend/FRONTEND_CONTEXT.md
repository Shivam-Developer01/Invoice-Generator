# Invoice Generator - Frontend Context

## Project Overview

This project is an Invoice Generator consisting of a Node.js + Express + MongoDB backend and a React frontend (to be developed).

The frontend should consume the existing backend APIs only. Avoid changing backend APIs unless absolutely necessary.

---

# Backend Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* PDFKit
* express-validator
* bcryptjs

Architecture follows

Controller
↓

Service
↓

Model

Business logic exists only inside Services.

---

# Authentication

Authentication uses JWT.

Login API returns

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "JWT_TOKEN"
  }
}
```

Store JWT securely.

Every protected request must send

Authorization: Bearer <token>

The backend attaches the authenticated user to req.user.

---

# Standard API Response

Every successful response follows

```json
{
    "success": true,
    "message": "...",
    "data": { }
}
```

Validation errors

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [...]
}
```

Server errors

```json
{
    "success": false,
    "message": "..."
}
```

Frontend should always use success, message and data.

---

# Backend Modules

## Authentication

* Login
* Change Password

---

## Users

Features

* Create User
* List Users
* Update User
* Activate/Deactivate User

---

## Company

Single company only.

No create screen.

Only Update Company Information.

Contains

* Company Details
* GST Details
* Bank Details
* Addresses

---

## Customers

Features

* Create
* Update
* List
* Search
* Pagination

Each customer contains

* Basic Details
* GSTIN
* PAN
* Billing Address
* Shipping Address

---

## Document Settings

Only one settings document exists.

Contains

* Company Prefix
* Financial Year
* Document Prefixes
* Shared Sequence
* Reset Yearly

No Create screen.

Only Update.

---

## Documents

Supports

* Invoice
* Proforma
* Credit Note

Document contains

* Customer Snapshot
* Items
* Taxes
* Total
* PDF
* Notes

Documents use Soft Delete.

---

## PDF

Backend automatically generates PDF during document creation.

Frontend only needs

Download PDF

Regenerate PDF

Backend handles everything else.

---

## Audit Logs

Read Only

Frontend only displays logs.

No update or delete operations.

---

# Document Number

Automatically generated.

Examples

RKI-I-26001

RKI-P-26002

RKI-C-26003

Frontend should never generate document numbers.

Display only.

---

# Tax Calculation

Backend calculates

Subtotal

↓

Taxes

↓

Grand Total

Frontend should never calculate totals.

Only send

Items

Selected Taxes

Backend returns

Subtotal

Taxes

Total

Display returned values.

---

# Customer Snapshot

Document stores customer snapshot.

Updating customer later does not change old invoices.

Frontend doesn't need any special handling.

---

# PDF Flow

Create Document

↓

Backend Generates PDF

↓

Stores PDF Metadata

↓

Frontend displays

Download PDF

Regenerate PDF

buttons.

---

# Search

Backend supports

?search=

Frontend should implement search box using query parameter.

---

# Pagination

Backend supports

?page=

&limit=

Frontend should implement server-side pagination.

---

# Sorting

Backend supports sorting.

Use backend sorting whenever possible.

---

# Audit Logs

Supports

Search

Pagination

Filters

Frontend should implement

* Search Box

* Date Filter

* Entity Filter

* Action Filter

---

# Security

Never store passwords.

Never decode JWT manually.

Always rely on backend authentication.

Redirect to Login on 401 responses.

---

# UI Suggestions

Sidebar

Dashboard

Users

Company

Customers

Document Settings

Invoices

Proforma

Credit Notes

Audit Logs

Profile

Logout

---

# Forms

Use React Hook Form.

Validate on frontend for better UX.

Backend remains the source of truth.

---

# State Management

Use

TanStack Query

or

Redux Toolkit

for API state.

Avoid unnecessary local state.

---

# HTTP Client

Use Axios.

Create

api.js

with

* Base URL

* Authorization Interceptor

* Error Interceptor

---

# Project Goal

Frontend should be clean, responsive and modern while keeping all business logic inside the backend.

The frontend should act only as a presentation layer that consumes backend APIs.
