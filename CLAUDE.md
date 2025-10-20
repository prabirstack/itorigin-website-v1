# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IT Origin Website v1** - A modern cybersecurity services marketing website built with Next.js 15, React 19, and TypeScript. The site showcases IT Origin's cybersecurity offerings including Managed SOC, Offensive Security, and GRC services.

## Development Commands

**Important**: This project uses **Bun** as the package manager, not npm.

### Core Commands
```bash
# Development (uses Turbopack for fast builds)
bun run dev
# or simply
bun dev

# Production build
bun run build

# Start production server
bun start

# Linting
bun run lint

# Install dependencies
bun install

# Add a package
bun add <package-name>

# Add a dev dependency
bun add -d <package-name>
```

### Development Notes
- The dev server runs on `http://localhost:3000` by default
- Turbopack is enabled for faster development builds
- Hot reload is automatic for all file changes
- Bun provides faster package installation and script execution compared to npm

## Architecture Overview

### Next.js App Router Structure

This project uses Next.js 15 with the App Router paradigm:

- **Route Groups**: The `(marketing)` route group contains all public-facing pages without adding `/marketing` to URLs
- **Server Components**: All components are Server Components by default
- **Client Components**: Mark with `'use client'` directive only when needed (interactivity, hooks, browser APIs)

### Key Architectural Patterns

#### 1. Layout System
The app uses a nested layout architecture:
- `src/app/layout.tsx` - Root layout with theme provider, fonts, and global components (Header, Footer, Chat, Scroll-to-Top)
- `src/app/(marketing)/` - Marketing pages route group
- The layout includes Topbar → Header → Main Content → Footer → Floating Elements (Chat, Scroll-to-Top)

#### 2. Component Organization
```
components/
├── layout/          # Site-wide layout components (header, footer, nav, theme toggle)
├── ui/             # Base UI primitives (shadcn/ui components)
├── common/         # Shared utilities (Container)
├── marketing/      # Page-specific sections (home/, about/, services/, etc.)
└── providers/      # React context providers (theme)
```

#### 3. Configuration & Data
- **Navigation**: Centralized in `src/lib/constant.ts` with typed NavItem interfaces
- **Site Config**: Metadata and social links in `src/config/site.ts`
- **Animations**: Reusable Motion.js variants in `src/lib/animations.ts`
- **Icons**: Dynamic icon mapping in `src/lib/icon-map.ts`
- **Blog Data**: Temporary static data in `src/lib/blog-data.ts` (will be replaced by CMS)

#### 4. Styling Approach
- **Tailwind CSS v4** with OKLCH color system for better gradients
- **CSS Variables** for theming (defined in `src/styles/globals.css`)
- **Design System**: shadcn/ui "new-york" style with zinc base color
- **Utility Function**: `cn()` from `src/lib/utils.ts` for conditional class merging (clsx + tailwind-merge)

#### 5. Animation System
All animations use Motion.js (Framer Motion) with centralized variants:
- Import from `src/lib/animations.ts`
- Common variants: `fadeInUp`, `fadeInDown`, `staggerContainer`, `scaleUp`, etc.
- Scroll-triggered animations use `whileInView` with `viewport={{ once: true }}`
- Custom cubic bezier easing: `[0.22, 0.61, 0.36, 1]`

## Theme System

The site supports dark/light/system themes via `next-themes`:
- Theme provider configured in root layout with `attribute="class"`, `enableSystem`, `defaultTheme="system"`
- Theme toggle component: `src/components/layout/theme-toggle.tsx`
- Color variables defined for both modes in `globals.css`
- OKLCH color space for smoother gradients

## Typography

Two font families are configured:
- **Satoshi** (local): Display font for headings (Bold 700, Black 900) - `font-satoshi` variable
- **Inter** (Google Fonts): Body text - `font-inter-sans` variable
- Apply with Tailwind classes: `font-satoshi` or use default `font-sans`

## Path Aliases

TypeScript path aliases configured via `tsconfig.json`:
- `@/*` maps to `./src/*`
- Examples: `@/components/ui/button`, `@/lib/utils`, `@/config/site`

## Important Conventions

### Component Patterns

#### Server Component (Default)
```tsx
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

#### Client Component (When Needed)
```tsx
'use client';

