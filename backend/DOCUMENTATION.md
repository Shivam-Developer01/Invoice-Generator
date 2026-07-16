# Invoice Generator Backend Documentation

## 1. Project Overview

The Invoice Generator Backend is a RESTful API built using the MERN backend stack. It manages users, company details, customers, document settings, invoices, proforma invoices, credit notes, PDF generation, and audit logging.

The application is designed with modular architecture, centralized error handling, reusable utilities, and secure authentication.

---

# 2. Technology Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* express-validator
* PDFKit
* dotenv

---

# 3. Features

### Authentication

* Secure Login
* JWT Authentication
* Password Change

### User Management

* Create User
* Update User
* Activate/Deactivate User

### Company Management

* Update Company Information
* GST Options
* Bank Details

### Customer Management

* Create Customer
* Update Customer
* Search
* Pagination

### Document Settings

* Shared Sequence Number
* Configurable Prefixes
* Financial Year
* Reset Settings

### Documents

* Invoice
* Proforma Invoice
* Credit Note
* Customer Snapshot
* Automatic Tax Calculation
* Soft Delete

### PDF

* Automatic PDF Generation
* Download PDF
* Regenerate PDF

### Audit Logs

* Login
* Password Change
* User Updates
* Customer Updates
* Company Updates
* Document Updates
* PDF Regeneration

---

# 4. Folder Structure

src/
│
├── config/
├── constants/
├── controllers/
├── errors/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── pdfs/
└── app.js

---

# 5. Authentication Flow

1. User logs in.
2. Password is verified.
3. JWT Token is generated.
4. Token is verified on every protected request.
5. Authenticated user is attached to req.user.

---

# 6. Database Collections

* Users
* Company
* Customers
* Document Settings
* Documents
* Audit Logs

---

# 7. Document Number Format

Format:

RKI-I-26001

Where

* RKI → Company Prefix
* I → Invoice
* P → Proforma
* C → Credit Note
* 26 → Financial Year
* 001 → Shared Running Sequence

---

# 8. API Modules

## Authentication

* Login
* Change Password

## Users

* Create
* Read
* Update
* Status Update

## Company

* Get
* Update

## Customers

* Create
* Read
* Update

## Document Settings

* Get
* Update

## Documents

* Create
* Read
* Update
* Delete
* Download PDF
* Regenerate PDF

## Audit Logs

* Get All
* Get By Id

---

# 9. Validation

Implemented using express-validator.

Includes:

* Email Validation
* Password Validation
* MongoId Validation
* GSTIN Validation
* PAN Validation
* Phone Validation
* Enum Validation
* Sanitization
* Case-insensitive Role Handling

---

# 10. Error Handling

Centralized Error Handler

Returns

* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict
* 500 Internal Server Error

---

# 11. Audit Logging

Every important business action creates an audit log.

Captured Information:

* User
* Action
* Entity
* Entity Id
* Description
* Metadata
* Timestamp

---

# 12. PDF Workflow

Create Document

↓

Generate Document Number

↓

Calculate Taxes

↓

Generate PDF

↓

Store PDF Metadata

↓

Download / Regenerate PDF

---

# 13. Security

* JWT Authentication
* Password Hashing
* Protected Routes
* Input Validation
* Sanitization
* Centralized Error Handling

---

# 14. Future Enhancements

* React Frontend
* Email Invoice
* Cloud Storage for PDFs
* Dashboard Analytics
* Role-Based Authorization
* Invoice Templates
* Digital Signature
* Payment Tracking

---

# 15. Conclusion

The backend follows a layered architecture (Controller → Service → Model) with reusable utilities, centralized validation, PDF generation, and audit logging. The project is modular, scalable, and ready to be integrated with a frontend application.