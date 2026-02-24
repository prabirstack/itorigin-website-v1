# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Origin Website v1 - A cybersecurity services marketing website with admin CMS, built with Next.js 16, React 19, TypeScript, and Bun. Features blog management, case studies, testimonials, events/webinars, appointments, lead capture, newsletter campaigns, downloadable resources, AI chat support, and authentication.

## Strict Rules

### TypeScript - No `any` Type
**NEVER use `any` type.** Always use proper, explicit types:
- Use schema-inferred types from Drizzle: `type User = typeof users.$inferSelect`
- Use Zod-inferred types: `type FormData = z.infer<typeof formSchema>` (project uses Zod v4)
- Use `unknown` with type guards when type is truly unknown
- Use `Partial<T>`, `Pick<T>`, `Omit<T>` for derived types
- Import and use existing types from schema files (e.g., `NewSiteSettings`, `SiteSettings`)

```tsx
// WRONG
const data = response as any;
function process(input: any) {}

// CORRECT
import { type SiteSettings, type NewSiteSettings } from "@/db/schema";
const data = response as SiteSettings;
function process(input: Partial<NewSiteSettings>) {}
```

### Tailwind CSS v4 - Modern Syntax Only
**Always use Tailwind v4 canonical class names.** Never use deprecated v3 syntax or arbitrary bracket values when a canonical class exists.

**Gradient classes:** Use `bg-linear-to-*` instead of `bg-gradient-to-*` (e.g., `bg-linear-to-r`, `bg-linear-to-br`, `bg-linear-to-bl`).

**Spacing:** Use canonical values, not arbitrary brackets. Scale: 1 unit = 4px.

| Avoid (arbitrary) | Use (canonical) |
|-------------------|-----------------|
| `min-h-[100px]` | `min-h-25` |
| `w-[200px]` | `w-50` |
| `max-w-[300px]` | `max-w-75` |
| `gap-[20px]` | `gap-5` |
| `p-[16px]` | `p-4` |
| `rounded-[8px]` | `rounded-lg` or `rounded-2` |

Common conversions: 25=100px, 35=140px, 40=160px, 50=200px, 75=300px, 100=400px

## Development Commands

