# LeadBase CRM

A modern, fast, and full-stack Customer Relationship Management (CRM) application built for sales teams to track leads, manage pipelines, and close deals efficiently.

This project was built as a full-stack assessment demonstrating frontend UI design, backend API development, database architecture, authentication, and CRUD operations.

---

## Tech Stack

**Frontend:**

- **Next.js 15 (App Router)** - React framework for building fast web applications.
- **Tailwind CSS v4** - Utility-first CSS framework for rapid, modern styling.
- **Lucide React** - Beautiful, consistent icons.
- **TypeScript** - For type safety and better developer experience.

**Backend:**

- **Express.js** - Fast, unopinionated Node.js web framework.
- **Prisma ORM** - Next-generation Node.js and TypeScript ORM.
- **MySQL** - Relational database for robust data integrity.
- **JWT & Bcryptjs** - Secure authentication and password hashing.

---

## How to Run the Project

The application is split into two directories:
`leadbase-crm-frontend-next` and
`leadbase-crm-backend-express`.
You will need to run both concurrently.

### Prerequisites

- Node.js (v18+)
- MySQL Server running locally

### 1. Backend Setup (`leadbase-crm-backend-express`)

1. Open a terminal and navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file:

   ```env
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/leadbase_db"

   PORT=5000
   ```

4. Push the Prisma schema to create the database tables and generate the client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. **Seed the Database** with the admin, sales team, and dummy leads for testing:

   ```bash
   # Windows PowerShell
   Invoke-RestMethod -Uri http://localhost:5000/api/auth/seed -Method POST

   node seedLeads.js
   ```

6. Start the Express server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup (`leadbase-crm-frontend-next`)

1. Open a new terminal and navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Test Credentials:**

- Email: `admin@example.com`
- Password: `password123`

---

## Design Decisions & Assumptions

- **Aesthetics & UI/UX**: I prioritized a premium, dark-themed interface with glass-morphism effects and micro-animations. A CRM should not only be functional but also a joy to use. The layout utilizes a fixed sidebar and a responsive grid to ensure data is scannable.
- **Relational Database**: I chose MySQL over NoSQL because CRM data is inherently relational. A Lead belongs to a User, has many Notes, and has a Status History. Relational integrity is critical here.
- **Status History Tracking**: Rather than just overwriting a lead's status, I implemented a `LeadStatusHistory` table. This creates a timeline on the Lead Details page, solving a real-world CRM problem: knowing _when_ a lead moved and _who_ moved them.
- **Custom JWT Authentication**: Instead of using heavy third-party providers (like NextAuth or Auth0), I implemented a lightweight, custom JWT authentication flow via the Express backend to demonstrate my understanding of token-based security, middleware protection, and password hashing.

---
