# Customer Management API Documentation

## Overview

A RESTful API built with TypeScript, Express.js, and PostgreSQL for managing customer data. This API provides full CRUD (Create, Read, Update, Delete) operations for customer records.

## Table of Contents

1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Setup and Installation](#setup-and-installation)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Error Handling](#error-handling)
9. [Future Enhancements](#future-enhancements)

---

## Architecture

### Current Architecture: Layered (MVC-like) Pattern

The application follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────┐
│   Routes Layer      │  ← HTTP routing and endpoint definitions
├─────────────────────┤
│  Controllers Layer  │  ← Request/Response handling, validation
├─────────────────────┤
│   Services Layer    │  ← Business logic and data manipulation
├─────────────────────┤
│   Database Layer    │  ← SQL queries and database connection
└─────────────────────┘
```

**Layer Responsibilities:**

- **Routes** (`/routes`): Define API endpoints and HTTP methods
- **Controllers** (`/controllers`): Handle HTTP requests, parse input, send responses
- **Services** (`/services`): Contain business logic, validation, and coordinate database operations
- **Database** (`/db`): Manage database connections and SQL queries
- **Middlewares** (`/middlewares`): Cross-cutting concerns (error handling, logging)
- **Utils** (`/utils`): Shared utility functions

### Why This Architecture?

**Chosen Approach:** Layered Architecture

**Rationale:**

1. **Simplicity and Learning Curve**
   - Easy to understand for developers learning Node.js and TypeScript
   - Clear, linear flow of data through the application
   - Minimal complexity for current feature set (CRUD operations)

2. **Maintainability**
   - Each layer has a single, well-defined responsibility
   - Changes in one layer minimally impact others
   - Easy to locate and fix bugs

3. **Testability**
   - Each layer can be unit tested independently
   - Business logic is isolated in the service layer
   - Database operations are centralized

4. **Scalability Path**
   - Current architecture supports immediate needs
   - Can evolve to modular monolith when adding features (authentication, etc.)
   - Future migration to microservices is straightforward

### Alternative Architectures Considered

**Modular Monolith:**

- **Pros:** Better organization for multiple features, domain-driven design
- **Cons:** Over-engineering for current single-feature scope
- **When to use:** When adding 3+ major features (customers, orders, products, auth)

**Microservices:**

- **Pros:** Independent deployment, technology flexibility, scalability
- **Cons:** Increased complexity, network overhead, harder to debug
- **When to use:** When application grows significantly and requires independent scaling

### Evolution Strategy

```
Phase 1 (Current): Layered Architecture
         ↓
Phase 2: Modular Monolith (with Auth and more features)
         ↓
Phase 3: Microservices (for independent deployment)
```

**Migration Path:**

1. **Add Authentication** → Introduce auth module alongside customer module
2. **Modular Refactor** → Group related files into feature modules
3. **Extract Services** → Identify bounded contexts for microservices
4. **Containerize** → Use Docker for each service
5. **Deploy Independently** → Separate deployment pipelines

---

## Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Development Tools:**
  - `tsx` - TypeScript execution for development
  - `typescript` - TypeScript compiler
  - `dotenv` - Environment variable management

---

## Database Schema

### Tables

#### `customer_details`

| Column        | Type               | Constraints                    | Description                 |
| ------------- | ------------------ | ------------------------------ | --------------------------- |
| id            | SERIAL             | PRIMARY KEY                    | Auto-incrementing ID        |
| first_name    | VARCHAR(255)       | NOT NULL                       | Customer's first name       |
| last_name     | VARCHAR(255)       | NOT NULL                       | Customer's last name        |
| email         | VARCHAR(255)       | NOT NULL, UNIQUE               | Customer's email address    |
| phone_number  | VARCHAR(50)        | NOT NULL                       | Customer's phone number     |
| address       | TEXT               | DEFAULT ''                     | Customer's physical address |
| country       | VARCHAR(100)       | DEFAULT ''                     | Customer's country          |
| customer_type | customer_type ENUM | NOT NULL, DEFAULT 'Individual' | Type of customer            |
| date_created  | TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP      | Record creation timestamp   |
| updated_at    | TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP      | Last update timestamp       |

### Enums

#### `customer_type`

Possible values:

- `Individual` - Individual consumer (default)
- `Business` - Small business customer
- `Enterprise` - Large enterprise customer
- `Partner` - Business partner
- `Reseller` - Product reseller
- `Other` - Other types

### Indexes

- **Primary Key Index:** Automatically created on `id`
- **Unique Index:** Automatically created on `email`

### Schema Initialization

The database schema is automatically created on first API call if it doesn't exist. This includes:

1. Creating the `customer_type` enum
2. Creating the `customer_details` table

---

## API Endpoints

### Base URL

```
http://localhost:3002/api/customers
```

### Endpoints

#### 1. Get All Customers

**Endpoint:** `GET /api/customers`

**Description:** Retrieve all customer records

**Response:**

```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "+1-555-0123",
    "address": "123 Main St, Apt 4B",
    "country": "United States",
    "customer_type": "Individual",
    "date_created": "2026-03-10T10:30:00.000Z",
    "updated_at": "2026-03-10T10:30:00.000Z"
  }
]
```

**Status Codes:**

- `200 OK` - Success
- `500 Internal Server Error` - Database error

---

#### 2. Create Customer

**Endpoint:** `POST /api/customers`

**Description:** Create a new customer record

**Request Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone_number": "+1-555-0123",
  "address": "123 Main St, Apt 4B",
  "country": "United States",
  "customer_type": "Individual"
}
```

