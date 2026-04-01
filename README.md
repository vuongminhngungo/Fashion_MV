# FashionMN

Modern fashion e-commerce storefront built with Next.js 15, TypeScript, Tailwind CSS v4, Prisma, Zustand, React Query, and mock auth flows.

## Features

- Next.js 15 App Router storefront
- Responsive home, products, product detail, cart, checkout, wishlist, orders, auth, and search pages
- REST endpoints at `/api/products`, `/api/products/[slug]`, and `/api/search`
- Prisma schema and seed script for PostgreSQL
- Client state with Zustand for cart and wishlist
- React Hook Form + Zod validation
- Toast notifications and loading skeletons
- Build-safe mock fallback product data when PostgreSQL is unavailable

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Framer Motion-ready component structure

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy [`.env.example`](.env.example) to [`.env`](.env) and update the values:

```bash
copy .env.example .env
```

Required variables:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run migrations if you have a PostgreSQL database configured:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run prisma:seed
```

## Run the Project

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Notes

- If PostgreSQL is unavailable or credentials are invalid, the storefront falls back to mock data through [`lib/data.ts`](lib/data.ts).
- Prisma-related runtime warnings may still appear during fallback mode because the app attempts database access first, then safely falls back.
- The current implementation includes the main storefront flow and mock account/order experience.

## Project Structure

- [`app/`](app/) - App Router pages, route handlers, layout, sitemap
- [`components/`](components/) - UI, layout, product, cart, and shared components
- [`lib/`](lib/) - Prisma client, fallback data layer, validators, utilities
- [`store/`](store/) - Zustand stores
- [`hooks/`](hooks/) - reusable hooks
- [`prisma/`](prisma/) - schema and seed data

## Validation

The project currently passes:

- [`npm run typecheck`](package.json:11)
- [`npm run build`](package.json:8)
