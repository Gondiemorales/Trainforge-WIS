# TrainForge

**A SaaS platform for personal trainers to manage clients, build training plans, schedule appointments, track progress and generate AI-powered nutrition plans.**

---

## Live Deployment

 **URL:** `https://trainforge-wis.vercel.app/`

---

## Login Credentials

- **Admin** - admin@trainforge.com - password123
- **Trainer** - trainer@trainforge.com - password123

> The platform is designed for admins and trainers. Client accounts exist in the database but do not have a public-facing portal in this version.

---

## Implemented Features

### Feature Declaration

- **1.1** - Deployed to Vercel - Y
- **2.1** - Landing page + password-based login via NextAuth - Y
- **2.2** - ADMIN and TRAINER roles enforced via middleware, server actions and permission guards on every page - Y
- **2.3** - Admin interface for SaaS subscriptions with full CRUD, archive/restore and pagination - Y
- **2.4** - PT client management with full CRUD, archive/restore, preferred time picker, filters and pagination - Y
- **2.5** - Exercise catalogue with full CRUD, archive/restore and difficulty filter - Y
- **3.4** - Monthly calendar grid with colour-coded appointments, navigation between months, full appointment CRUD and status management - Y
- **3.5** - Training plans with exercise descriptions, sets, reps, intensity, rest time and day of week. Draft to Active to Archived workflow - Y
- **3.6** - Per-client progress overview showing exercise history, weight lifted, sets x reps over time, plus training plans, appointments and nutrition plans in one view - Y
- **4.1** - DaisyUI + Tailwind CSS, mobile-first responsive layout, consistent design system throughout - Y
- **4.2** - Inline validation errors per field, success/error alerts on all forms, empty state messages, loading states on submit buttons - Y
- **5.1** - AI Nutritional Assistant powered by Google Gemini 2.5. Trainer inputs client goals, macro split, allergies and preferences. AI generates a structured 7-day meal plan with full macro breakdown. Trainer reviews and publishes. Includes responsible AI disclaimer - Y

---

## Feature Descriptions

### Admin Panel

The system administrator can:

- **Manage trainer accounts** - create, edit, archive and restore trainer profiles including specialty, bio and hourly rate
- **Manage SaaS subscriptions** - assign FREE, STARTER or PRO plans to trainers, edit billing status and archive subscriptions
- All admin tables include pagination and Active/Archived filters

### Trainer Portal

The trainer is the core user of TrainForge.

#### Client Management
- Create client accounts with goals, experience level, body metrics (age, height, weight), preferred appointment times and internal notes
- Edit, archive and restore clients
- Filter between active and archived clients with pagination
- Preferred appointment times use a custom visual weekly time-slot picker

#### Exercise Catalogue
- Browse global system exercises (visible to all trainers, read-only)
- Create custom exercises with muscle group, difficulty, default sets/reps and step-by-step instructions
- Edit and archive their own exercises
- Filter by difficulty level (Beginner / Intermediate / Advanced)

#### Training Plans
- Create personalised training plans assigned to a specific client
- Plans follow a status workflow: Draft to Active to Archived
- Dedicated detail page for each plan where exercises are added from the catalogue
- Each plan exercise stores: sets, reps, rest time, intensity (e.g. RPE 8 or 70% 1RM), day of week and coaching notes
- Exercise name is snapshotted at creation to preserve history if the exercise is later renamed

#### Calendar and Appointments
- Monthly calendar grid showing all appointments colour-coded by type (Video call / In person / Consultation)
- Navigate between months with previous/next links
- Create, edit and schedule appointments with start/end datetime, meeting URL or physical location
- Update appointment status: Scheduled to Completed or Cancelled
- Appointments list below the calendar with status filters and pagination

#### Progress Tracking
- Main view shows a card per client with key stats: total sessions, active plans, next appointment date and last session date
- Clicking a client opens a full profile page with four sections:
  - **Exercise Progress** - complete log table with weight lifted, sets x reps, body weight and session notes
  - **Training Plans** - all plans assigned with status badges and direct links
  - **Appointments** - upcoming sessions highlighted, full past history
  - **Nutrition Plans** - all AI-generated plans with status and direct links
- Log new sessions directly from the sticky sidebar form on the client profile page

#### AI Nutrition Plans
- Generate a complete 7-day personalised meal plan using Google Gemini 2.5
- Input: client, caloric objective (deficit / maintenance / surplus), macro split (protein / carbs / fat percentages), food allergies, dietary preferences and current weight
- Macros must add up to exactly 100%, validated server-side with Zod
- Gemini returns structured JSON with daily meals, ingredients, calorie and macro breakdown per meal and daily totals
- Trainer reviews the plan in an expandable day-by-day view before publishing
- Plan statuses: Draft to Published to Archived
- Responsible AI: every published plan includes a disclaimer stating the content is AI-assisted and not a substitute for advice from a licensed nutritionist

