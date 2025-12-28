# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Origin Website v1 - A cybersecurity services marketing website with admin CMS, built with Next.js 15, React 19, TypeScript, and Bun. Features blog management, lead capture, newsletter system, and authentication.

## Development Commands

```bash
bun dev          # Development server with Turbopack (localhost:3000)
bun run build    # Production build
bun start        # Start production server
bun run lint     # Linting (fix with: bun run lint -- --fix)

# Database (Drizzle ORM + PostgreSQL)
bun run db:generate   # Generate migrations from schema changes
bun run db:migrate    # Run migrations
bun run db:push       # Push schema directly (dev only)
bun run db:studio     # Open Drizzle Studio GUI
bun run db:seed       # Seed admin user
bun run db:seed:blog  # Seed blog data

# UI Components
bunx shadcn@latest add [component]  # Add shadcn/ui component
```

## Architecture

### Route Groups
- `src/app/(marketing)/` - Public pages (no URL prefix)
- `src/app/(auth)/` - Sign-in/sign-up pages
- `src/app/admin/` - Protected admin dashboard (requires authentication)
- `src/app/api/` - API routes (auth, admin CRUD, public endpoints, newsletter)

### API Route Structure
```
/api/auth/[...all]           # Better Auth handler
/api/admin/posts             # Blog CRUD (protected)
/api/admin/categories        # Category management
/api/admin/tags              # Tag management
/api/admin/comments          # Comment moderation
/api/admin/leads             # Lead management + export
/api/admin/subscribers       # Newsletter subscribers + export
/api/public/posts            # Public blog listing
/api/public/posts/[slug]     # Single post by slug
/api/public/categories       # Public categories
/api/newsletter/subscribe    # Newsletter signup
/api/newsletter/confirm      # Email confirmation
/api/newsletter/unsubscribe  # Unsubscribe
/api/contact                 # Contact form
```

### Database (Drizzle + PostgreSQL)
- Schema: `src/db/schema/` (auth, blog, leads, services, chat, email)
- Client: `src/db/index.ts` - Drizzle client singleton
- Config: `drizzle.config.ts`
- Migrations: `src/db/migrations/`
- Seeds: `src/db/seed/`

### Authentication (Better Auth)
- Config: `src/lib/auth.ts` - Server-side auth setup
- Client: `src/lib/auth-client.ts` - React hooks (`useSession`, `signIn`, `signOut`)
- Middleware: `src/middleware.ts` - Protects `/admin/*` routes
- Session cookie: `better-auth.session_token`

### Component Organization
- `components/ui/` - shadcn/ui primitives (new-york style)
- `components/layout/` - Header, footer, navigation, topbar
- `components/marketing/home/` - Homepage sections
- `components/admin/` - Admin dashboard components (sidebar, forms, tables)
- `components/blog/` - Blog listing, detail, sidebar components
- `components/common/` - Container wrapper for consistent max-width
- `components/providers/` - ThemeProvider context

## Key Patterns

### Animation Usage
Import variants from `@/lib/animations` and use with Motion.js:
```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { motion } from 'motion/react';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.div variants={fadeInUp}>{content}</motion.div>
</motion.div>
```

### Styling
- Tailwind CSS v4 with OKLCH color system
- Use `cn()` from `@/lib/utils` for conditional classes
- Theme: dark/light/system via next-themes
- Typography: `font-satoshi` for headings, `font-sans` (Inter) for body

### Server vs Client Components
Default to Server Components. Add `'use client'` only for interactivity, hooks, or browser APIs.

### Form Handling
Uses react-hook-form with zod validation:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

### Admin API Pattern
Protected routes check session via Better Auth. Example:
```tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user || session.user.role !== "admin") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### Rich Text Editor
Uses Tiptap for blog content editing in admin panel with extensions for images, links, code blocks.

## Key Configuration Files
- `src/lib/constant.ts` - Navigation items (NavItem/SubMenuItem interfaces)
- `src/lib/animations.ts` - Motion.js variants (fadeInUp, staggerContainer, etc.)
- `src/lib/icon-map.ts` - Dynamic Lucide icon mapping
- `src/config/site.ts` - Site metadata and social links
- `src/lib/validations/` - Zod schemas for forms

## Path Aliases

`@/*` maps to `./src/*` (e.g., `@/components/ui/button`, `@/lib/utils`, `@/db`)
