# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Origin Website v1 - A cybersecurity services marketing website with admin CMS, built with Next.js 15, React 19, TypeScript, and Bun. Features blog management, case studies, testimonials, events/webinars, appointments, lead capture, newsletter campaigns, downloadable resources, AI chat support, and authentication.

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
bun run db:seed              # Seed admin user
bun run db:seed:blog         # Seed blog data
bun run db:seed:resources    # Seed resources data
bun run db:seed:case-studies # Seed case studies data
bun run db:seed:testimonials # Seed testimonials data

# UI Components
bunx shadcn@latest add [component]  # Add shadcn/ui component
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth secret (min 32 chars)
- `BETTER_AUTH_URL` - App URL for auth redirects
- `REDIS_URL` - Redis for rate limiting (Upstash)
- `RESEND_API_KEY` - Email service API key
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google AI (Gemini) for chat
- `NEXT_PUBLIC_APP_URL` - Public app URL

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
/api/admin/categories        # Category management (with pagination)
/api/admin/tags              # Tag management
/api/admin/comments          # Comment moderation
/api/admin/leads             # Lead management + export
/api/admin/leads/[id]        # Individual lead details
/api/admin/subscribers       # Newsletter subscribers + export
/api/admin/campaigns         # Email campaign management
/api/admin/services          # Services CRUD (populates navigation)
/api/admin/case-studies      # Case studies CRUD
/api/admin/testimonials      # Testimonials CRUD with bulk actions
/api/admin/events            # Events/webinars CRUD
/api/admin/appointments      # Appointments scheduling CRUD
/api/admin/settings          # Site settings
/api/admin/resources         # Downloadable resources (whitepapers, etc.)
/api/admin/readers           # Users who have commented (with comment history)
/api/admin/chat              # Chat conversation management
/api/admin/stats             # Dashboard statistics
/api/admin/upload            # File uploads (Vercel Blob)
/api/admin/profile           # Admin profile (image upload, password change)
/api/public/posts            # Public blog listing
/api/public/posts/[slug]     # Single post by slug
/api/public/categories       # Public categories
/api/newsletter/subscribe    # Newsletter signup
/api/newsletter/confirm      # Email confirmation
/api/newsletter/unsubscribe  # Unsubscribe
/api/contact                 # Contact form
/api/chat                    # AI chat endpoint (Google AI SDK)
/api/services                # Public services list
/api/settings                # Public site settings
/api/resources               # Public resources list
/api/leads                   # Lead capture
```

### Database (Drizzle + PostgreSQL)
- Schema: `src/db/schema/` - Exports from index.ts (auth, blog, leads, services, chat, email, settings, resources, case-studies, testimonials, events, appointments)
- Client: `src/db/index.ts` - Drizzle client singleton
- Config: `drizzle.config.ts`
- Migrations: `src/db/migrations/`
- Seeds: `src/db/seed/` - admin.ts, blog-data.ts, resources-data.ts, case-studies-data.ts, campaigns-data.ts, testimonials-data.ts

Schema workflow: Edit schema files → `bun run db:generate` → `bun run db:migrate`

### Authentication (Better Auth)
- Config: `src/lib/auth.ts` - Server-side auth setup
- Client: `src/lib/auth-client.ts` - React hooks (`useSession`, `signIn`, `signOut`)
- Middleware: `src/middleware.ts` - Protects `/admin/*` routes
- Session cookie: `better-auth.session_token`

### Component Organization
- `components/ui/` - shadcn/ui primitives (new-york style)
- `components/layout/` - Header, footer, navigation, topbar, chat-support
- `components/marketing/home/` - Homepage sections
- `components/admin/` - Admin dashboard components (sidebar, header, forms, tables)
- `components/blog/` - Blog listing, detail, sidebar, comments (requires sign-in)
- `components/common/` - Container, Logo (with dark/light mode support)
- `components/providers/` - ThemeProvider, SettingsProvider, ServicesProvider contexts

### Dynamic Navigation
Services in the navigation are populated from the database via `src/lib/constant.ts`. The `getServicesNavigation()` function fetches active services and maps them to nav items with icons from `src/lib/icon-map.ts`.

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
Uses Tiptap for blog content editing in admin panel with extensions for images, links, code blocks, text alignment.

### Email Templates
React Email components in `src/emails/` for transactional emails (newsletter confirmation, contact form, campaigns). Sent via Resend.

### File Uploads
Uses Vercel Blob storage via `/api/admin/upload`. Returns public URLs for images in blog posts and resources.

### AI Chat
Uses Google AI SDK (`@ai-sdk/google`) for chat support. Conversations stored in `chat` schema tables.

## Key Configuration Files
- `src/lib/constant.ts` - Navigation items (NavItem/SubMenuItem interfaces), dynamic service navigation
- `src/lib/animations.ts` - Motion.js variants (fadeInUp, staggerContainer, etc.)
- `src/lib/icon-map.ts` - Dynamic Lucide icon mapping for services
- `src/config/site.ts` - Site metadata and social links
- `src/lib/validations/` - Zod schemas (post, category, lead, chat, campaign, service, settings, resources, case-study, testimonial, event, appointment)

## Path Aliases

`@/*` maps to `./src/*` (e.g., `@/components/ui/button`, `@/lib/utils`, `@/db`)

## Admin Dashboard

The admin dashboard (`/admin`) provides:
- **Overview stats** - Posts, leads, subscribers, comments, resources, campaigns
- **Content management** - Posts, categories, services, case studies, resources, testimonials
- **User engagement** - Comments moderation, readers (users who commented), chat conversations
- **Events & Scheduling** - Events/webinars management, appointments scheduling
- **Marketing** - Leads, subscribers, email campaigns
- **Settings** - Site configuration
- **Profile** - Admin profile with image upload and password change (`/admin/profile`)

### Admin UI Features
- Sticky sidebar with collapsible navigation
- Dark/light theme toggle
- Notification dropdown
- Animated counters and microanimations (Framer Motion)
- Pagination for all list views

## Logo Component

Use the Logo component from `@/components/common/logo` for consistent branding:
```tsx
import { Logo } from "@/components/common/logo";

// Full animated logo (default)
<Logo />

// With custom props
<Logo href="/admin" size="sm" animated={false} className="w-28 h-8" />
```
Props: `href`, `size` (sm/md/lg), `animated`, `className`

## Blog Comments

Comments require user authentication. The `BlogComments` component:
- Shows sign-in prompt for unauthenticated users
- Displays user name from session for authenticated commenters
- Reply functionality only visible to signed-in users

## Marketing Components

### TestimonialsSection
Located at `src/components/marketing/testimonials/testimonials-section.tsx`. Displays client testimonials with:
- Responsive grid: 3 columns (desktop), 2 columns (tablet), carousel (mobile)
- Auto-advancing carousel on mobile with manual navigation
- Star ratings, verified badges, service tags
- Trust indicators bar (client count, average rating, certifications)
- Props: `title`, `subtitle`, `featured`, `limit`, `industry`, `className`

```tsx
import { TestimonialsSection } from "@/components/marketing/testimonials";

<TestimonialsSection featured={true} limit={6} />
```

## Testimonials Management

The testimonials system includes:
- **Database schema** (`src/db/schema/testimonials.ts`): Status (pending/approved/rejected), ratings, featured flag, verification
- **Admin panel** (`/admin/testimonials`): CRUD with bulk actions (approve, reject, feature, verify)
- **Public API** (`/api/testimonials`): Filtered by featured, industry, status
- **Seed data** (`src/db/seed/testimonials-data.ts`): 6 sample testimonials

## Events/Webinars Management

The events system includes:
- **Database schema** (`src/db/schema/events.ts`): Events table and event_registrations for attendees
- **Event types**: webinar, workshop, conference, meetup
- **Admin panel** (`/admin/events`): Full CRUD with registration management
- **Features**: Capacity limits, registration tracking, virtual/in-person support

## Appointments Management

The appointments system includes:
- **Database schema** (`src/db/schema/appointments.ts`): Scheduling with time slots
- **Appointment types**: consultation, demo, support, meeting
- **Admin panel** (`/admin/appointments`): Schedule management with status tracking
- **Statuses**: pending, confirmed, completed, cancelled, no_show