```bash
bun dev          # Development server with Turbopack (localhost:3000)
bun run build    # Production build (+ automatic sitemap via next-sitemap postbuild)
bun start        # Start production server
bun run lint     # Linting (fix with: bun run lint -- --fix)

# Database (Drizzle ORM + PostgreSQL)
bun run db:generate   # Generate migrations from schema changes
bun run db:migrate    # Run migrations
bun run db:push       # Push schema directly (dev only)
bun run db:studio     # Open Drizzle Studio GUI
bun run db:seed              # Seed admin user
bun run db:seed:blog         # Seed blog data
bun run db:seed:resources    # Seed resources data
bun run db:seed:case-studies # Seed case studies data
bun run db:seed:testimonials # Seed testimonials data
bun run db:seed:campaigns    # Seed campaigns data

# UI Components
bunx shadcn@latest add [component]  # Add shadcn/ui component
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `BETTER_AUTH_SECRET` - Auth secret (min 32 chars)
- `BETTER_AUTH_URL` - App URL for auth redirects
- `REDIS_URL` - Redis for rate limiting (Upstash)
- `RESEND_API_KEY` - Email service API key
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google AI (Gemini) for chat
- `NEXT_PUBLIC_APP_URL` - Public app URL

## Architecture

### Route Groups & Layouts
- `src/app/(marketing)/` - Public pages with Topbar, SiteHeader, ChatSupport, SiteFooter
- `src/app/(auth)/` - Sign-in/sign-up with centered card layout
- `src/app/admin/` - Protected dashboard with AdminSidebar + AdminHeader (redirects to `/sign-in` if unauthenticated, to `/` if not admin role)
- `src/app/api/` - API routes (auth, admin CRUD, public endpoints, newsletter)

Root layout wraps app in: ThemeProvider > SettingsProvider > ServicesProvider. Includes CookieConsent and Sonner toast notifications.

### API Route Pattern
All admin routes under `/api/admin/*` are protected with session checks (no middleware file). Follow this consistent pattern:
- `/api/admin/{resource}` - GET (list) and POST (create)
- `/api/admin/{resource}/[id]` - GET, PUT, DELETE for individual items
- Special endpoints: `/api/admin/{resource}/export` (CSV), `/api/admin/campaigns/[id]/send`

Resources: posts, categories, tags, comments, leads, subscribers, campaigns, services, case-studies, testimonials, events, appointments, resources, readers, chat, settings, stats, upload, profile

Public endpoints: `/api/public/posts`, `/api/public/posts/[slug]`, `/api/public/categories`, `/api/services`, `/api/settings`, `/api/resources`, `/api/leads`, `/api/contact`, `/api/chat`, `/api/newsletter/*`, `/api/auth/[...all]`

### Database (Drizzle + PostgreSQL)
- Schema: `src/db/schema/` - Exports from index.ts (auth, blog, leads, services, chat, email, settings, resources, case-studies, testimonials, events, appointments)
- Client: `src/db/index.ts` - Drizzle client singleton with postgres-js driver
- Config: `drizzle.config.ts`
- Migrations: `src/db/migrations/`
- Seeds: `src/db/seed/`

Schema workflow: Edit schema files → `bun run db:generate` → `bun run db:migrate`

**Neon Pooler Compatibility:** When writing raw SQL in API routes, use parameterized queries (`$1`, `$2`) instead of SQL template literals. The Neon connection pooler requires standard parameterized queries.

### Authentication (Better Auth)
- Config: `src/lib/auth.ts` - Server-side auth with email/password, session expiry 7 days
- Client: `src/lib/auth-client.ts` - React hooks (`useSession`, `signIn`, `signOut`)
- Users have a `role` field (defaults to "user", admin role for dashboard access)
- Type exports: `import type { Session, User } from "@/lib/auth";`
- Admin routes are protected via session check in each API route (no middleware file)

### Component Organization
- `components/ui/` - shadcn/ui primitives (new-york style)
- `components/layout/` - Header, footer, navigation, topbar, chat-support
- `components/marketing/` - Public page sections (home/, about/, case-studies/, testimonials/, events/)
- `components/admin/` - Admin dashboard components (sidebar, header, forms, tables)
- `components/blog/` - Blog listing, detail, sidebar, comments (requires sign-in)
- `components/common/` - Container, Logo (with dark/light mode support)
- `components/providers/` - ThemeProvider, SettingsProvider (fetches `/api/settings`), ServicesProvider (fetches `/api/services?nav=true`)

### Dynamic Navigation
Services in the navigation are populated from the database via `src/lib/constant.ts`. The `getServicesNavigation()` function fetches active services and maps them to nav items with icons from `src/lib/icon-map.ts`. Falls back to 3 default services if API fails.

## Key Patterns

### Styling
- Tailwind CSS v4 with OKLCH color system, configured in `src/styles/globals.css`
- Use `cn()` from `@/lib/utils` for conditional classes
- Theme: dark/light/system via next-themes (dark mode: `@custom-variant dark (&:is(.dark *))`)
- Typography: `font-satoshi` for headings, `font-sans` (Inter) for body
- Primary color: orange/amber in OKLCH space

### Animation Usage
Import variants from `@/lib/animations` and use with Motion.js (`motion/react`, not `framer-motion`):
```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { motion } from 'motion/react';

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.div variants={fadeInUp}>{content}</motion.div>
</motion.div>
```

### Server vs Client Components
Default to Server Components. Add `'use client'` only for interactivity, hooks, or browser APIs.

### Admin API Auth Pattern
```tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user || session.user.role !== "admin") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### Form Handling
Uses react-hook-form with Zod v4 validation:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

### Cache Revalidation
Use `revalidatePath()` or `revalidateTag()` from `next/cache` after mutations in API routes.

### Toast Notifications
Use `sonner` for toast messages: `import { toast } from 'sonner'`

### Key Libraries
- **Rich Text Editor:** Tiptap with extensions (images, links, code blocks, text alignment)
- **Email:** React Email templates in `src/emails/`, sent via Resend
- **File Uploads:** Vercel Blob storage via `/api/admin/upload`
- **AI Chat:** Google AI SDK (`@ai-sdk/google`), conversations stored in `chat` schema
- **Rate Limiting:** Upstash Redis (`@upstash/ratelimit`)
- **Date Formatting:** `date-fns`
- **ID Generation:** `nanoid`

## Key Configuration Files
- `src/lib/constant.ts` - Navigation items (NavItem/SubMenuItem interfaces), dynamic service navigation
- `src/lib/animations.ts` - Motion.js variants (fadeInUp, staggerContainer, etc.)
- `src/lib/icon-map.ts` - Dynamic Lucide icon mapping for services
- `src/config/site.ts` - Site metadata and social links
- `src/lib/validations/` - Zod schemas for all content types
- `next.config.ts` - Standalone output, security headers, image remote patterns (Unsplash, Google)

## Path Aliases

`@/*` maps to `./src/*` (e.g., `@/components/ui/button`, `@/lib/utils`, `@/db`)

## Content Types Reference

| Type | Schema | Statuses/Types | Admin Path |
|------|--------|----------------|------------|
| Posts | `blog.ts` | draft/published | `/admin/posts` |
| Testimonials | `testimonials.ts` | pending/approved/rejected | `/admin/testimonials` |
| Events | `events.ts` | webinar/workshop/conference/meetup | `/admin/events` |
| Appointments | `appointments.ts` | pending/confirmed/completed/cancelled/no_show | `/admin/appointments` |
| Campaigns | `email.ts` | draft/sent | `/admin/campaigns` |

## Logo Component

Use the Logo component from `@/components/common/logo` for consistent branding:
```tsx
import { Logo } from "@/components/common/logo";
<Logo href="/admin" size="sm" animated={false} />
```
Props: `href`, `size` (sm/md/lg), `animated`, `className`