**Required Fields:**

- `first_name` (string)
- `last_name` (string)
- `email` (string, valid email format)
- `phone_number` (string, valid phone format)

**Optional Fields:**

- `address` (string)
- `country` (string)
- `customer_type` (enum: Individual, Business, Enterprise, Partner, Reseller, Other)

**Response:**

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone_number": "+1-555-0123",
  "address": "123 Main St, Apt 4B",
  "country": "United States",
  "customer_type": "Individual",
  "date_created": "2026-03-10T10:30:00.000Z",
  "updated_at": "2026-03-10T10:30:00.000Z"
}
```

**Status Codes:**

- `201 Created` - Customer created successfully
- `400 Bad Request` - Missing required fields or invalid data
- `500 Internal Server Error` - Database error

**Validation Rules:**

- Email must be unique
- Email must match format: `name@domain.ext`
- Phone number can contain: digits, spaces, hyphens, parentheses, plus sign

---

#### 3. Get Single Customer

**Endpoint:** `GET /api/customers/:id`

**Description:** Retrieve a specific customer by ID

**URL Parameters:**

- `id` (integer) - Customer ID

**Response:**

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone_number": "+1-555-0123",
  "address": "123 Main St, Apt 4B",
  "country": "United States",
  "customer_type": "Individual",
  "date_created": "2026-03-10T10:30:00.000Z",
  "updated_at": "2026-03-10T10:30:00.000Z"
}
```

**Status Codes:**

- `200 OK` - Success
- `404 Not Found` - Customer not found
- `500 Internal Server Error` - Database error

---

#### 4. Update Customer

**Endpoint:** `PUT /api/customers/:id`

**Description:** Update an existing customer record

**URL Parameters:**

- `id` (integer) - Customer ID

**Request Body:**

```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "phone_number": "+1-555-0456",
  "address": "456 Oak Ave",
  "country": "Canada",
  "customer_type": "Business"
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response:**

```json
{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "phone_number": "+1-555-0456",
  "address": "456 Oak Ave",
  "country": "Canada",
  "customer_type": "Business",
  "date_created": "2026-03-10T10:30:00.000Z",
  "updated_at": "2026-03-10T14:25:00.000Z"
}
```

**Status Codes:**

- `200 OK` - Customer updated successfully
- `400 Bad Request` - Invalid data format
- `404 Not Found` - Customer not found
- `500 Internal Server Error` - Database error

---

#### 5. Delete Customer

**Endpoint:** `DELETE /api/customers/:id`

**Description:** Delete a customer record

**URL Parameters:**

- `id` (integer) - Customer ID

**Response:**

```json
{
  "message": "Customer deleted successfully"
}
```

**Status Codes:**

- `200 OK` - Customer deleted successfully
- `404 Not Found` - Customer not found
- `500 Internal Server Error` - Database error

---

## Setup and Installation

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd React-Postgres-CRUD/api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a new PostgreSQL database
   - Note your database credentials

4. **Configure environment variables**
   - Create a `.env` file in the `api` directory
   - Add the required variables (see below)

5. **Build the project (optional for production)**
   ```bash
   npm run build
   ```

---

## Environment Variables

Create a `.env` file in the `api` directory with the following variables:

```env
# Server Configuration
PORT=3002