### Landing Page

- Full-screen sections: Hero, Features, How It Works, AI Highlight, Call to Action
- Dark/light alternating design
- Sticky navigation with Sign In button leading to the login page

---

## Tech Stack

- **Next.js 16** - Full-stack React framework with App Router, Server Actions and Server Components
- **TypeScript** - End-to-end type safety
- **Tailwind CSS 4** - Utility-first styling
- **DaisyUI 5** - Component library on top of Tailwind (modals, tables, badges, stats, forms)
- **Prisma 7** - ORM with split schema files, one .prisma file per model
- **Neon PostgreSQL** - Serverless cloud PostgreSQL database
- **NextAuth v5 (Auth.js)** - Authentication with Credentials provider, JWT sessions and role callbacks
- **bcryptjs** - Password hashing
- **Zod** - Server-side form and input validation
- **Google Gemini 2.5 Flash** - AI model for nutrition plan generation
- **Vercel** - Cloud deployment

---

## Project Architecture

The project follows a **feature-first architecture**. Code is organised by domain, not by technical layer.

```
src/
  app/                          # Next.js routes and pages
    (auth)/login/               # Login page
    (dashboard)/dashboard/      # Protected dashboard (layout applies requireUser)
      admin/                    # Admin-only pages (trainers, subscriptions)
      trainer/                  # Trainer-only pages (clients, exercises, plans...)
    page.tsx                    # Landing page, imports from components/landing/

  components/
    landing/                    # Landing page (one file per section)
    layout/                     # Shared dashboard shell, sidebar, header, nav

  features/                     # One folder per domain
    auth/                       # Login form, session, password hashing
    admin/                      # Trainer and subscription management
    clients/                    # Client CRUD + preferred time picker
    exercises/                  # Exercise catalogue
    training-plans/             # Plan builder + exercise assignments
    appointments/               # Calendar grid + appointment CRUD
    progress/                   # Client overview + session logging
    nutrition/                  # AI plan generation + Gemini integration

  lib/
    prisma.ts                   # Prisma singleton with Neon adapter
    permissions.ts              # requireAdmin, requireTrainer, requireClient

  proxy.ts                      # NextAuth middleware, route protection

prisma/
  models/                       # Split schema files (one per model)
  migrations/                   # Migration history
  seed.ts                       # Demo data
```

**Convention:** Files are kept under ~150 lines. Each feature folder separates `types/`, `schemas/`, `server/` (queries + actions) and `components/`.

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file in the project root:
DATABASE_URL=your_neon_pooler_connection_string
DIRECT_URL=your_neon_direct_connection_string
AUTH_SECRET=any_random_secret_string
GEMINI_API_KEY=your_google_gemini_api_key

# 3. Apply database migrations
npx prisma migrate dev

# 4. Seed the database with demo data
npm run db:seed

# 5. Start the development server
npm run dev
# Open http://localhost:3000
```

---

## Security

- Passwords are hashed with **bcrypt** before being stored, plain text passwords are never saved
- All dashboard routes are protected by **NextAuth middleware** in `proxy.ts`
- Every server action performs **server-side ownership checks**, a trainer cannot read or modify another trainer's data regardless of what is sent from the browser
- **SQL injection** is prevented by Prisma's parameterised queries
- **XSS** is prevented by Next.js's automatic output escaping in JSX
- **Environment variables** (API keys, database credentials, auth secret) are stored as server-side environment variables and never exposed to the client bundle

---

## Use of Generative AI

In compliance with the INFS3202/7202 course policy on the use of generative AI tools:

### Tools Used

- **Claude Code (Anthropic)** - used as an AI coding assistant during development
- **Google Gemini** - integrated within the application as the model powering the AI Nutritional Assistant feature

### How AI Was Used

- **CSS and visual styling** - Tailwind CSS class combinations, DaisyUI component configuration, responsive layout patterns, gradient effects and glassmorphism styling for the landing page
- **Project structure** - Guidance on organising the feature-first folder architecture and deciding how to split large files into smaller, focused components, actions, queries and schemas
- **Specific functions** - Assistance with functions that were challenging to implement independently, including the monthly calendar grid generation algorithm, complex Prisma queries with nested relations, and Zod schema refinements for multi-field validations

### What Was Done Independently

All application logic, business rules, security decisions, database schema design and architectural choices were made by the student. AI tools were used as a learning aid and productivity tool to support understanding and implementation, not to replace it.

---

*INFS3202 / INFS7202 - Web Information Systems - The University of Queensland 2026*
*Student: Gonzalo Die Morales*