export function InteractiveComponent() {
  const [state, setState] = useState(false);
  // ... hooks, event handlers
}
```

### Animation Usage
```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { motion } from 'motion/react';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Styling Pattern
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  props.className
)}>
```

## Navigation Structure

Navigation is defined in `src/lib/constant.ts` as `navItems` array:
- Main menu items with optional submenus (`isSubMenu` boolean)
- Services and About have dropdown submenus
- SubMenu items include descriptions for enhanced UX
- Used by both desktop and mobile navigation components

## Content Organization

### Current Pages
- **Home**: `/` - Main landing with hero carousel, services, benefits, CTA
- **Services**:
  - `/services/managed-soc-services`
  - `/services/offensive-security`
  - `/services/grc-services`
- **About**:
  - `/about` - Overview
  - `/about/story` - Company story
  - `/about/team` - Team page
  - `/about/values` - Core values
- **Other**:
  - `/blogs` - Blog listing
  - `/blogs/[slug]` - Dynamic blog posts
  - `/platform` - Platform page
  - `/partner` - Partner page
  - `/training` - Training page

### Future Development Roadmap

The project has a comprehensive development plan (see `DEVELOPMENT_PLAN.md`):
1. **Phase 1**: Backend infrastructure (Prisma, PostgreSQL, Authentication)
2. **Phase 2**: CMS development for blog management
3. **Phase 3**: AI chat support system
4. **Phase 4**: Email marketing automation
5. **Phase 5**: Advanced SEO optimization
6. **Phase 6**: Enhanced animations
7. **Phase 7**: Analytics & monitoring
8. **Phase 8**: Testing, security, deployment

## Working with Components

### Adding a New shadcn/ui Component
The project uses shadcn/ui with "new-york" style:
```bash
bunx shadcn@latest add [component-name]
```
Components are added to `src/components/ui/` with proper TypeScript types.

Note: Use `bunx` instead of `npx` when using Bun package manager.

### Creating Page Sections
For new marketing sections:
1. Create in `src/components/marketing/[page-name]/`
2. Use TypeScript for props
3. Import and use animation variants from `@/lib/animations`
4. Wrap in `<Container>` for consistent max-width
5. Follow mobile-first responsive design

## Code Quality

### TypeScript
- Strict mode enabled
- Define explicit types for all props and functions
- Use interfaces for object shapes
- Prefer type inference where obvious

### Linting
- ESLint configured with Next.js and TypeScript rules
- Run `bun run lint` before committing
- Fix auto-fixable issues with `bun run lint -- --fix`

### Component Structure
- One component per file (except small, tightly coupled helpers)
- Named exports for components, default export for pages
- Props interface/type defined above component
- Use TypeScript generics for reusable components

## Common Patterns

### Container Wrapper
Use the Container component for consistent page width:
```tsx
import { Container } from '@/components/common/container';

<Container>
  <YourContent />
</Container>
```

### Icons
Import from Lucide React:
```tsx
import { ChevronRight, Shield, Lock } from 'lucide-react';
```

### Conditional Rendering with Animation
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: isVisible ? 1 : 0 }}
>
```

## Performance Considerations

- Use Next.js `<Image>` component for all images
- Implement lazy loading for heavy components
- Keep client components small and focused
- Prefer Server Components for static content
- Use `loading.tsx` and `error.tsx` for better UX
- Video files are in `/public/videos/` (5 hero videos)

## Forms and Validation

Currently, forms use basic client-side validation. Future phases include:
- Zod schema validation
- Server-side form handling
- Better Auth for authentication
- React Hook Form integration

## Known Technical Debt

Based on project analysis:
- Blog data is currently static (`src/lib/blog-data.ts`) - will be replaced with CMS
- No backend/API routes yet - planned for Phase 1
- Forms submit client-side - needs server actions/API routes
- No database integration - Prisma + PostgreSQL planned
- Authentication not implemented - Better Auth planned

## Testing

Currently no tests configured. Future additions:
- Vitest for unit tests
- Playwright for E2E tests
- React Testing Library for component tests

## Deployment

Project is optimized for Vercel deployment:
- Next.js 15 with App Router
- Automatic static optimization
- Edge-ready with proper headers
- Environment variables via Vercel dashboard

Alternative deployment options:
- Docker containerization
- Self-hosted Node.js server
- AWS/GCP/Azure serverless

## SEO & Metadata

- Metadata exported from each page using Next.js Metadata API
- Site config in `src/config/site.ts`
- Follow Next.js conventions for `metadata` export in `layout.tsx` and `page.tsx`
- Future: Structured data (JSON-LD), Open Graph optimization, dynamic sitemaps

## Accessibility

- Semantic HTML structure
- Radix UI primitives for a11y compliance
- Keyboard navigation support
- Focus management in interactive components
- ARIA attributes where needed
- Future: WCAG AA compliance testing

## Environment Variables

Currently no environment variables in use. Future additions:
- Database connection strings
- API keys (OpenAI, Resend, etc.)
- Third-party service credentials
- Use `.env.local` for local development (gitignored)
- Use Vercel dashboard for production secrets

## Design Tokens

Key design values (from `globals.css`):
- **Border Radius**: `--radius: 0.5rem`
- **Primary Color**: OKLCH-based with light/dark variants
- **Font Variables**: `--font-satoshi`, `--font-inter-sans`
- **Breakpoints**: Follow Tailwind defaults (sm:640px, md:768px, lg:1024px, xl:1280px)

## When Making Changes

### Adding a New Page
1. Create route in `src/app/(marketing)/[page-name]/page.tsx`
2. Add to navigation in `src/lib/constant.ts` if needed
3. Create components in `src/components/marketing/[page-name]/`
4. Export metadata for SEO
5. Use consistent layout with Container and animations

### Modifying Navigation
1. Edit `src/lib/constant.ts` (navItems array)
2. Changes automatically reflect in desktop and mobile nav
3. Maintain TypeScript types (NavItem, SubMenuItem)

### Adding Animations
1. Check if suitable variant exists in `src/lib/animations.ts`
2. If not, add new variant following existing patterns
3. Import and use with Motion.js components
4. Use `whileInView` for scroll-triggered animations

### Styling Updates
1. Prefer Tailwind utility classes
2. Use `cn()` for conditional classes
3. Add custom CSS to `globals.css` only for truly global styles
4. Respect the theme system (light/dark variables)

## Project Vision

This is a marketing website that will evolve into a full-stack cybersecurity platform with:
- Content Management System for blogs
- AI-powered chat support
- Email marketing automation
- Client portal with authentication
- Advanced analytics and SEO

Keep this vision in mind when making architectural decisions - favor scalable patterns that can grow with the platform.