# PostgreSQL Database Configuration
PG_USER=your_postgres_username
PG_HOST=localhost
PG_DATABASE=your_database_name
PG_PORT=5432
PG_PASSWORD=your_postgres_password
```

**Example:**

```env
PORT=3002
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=customer_db
PG_PORT=5432
PG_PASSWORD=mysecretpassword
```

---

## Running the Application

### Development Mode

Runs with auto-reload on file changes:

```bash
npm run dev
```

The server will start on `http://localhost:3002`

### Production Mode

1. **Build the TypeScript code:**

   ```bash
   npm run build
   ```

2. **Run the compiled JavaScript:**
   ```bash
   npm start
   ```

### Testing the API

Once the server is running, test the base endpoint:

```bash
curl http://localhost:3002
```

Expected response:

```json
{
  "message": "Customer Management API",
  "version": "1.0.0",
  "endpoints": {
    "customers": "/api/customers"
  }
}
```

---

## Error Handling

The API uses a centralized error handling middleware that catches all errors and returns consistent error responses.

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### Common Error Codes

| Status Code | Meaning               | Typical Cause                         |
| ----------- | --------------------- | ------------------------------------- |
| 400         | Bad Request           | Missing required fields, invalid data |
| 404         | Not Found             | Customer ID doesn't exist             |
| 500         | Internal Server Error | Database connection, server issues    |

### Validation Errors

**Missing Required Fields:**

```json
{
  "error": "First name, last name, email, and phone number are required"
}
```

**Invalid Email:**

```json
{
  "error": "Invalid email format"
}
```

**Invalid Phone:**

```json
{
  "error": "Invalid phone number format"
}
```

**Customer Not Found:**

```json
{
  "error": "Customer not found"
}
```

---

## Future Enhancements

### Planned Features

#### Phase 1: Authentication & Authorization (Next)

- **User Management:** Registration, login, logout
- **JWT Authentication:** Token-based auth for secure API access
- **Role-Based Access Control (RBAC):** Admin, Manager, User roles
- **Password Security:** Encryption using bcrypt
- **Protected Routes:** Middleware for authenticated endpoints

**Architectural Impact:**

- Transition to **Modular Monolith** architecture
- Create separate modules: `auth`, `users`, `customers`
- Shared utilities for token validation

#### Phase 2: Advanced Features

- **Pagination:** For customer list endpoint
- **Search & Filtering:** Query customers by name, email, country, type
- **Sorting:** Sort by creation date, name, etc.
- **Customer Activity Log:** Track customer interactions
- **Data Export:** Export customer data to CSV/Excel
- **Email Notifications:** Welcome emails, updates

#### Phase 3: Microservices Architecture

- **Service Decomposition:**
  - Customer Service
  - Authentication Service
  - Notification Service
  - Analytics Service

- **Infrastructure:**
  - Docker containers for each service
  - API Gateway (Kong, NGINX)
  - Service discovery
  - Message queue for async operations (RabbitMQ, Redis)

- **Deployment:**
  - Kubernetes orchestration
  - CI/CD pipelines
  - Monitoring and logging (Prometheus, Grafana)
  - Auto-scaling based on load

### Database Enhancements

- **Indexes:** Add indexes on frequently queried fields (country, customer_type)
- **Full-Text Search:** PostgreSQL full-text search on name and address
- **Soft Deletes:** Instead of hard deletes, mark records as deleted
- **Audit Trail:** Track all changes to customer records

### API Enhancements

- **Versioning:** API versioning (v1, v2) for backward compatibility
- **Rate Limiting:** Prevent API abuse
- **CORS Configuration:** Proper CORS setup for production
- **API Documentation:** Swagger/OpenAPI documentation
- **Webhooks:** Event-driven notifications for customer changes

---

## Development Best Practices

### Code Organization

```
api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── db/              # Database layer
│   ├── routes/          # API routes
│   ├── middlewares/     # Express middlewares
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
```

### Naming Conventions

- **Files:** lowercase with extensions (e.g., `customer.ts`)
- **Folders:** lowercase (e.g., `controllers`, `services`)
- **Functions:** camelCase (e.g., `getAllCustomers`)
- **Types/Interfaces:** PascalCase (e.g., `CustomerInput`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DEFAULT_PORT`)

### TypeScript Best Practices

- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` type
- Use union types and enums where appropriate

---

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Add appropriate error handling
3. Update documentation for new features
4. Test all endpoints thoroughly

---

## License

[Specify your license here]

---

## Support

For issues or questions, please open an issue in the repository.

---

**Last Updated:** March 10, 2026  
**Version:** 1.0.0  
**Author:** [Your Name]
