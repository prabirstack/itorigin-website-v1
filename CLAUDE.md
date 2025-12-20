# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Origin Website v1 - A cybersecurity services marketing website built with Next.js 15, React 19, and TypeScript. Uses Bun as the package manager.

## Development Commands

```bash
bun dev          # Development server with Turbopack (localhost:3000)
bun run build    # Production build
bun start        # Start production server
bun run lint     # Linting (fix with: bun run lint -- --fix)
bunx shadcn@latest add [component]  # Add shadcn/ui component
```

## Architecture

### Route Structure
- `src/app/(marketing)/` - Public pages (route group, no URL prefix)
- `src/app/layout.tsx` - Root layout: Topbar → Header → Content → Footer → Chat/ScrollToTop

### Component Organization
- `components/layout/` - Header, footer, navigation, theme toggle
- `components/ui/` - shadcn/ui primitives (new-york style)
- `components/marketing/[page]/` - Page-specific sections (home/, about/, services/)
- `components/common/` - Container wrapper for consistent max-width

### Key Configuration Files
- `src/lib/constant.ts` - Navigation items with typed NavItem/SubMenuItem interfaces
- `src/lib/animations.ts` - Centralized Motion.js variants (fadeInUp, staggerContainer, etc.)
- `src/lib/icon-map.ts` - Dynamic icon mapping for Lucide icons
- `src/config/site.ts` - Site metadata and social links
- `src/lib/blog-data.ts` - Temporary static blog data (will be replaced by CMS)

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
- Use `cn()` from `@/lib/utils` for conditional classes (clsx + tailwind-merge)
- Theme: dark/light/system via next-themes with `attribute="class"`
- CSS variables in `src/styles/globals.css`

### Typography
- `font-satoshi` - Display font (Bold 700, Black 900) for headings
- `font-sans` (Inter) - Body text

### Server vs Client Components
Default to Server Components. Only add `'use client'` for interactivity, hooks, or browser APIs.

## Navigation

Navigation is defined in `src/lib/constant.ts`:
- Main items with optional `isSubMenu` boolean for dropdowns
- SubMenu items include descriptions for UX
- Used by both desktop and mobile navigation

## Current Technical Debt

- Blog data is static in `src/lib/blog-data.ts` - planned CMS integration
- No backend/API routes yet
- No database integration
- No authentication
- Forms are client-side only

See `DEVELOPMENT_PLAN.md` for the full backend development roadmap including Prisma, PostgreSQL, Better Auth, AI chat, and email marketing.

## Path Aliases

`@/*` maps to `./src/*` (e.g., `@/components/ui/button`, `@/lib/utils`)
