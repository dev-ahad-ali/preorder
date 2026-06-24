# Preorder Manager

A full-stack Next.js 16 application for managing preorders, built with Prisma (SQLite) and Shadcn UI.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **Database ORM:** Prisma 7 with SQLite
- **Package Manager:** pnpm
- **UI Components:** Shadcn UI (Radix primitives)

## Setup

```bash
# Install dependencies
pnpm install

# Push the Prisma schema to create the SQLite database
pnpm prisma db push

# Seed the database with sample data
pnpm prisma db seed

# Start the development server
pnpm dev
```

## Directory Structure

```
├── app/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Preorder list page (server component)
│   ├── globals.css           # Global styles
│   ├── new/
│   │   └── page.tsx          # Create preorder form
│   ├── [id]/
│   │   └── edit/
│   │       └── page.tsx      # Edit preorder form
│   └── generated/prisma/     # Generated Prisma client (do not edit)
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── preorder-table.tsx    # Table with filtering, sorting, selection
│   ├── preorder-form.tsx     # Create/Edit form
│   ├── sort-popover.tsx      # Sort dropdown
│   ├── pagination-bar.tsx    # Pagination controls
│   └── date-time-picker.tsx  # Date-time picker component
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── actions.ts            # Server Actions (CRUD)
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
└── package.json
```

## Features

- **List Page:** Filter by status (All/Active/Inactive), sort by multiple fields, paginate, select rows, toggle status inline, delete records
- **Create/Edit Form:** Full form with validation, date-time picker, stepper for products, status toggle
- **Backend-driven:** Filtering, sorting, and pagination are handled via URL query params and Prisma queries

## Routes

| Route        | Description     |
| ------------ | --------------- |
| `/`          | Preorder list   |
| `/new`       | Create preorder |
| `/[id]/edit` | Edit preorder   |
