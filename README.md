# LeadBase CRM

> Build your pipeline. Close more deals.

A modern, full-stack Customer Relationship Management (CRM) application built
for small sales teams to manage leads, track pipeline progress, add notes,
and close deals efficiently.

This project was built as a full-stack take-home assessment demonstrating
frontend UI design, backend API development, database architecture,
JWT authentication, and full CRUD operations.

---

## Features Implemented

- ✅ JWT-based authentication with protected routes
- ✅ Login page with test credentials
- ✅ Dashboard with live pipeline statistics
- ✅ Full lead CRUD — create, view, edit, delete
- ✅ Lead status management (New → Contacted → Qualified → Proposal Sent → Won / Lost)
- ✅ Notes system — add and view notes per lead
- ✅ Status history timeline — tracks every status change with who changed it and when
- ✅ Search leads by name, company, or email
- ✅ Filter leads by status, lead source, and assigned salesperson
- ✅ Responsive UI with dark theme and glassmorphism design
- ✅ Landing page introducing the product

---

## Tech Stack

**Frontend:**

- **Next.js 15 (App Router)** — React framework for building fast web applications
- **Tailwind CSS v4** — Utility-first CSS framework for rapid, modern styling
- **Lucide React** — Beautiful, consistent icon library
- **TypeScript** — For type safety and better developer experience

**Backend:**

- **Express.js** — Fast, unopinionated Node.js web framework
- **Prisma ORM** — Next-generation Node.js and TypeScript ORM
- **MySQL** — Relational database for robust data integrity
- **JWT & Bcryptjs** — Secure authentication and password hashing

---

## Project Structure

The application is split into two separate repositories:

- `leadbase-crm-frontend-next` — Next.js frontend
- `leadbase-crm-backend-express` — Express.js backend

---

## How to Run Locally

### Prerequisites

- Node.js v18+
- MySQL Server running locally

---

### 1. Backend Setup (`leadbase-crm-backend-express`)

1. Navigate to the backend directory and install dependencies:

```bash
   npm install
```

2. Create a `.env` file in the backend root:

```env
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/leadbase_db"
   PORT=5000
   JWT_SECRET="your_jwt_secret_key"
```

3. Create a MySQL database named `leadbase_db`.

4. Push the Prisma schema and generate the client:

```bash
   npx prisma db push
   npx prisma generate
```

5. Seed the database with users and dummy leads:

```bash
   # Windows PowerShell
   Invoke-RestMethod -Uri http://localhost:5000/api/auth/seed -Method POST

   node seedLeads.js
```

6. Start the backend server:

```bash
   npm run dev
```

Server runs on: `http://localhost:5000`

---

### 2. Frontend Setup (`leadbase-crm-frontend-next`)

1. Navigate to the frontend directory and install dependencies:

```bash
   npm install
```

2. Create a `.env.local` file in the frontend root:

```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the development server:

```bash
   npm run dev
```

App runs on: `http://localhost:3000`

---

## Environment Variables

### Backend `.env`

| Variable       | Description                             |
| -------------- | --------------------------------------- |
| `DATABASE_URL` | MySQL connection string                 |
| `PORT`         | Port for Express server (default: 5000) |
| `JWT_SECRET`   | Secret key for signing JWT tokens       |

### Frontend `.env.local`

| Variable              | Description                     |
| --------------------- | ------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express backend |

---

## Test Login Credentials

| Role           | Email               | Password    |
| -------------- | ------------------- | ----------- |
| Admin          | admin@example.com   | password123 |
| Salesperson 01 | sale01@leadbase.com | 123user1    |
| Salesperson 02 | sale02@leadbase.com | 123user2    |

---

## Database Setup

The database uses MySQL with Prisma ORM. The schema includes 4 tables:

- **User** — Stores salesperson and admin accounts
- **Lead** — Core lead data including status, source, and deal value
- **Note** — Notes attached to individual leads
- **LeadStatusHistory** — Tracks every status change with timestamp and author

Run `npx prisma db push` to create all tables automatically from the schema.
Run the seed commands to populate with test data.

---

## Design Decisions & Assumptions

- **Aesthetics & UI/UX**: I prioritized a premium, dark-themed interface with
  glassmorphism effects. A CRM should not only be functional but also a joy to use.
  The layout uses a fixed sidebar and responsive grid to keep data scannable.

- **Relational Database**: I chose MySQL over NoSQL because CRM data is inherently
  relational. A Lead belongs to a User, has many Notes, and has a Status History.
  Relational integrity is critical here.

- **Status History Tracking**: Rather than overwriting a lead's status, I implemented
  a `LeadStatusHistory` table. This creates a full timeline on the Lead Details page —
  solving a real CRM problem: knowing when a lead moved and who moved it.

- **Custom JWT Authentication**: Instead of using heavy third-party providers like
  NextAuth or Auth0, I implemented a lightweight custom JWT flow via Express to
  demonstrate my understanding of token-based security, middleware protection,
  and password hashing.

---

## Known Limitations

- No email notifications when a lead status changes
- No pagination on the leads table (loads all leads at once)
- No role-based access control — all logged-in users can edit any lead
- No file attachments on notes
- Not deployed — runs locally only

---

## Reflection

This assessment pushed me to think beyond just making things work.
Building LeadBase from scratch made me appreciate how real CRM tools
like HubSpot or Pipedrive are architected under the hood.

The most challenging part was designing the status history system —
deciding when to create a history record, how to link it to both the lead
and the user, and how to display it as a clean timeline on the frontend.

I also learned to think from a sales team's perspective, not just a
developer's perspective. Features like the status badge colors, the
quick stats on the detail page, and the filter system were all designed
around how a salesperson actually uses a CRM daily.

If I had more time, I would add email notifications, pagination,
role-based permissions, and a Kanban-style pipeline board view.
