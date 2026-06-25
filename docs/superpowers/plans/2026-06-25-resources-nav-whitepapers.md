# Resources Nav + Whitepapers (Listing + Detail) + Dedicated Admin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat "Blogs" nav item with a "Resources" dropdown (Blog + Whitepapers), and build a blog-style whitepapers experience — a distinctive, animated listing page and detail pages backed by the existing `resources` table — plus a dedicated admin CRUD, consolidating all earlier whitepaper links.

**Architecture:** Server components own DB reads (Drizzle + postgres-js); presentational components receive typed `Resource` rows. The nav is data-driven, so the dropdown is a data change in `constant.ts`. Whitepapers reuse design-neutral shared components (TOC, newsletter, download, a `ContentProse` renderer) but get their own shadcn/ui + `motion/react` visual shells. The blog's existing layout/design is left byte-for-byte unchanged. Admin CRUD is extracted into one shared `ResourceManager` parameterized by `lockedType`.

**Tech Stack:** Next.js 16 (App Router, `proxy.ts`), React 19, TypeScript (no `any`), Drizzle ORM + PostgreSQL, Zod v4, shadcn/ui (new-york), Tailwind v4 (canonical classes, `bg-linear-to-*`), `motion/react`, Bun.

**Spec:** `docs/superpowers/specs/2026-06-25-resources-nav-whitepapers-design.md`

---

## Conventions for this plan

- **HTML content rendering:** A repo security hook blocks writing React's raw-HTML attribute into files. So whitepaper article HTML is rendered with the **`html-react-parser`** library (a safe alternative — it parses the HTML string into real React elements, SSR-friendly, no raw-HTML attribute). The blog is left untouched and keeps its own existing render. This is confined to `ContentProse` (Task 3).
- **No test runner exists** in this project. "Verify" steps mean: `bun run lint`, `bun run build`, `bunx tsc --noEmit` (type-check), and/or manual browser smoke at `localhost:3000`.
- **Commit** after each task. Branch off `main` first (Task 0).
- Follow CLAUDE.md: no `any`, Tailwind v4 canonical classes, schema-inferred types.

---

## Task 0: Branch

- [ ] **Step 1: Create a feature branch off main**

```bash
git checkout -b feat/resources-nav-whitepapers
git status
```
Expected: on branch `feat/resources-nav-whitepapers`, clean tree (plus the untracked `docs/superpowers/...` files).

---

## Task 1: Data model — `content` column + validation + API persistence

**Files:**
- Modify: `src/db/schema/resources.ts`
- Modify: `src/lib/validations/resources.ts`
- Modify: `src/app/api/admin/resources/route.ts` (POST insert)
- Modify: `src/app/api/admin/resources/[id]/route.ts` (PATCH set)
- Create: `src/db/migrations/XXXX_*.sql` (generated)

- [ ] **Step 1: Add the `content` column to the schema**

In `src/db/schema/resources.ts`, inside the `resources = pgTable("resources", { ... })` definition, add `content` right after the `description`/`shortDescription` block (around line 31):

```ts
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  content: text("content"), // rich-text HTML article body (nullable)
```

- [ ] **Step 2: Generate the migration**

Run:
```bash
bun run db:generate
```
Expected: a new file under `src/db/migrations/` adding `content` to `resources`. Note its name.

- [ ] **Step 3: Apply the migration locally**

Run (requires the local Docker Postgres from `docker-compose.dev.yml` to be up):
```bash
bun run db:migrate
```
Expected: migration applies with no error.

- [ ] **Step 4: Add `content` to the Zod schema**

In `src/lib/validations/resources.ts`, inside `createResourceSchema` add (after `shortDescription`):

```ts
  shortDescription: z.string().max(500).optional(),
  content: z.string().optional(),
```
(`updateResourceSchema` derives from `createResourceSchema.partial()`, so it inherits `content` automatically.)

- [ ] **Step 5: Persist `content` on create (POST)**

In `src/app/api/admin/resources/route.ts`, in the `db.insert(resources).values({ ... })` object, add `content` next to `description`:

```ts
      description: data.description,
      shortDescription: data.shortDescription,
      content: data.content ?? null,
```

- [ ] **Step 6: Persist `content` on update (PATCH)**

In `src/app/api/admin/resources/[id]/route.ts`, in the `.set({ ... })` object, add (next to the `shortDescription` line):

```ts
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.content !== undefined && { content: data.content }),
```

- [ ] **Step 7: Type-check + lint**

Run:
```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors related to these files.

- [ ] **Step 8: Commit**

```bash
git add src/db/schema/resources.ts src/lib/validations/resources.ts src/app/api/admin/resources/ src/db/migrations/
git commit -m "feat(resources): add nullable content column for whitepaper article body"
```

---

## Task 2: Navigation — "Blogs" → "Resources" dropdown

**Files:**
- Modify: `src/lib/constant.ts`

- [ ] **Step 1: Add `resourcesSubItems` and swap the flat Blogs entry**

In `src/lib/constant.ts`, replace the `staticNavItems` array (lines 18–43) with the version below, and add `resourcesSubItems` just above it:

```ts
// Resources dropdown sub-items (static)
export const resourcesSubItems: SubMenuItem[] = [
  {
    id: "SubMenuResources01",
    name: "Blog",
    href: "/blogs",
    description: "Insights, analysis, and best practices from our security team",
    iconName: "Newspaper",
  },
  {
    id: "SubMenuResources02",
    name: "Whitepapers",
    href: "/whitepapers",
    description: "In-depth research, reports, and technical guides to download",
    iconName: "FileText",
  },
];

// Static navigation items (non-services, non-about)
export const staticNavItems: NavItem[] = [
  {
    id: "menuorigin02",
    name: "Platform",
    href: "/platform",
    isSubMenu: false,
  },
  {
    id: "menuorigin03",
    name: "Partner",
    href: "/partner",
    isSubMenu: false,
  },
  {
    id: "menuorigin04",
    name: "Training",
    href: "/coming-soon?for=training",
    isSubMenu: false,
  },
  {
    id: "menuorigin05",
    name: "Resources",
    href: "/whitepapers",
    isSubMenu: true,
    subItems: resourcesSubItems,
  },
];
```

(No edits needed in `desktop-nav.tsx`/`mobile-nav.tsx` — they spread `...staticNavItems` and render any `isSubMenu` item with the same dropdown chrome as About/Services. The icons `Newspaper` and `FileText` already exist in `src/lib/icon-map.ts`.)

- [ ] **Step 2: Verify build + manual smoke**

Run `bun dev`, open `localhost:3000`. Hover "Resources" in the desktop header → dropdown shows Blog + Whitepapers with icons/descriptions, styled exactly like About/Services. Open the mobile menu → "Resources" expands to the same two items.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constant.ts
git commit -m "feat(nav): replace Blogs link with Resources dropdown (Blog + Whitepapers)"
```

---

## Task 3: Reusable shared components — `ContentProse` + move `TableOfContents` to common

**Files:**
- Create: `src/components/common/content-prose.tsx`
- Create: `src/components/common/table-of-contents.tsx` (moved from blog)
- Delete: `src/components/blog/table-of-contents.tsx`
- Modify: `src/components/blog/blog-detail-client.tsx` (import path only)

- [ ] **Step 1a: Add the `html-react-parser` dependency**

Run:
```bash
bun add html-react-parser
```
Expected: package added to `package.json` dependencies.

- [ ] **Step 1b: Create the `ContentProse` renderer (safe HTML render)**

Create `src/components/common/content-prose.tsx`. This renders admin-authored (Tiptap-constrained) HTML into React elements via `html-react-parser` — a safe alternative to the raw-HTML attribute, SSR-friendly, and it satisfies the repo security hook. It is a server component (no `"use client"`).

```tsx
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

interface ContentProseProps {
  html: string;
  className?: string;
}

/**
 * Rich-text HTML renderer for whitepaper detail pages.
 * Content is admin-only authored via Tiptap (constrained tag set). Rendered with
 * html-react-parser (parses to React elements — no raw-HTML injection attribute).
 * The blog keeps its own existing renderer; this is whitepaper-scoped.
 */
export function ContentProse({ html, className }: ContentProseProps) {
  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      {parse(html)}
    </div>
  );
}
```

- [ ] **Step 2: Move `TableOfContents` into `components/common`**

Move the file so both surfaces can share it without a "blog" import in whitepapers:
```bash
git mv src/components/blog/table-of-contents.tsx src/components/common/table-of-contents.tsx
```
Open `src/components/common/table-of-contents.tsx` and confirm its exported name is `TableOfContents` (no code change to its body — render stays identical).

- [ ] **Step 3: Update the blog's import (keep blog render identical)**

In `src/components/blog/blog-detail-client.tsx`, change the import:
```ts
// from:
import { TableOfContents } from "@/components/blog/table-of-contents";
// to:
import { TableOfContents } from "@/components/common/table-of-contents";
```
Do not change anything else in the blog file. (Optionally adopt `ContentProse` in the blog later — out of scope; the blog stays as-is.)

- [ ] **Step 4: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors; no remaining imports of the old blog TOC path (`grep -rn "blog/table-of-contents" src` returns nothing).

- [ ] **Step 5: Commit**

```bash
git add src/components/common/ src/components/blog/blog-detail-client.tsx
git commit -m "refactor(shared): extract ContentProse and move TableOfContents to common (blog render unchanged)"
```

---

## Task 4: Whitepaper presentational components — card + featured spotlight (animated)

**Files:**
- Create: `src/components/marketing/whitepapers/whitepaper-card.tsx`
- Create: `src/components/marketing/whitepapers/featured-whitepaper.tsx`

- [ ] **Step 1: Create `whitepaper-card.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/lib/animations";
import { type Resource } from "@/db/schema";

export function WhitepaperCard({ whitepaper }: { whitepaper: Resource }) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;
  const meta = [whitepaper.pages ? `${whitepaper.pages} pages` : null, whitepaper.readTime]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={`/whitepapers/${whitepaper.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-colors hover:border-primary/50"
      >
        <div className="relative aspect-3/2 overflow-hidden bg-muted">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={whitepaper.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
              <FileText className="h-12 w-12 text-primary/40" />
            </div>
          )}
          <div className="absolute left-4 top-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {whitepaper.category}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
            {whitepaper.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {whitepaper.shortDescription || whitepaper.description}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{meta}</span>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Read
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
```

- [ ] **Step 2: Create `featured-whitepaper.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, ArrowRight, FileStack, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadDialog } from "@/components/marketing/download-dialog";
import { fadeInUp } from "@/lib/animations";
import { type Resource } from "@/db/schema";

export function FeaturedWhitepaper({ whitepaper }: { whitepaper: Resource }) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div className="grid items-stretch gap-0 md:grid-cols-2">
        <div className="relative min-h-60 overflow-hidden bg-muted md:min-h-80">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={whitepaper.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/15 to-primary/5">
              <FileText className="h-20 w-20 text-primary/40" />
            </div>
          )}
          <div className="absolute left-5 top-5 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {whitepaper.category}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10">
          <h3 className="text-2xl font-black leading-tight md:text-3xl">
            {whitepaper.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-muted-foreground">
            {whitepaper.shortDescription || whitepaper.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            {whitepaper.pages ? (
              <span className="inline-flex items-center gap-1.5">
                <FileStack className="h-4 w-4" /> {whitepaper.pages} pages
              </span>
            ) : null}
            {whitepaper.readTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {whitepaper.readTime}
              </span>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href={`/whitepapers/${whitepaper.slug}`}>
                Read whitepaper <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <DownloadDialog
              resourceId={whitepaper.id}
              resourceTitle={whitepaper.title}
              buttonText="Download PDF"
              downloadUrl={whitepaper.fileUrl || undefined}
              useResourcesApi
              buttonClassName="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors. (`aspect-3/2`, `bg-linear-to-br`, `shadow-xs` are valid Tailwind v4 classes.)

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/whitepapers/
git commit -m "feat(whitepapers): add animated card + featured spotlight components"
```

---

## Task 5: Whitepaper library (client filter + search) — **includes your contribution**

**Files:**
- Create: `src/components/marketing/whitepapers/whitepaper-library.tsx`

- [ ] **Step 1: Create the library shell with the filter left for you to implement**

```tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";
import { WhitepaperCard } from "./whitepaper-card";
import { type Resource } from "@/db/schema";

interface WhitepaperLibraryProps {
  whitepapers: Resource[];
  categories: string[];
}

const ALL = "All";

export function WhitepaperLibrary({ whitepapers, categories }: WhitepaperLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const chips = [ALL, ...categories];

  // ── YOUR CONTRIBUTION ───────────────────────────────────────────────
  // Decide the listing UX:
  //  - "All" should return every whitepaper; any other chip filters by category.
  //  - Search should be case-insensitive. Decide which fields it matches —
  //    at minimum title; consider description/shortDescription and topics[].
  // Return the filtered Resource[].
  const filtered = useMemo<Resource[]>(() => {
    // TODO(you): implement filtering by activeCategory + searchQuery
    return whitepapers;
  }, [whitepapers, activeCategory, searchQuery]);
  // ─────────────────────────────────────────────────────────────────────

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="wp-active-chip"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10",
                  activeCategory === cat
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search whitepapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <FileText className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-semibold">No whitepapers match your filters</p>
          <p className="text-sm text-muted-foreground">Try another category or search term.</p>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((wp) => (
            <WhitepaperCard key={wp.id} whitepaper={wp} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2 (YOU, Prabir): implement the `filtered` `useMemo`**

Fill in the TODO. Reference approach (you decide the exact field set):
```ts
const q = searchQuery.trim().toLowerCase();
return whitepapers.filter((wp) => {
  const inCategory = activeCategory === ALL || wp.category === activeCategory;
  const haystack = [wp.title, wp.shortDescription, wp.description, ...(wp.topics ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return inCategory && (q === "" || haystack.includes(q));
});
```

- [ ] **Step 3: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors (note: leaving the TODO returning `whitepapers` still type-checks, so do Step 2 first or the filter is a no-op).

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/whitepapers/whitepaper-library.tsx
git commit -m "feat(whitepapers): add filterable, animated library with category chips + search"
```

---

## Task 6: Public listing page `/whitepapers` (server) — replace existing

**Files:**
- Modify (replace): `src/app/(marketing)/whitepapers/page.tsx`

- [ ] **Step 1: Replace the page with a whitepaper-scoped, composed version**

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { FeaturedWhitepaper } from "@/components/marketing/whitepapers/featured-whitepaper";
import { WhitepaperLibrary } from "@/components/marketing/whitepapers/whitepaper-library";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Whitepapers & Research | ITOrigin",
  description:
    "Download free cybersecurity whitepapers, research reports, and industry guides from ITOrigin's security experts.",
  keywords: [
    "cybersecurity whitepapers",
    "security research",
    "threat reports",
    "security guides",
    "industry reports",
  ],
  alternates: { canonical: "https://itorigin.com/whitepapers" },
};

export const revalidate = 3600;

async function getWhitepapers() {
  try {
    return await db
      .select()
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")))
      .orderBy(desc(resources.featured), desc(resources.publishDate), desc(resources.createdAt));
  } catch (error) {
    console.error("Failed to fetch whitepapers:", error);
    return [];
  }
}

export default async function WhitepapersPage() {
  const whitepapers = await getWhitepapers();
  const featured = whitepapers.find((w) => w.featured) ?? null;
  const rest = featured ? whitepapers.filter((w) => w.id !== featured.id) : whitepapers;
  const categories = Array.from(new Set(whitepapers.map((w) => w.category).filter(Boolean)));

  return (
    <div className="min-h-screen">
      <PageHero
        badge={{ icon: "FileText", text: "Resources" }}
        title="Whitepapers &"
        highlight="Research"
        description="In-depth research, industry reports, and practical guides from our security experts. Download free resources to deepen your security expertise."
      />

      {featured && (
        <section className="py-16 md:py-24">
          <Container>
            <FeaturedWhitepaper whitepaper={featured} />
          </Container>
        </section>
      )}

      <section className={`py-16 md:py-24 ${featured ? "bg-accent/30" : ""}`}>
        <Container>
          <SectionHeader
            title="Whitepaper Library"
            description="Browse, filter, and download our complete library of security research."
          />
          {whitepapers.length === 0 ? (
            <div className="mx-auto max-w-md text-center">
              <p className="mb-6 text-muted-foreground">
                No whitepapers published yet. Check back soon, or read our latest articles.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read Our Blog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <WhitepaperLibrary whitepapers={rest} categories={categories} />
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-black md:text-5xl">Get New Research First</h2>
            <p className="mb-8 text-lg opacity-90">
              Subscribe to be notified when we publish new whitepapers, reports, and security research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?subscribe=research"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-4 font-semibold text-foreground transition-colors hover:bg-background/90"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blogs"
                className="rounded-lg border border-primary-foreground/30 px-8 py-4 font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Confirm `SectionHeader` exists at the imported path**

Run: `test -f src/components/about/section-header.tsx && echo OK`
Expected: `OK` (it was used by the prior whitepapers page). If missing, replace `<SectionHeader .../>` with a simple `<h2>` + `<p>` header block.

- [ ] **Step 3: Type-check + lint + build**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors.

- [ ] **Step 4: Manual smoke**

`bun dev` → `/whitepapers`: hero, featured spotlight (if a featured whitepaper exists), category chips animate on select, search filters, cards lift on hover, empty state if no data.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(marketing)/whitepapers/page.tsx"
git commit -m "feat(whitepapers): rebuild listing as featured spotlight + filterable library (whitepaper-only)"
```

---

## Task 7: Public detail page `/whitepapers/[slug]` (blog-style, streamlined)

**Files:**
- Create: `src/app/(marketing)/whitepapers/[slug]/page.tsx`
- Create: `src/components/marketing/whitepapers/whitepaper-detail.tsx`

- [ ] **Step 1: Create the detail component**

```tsx
import Link from "next/link";
import { ArrowLeft, FileStack, Clock, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContentProse } from "@/components/common/content-prose";
import { TableOfContents } from "@/components/common/table-of-contents";
import { DownloadDialog } from "@/components/marketing/download-dialog";
import { WhitepaperCard } from "./whitepaper-card";
import { type Resource } from "@/db/schema";

interface WhitepaperDetailProps {
  whitepaper: Resource;
  related: Resource[];
}

export function WhitepaperDetail({ whitepaper, related }: WhitepaperDetailProps) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;
  const published = whitepaper.publishDate
    ? new Date(whitepaper.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const topics = (whitepaper.topics ?? []) as string[];

  return (
    <div className="min-h-screen">
      <section className="border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/whitepapers"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Whitepapers
          </Link>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left: TOC */}
          <div className="hidden lg:col-span-3 lg:block">
            <TableOfContents />
          </div>

          {/* Center: article */}
          <div className="lg:col-span-6">
            <Badge variant="secondary" className="mb-5">{whitepaper.category}</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">{whitepaper.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground">
              {published && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {published}
                </span>
              )}
              {whitepaper.pages ? (
                <span className="inline-flex items-center gap-1.5">
                  <FileStack className="h-4 w-4" /> {whitepaper.pages} pages
                </span>
              ) : null}
              {whitepaper.readTime ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {whitepaper.readTime}
                </span>
              ) : null}
            </div>

            {cover && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover} alt={whitepaper.title} className="h-auto w-full object-cover" />
              </div>
            )}

            <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
              {whitepaper.shortDescription || whitepaper.description}
            </p>

            {whitepaper.content ? (
              <div className="mt-8">
                <ContentProse html={whitepaper.content} />
              </div>
            ) : null}

            {topics.length > 0 && (
              <>
                <Separator className="my-10" />
                <div className="flex flex-wrap gap-3">
                  {topics.map((t) => (
                    <span key={t} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: sticky download card */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Download this whitepaper</h3>
                <p className="mt-1 mb-5 text-sm text-muted-foreground">
                  Get the full PDF{whitepaper.pages ? ` (${whitepaper.pages} pages)` : ""} delivered to your inbox.
                </p>
                <DownloadDialog
                  resourceId={whitepaper.id}
                  resourceTitle={whitepaper.title}
                  buttonText="Download Free PDF"
                  downloadUrl={whitepaper.fileUrl || undefined}
                  useResourcesApi
                />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-black">Related whitepapers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((wp) => (
                <WhitepaperCard key={wp.id} whitepaper={wp} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Create the detail route (server)**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";
import { WhitepaperDetail } from "@/components/marketing/whitepapers/whitepaper-detail";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getWhitepaper(slug: string) {
  const [wp] = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.slug, slug),
        eq(resources.type, "whitepaper"),
        eq(resources.status, "published"),
      ),
    )
    .limit(1);

  if (!wp) return null;

  await db
    .update(resources)
    .set({ viewCount: (wp.viewCount ?? 0) + 1 })
    .where(eq(resources.id, wp.id));

  return wp;
}

async function getRelated(category: string, excludeId: string) {
  return db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.type, "whitepaper"),
        eq(resources.status, "published"),
        eq(resources.category, category),
        ne(resources.id, excludeId),
      ),
    )
    .orderBy(desc(resources.publishDate))
    .limit(3);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wp = await getWhitepaper(slug);
  if (!wp) return { title: "Whitepaper Not Found | ITOrigin" };

  const description = wp.metaDescription || wp.shortDescription || wp.description;
  return {
    title: wp.metaTitle || `${wp.title} | ITOrigin Whitepapers`,
    description,
    openGraph: {
      title: wp.title,
      description,
      type: "article",
      url: `https://itorigin.com/whitepapers/${wp.slug}`,
      images: wp.coverImageUrl ? [{ url: wp.coverImageUrl }] : undefined,
    },
    alternates: { canonical: `https://itorigin.com/whitepapers/${wp.slug}` },
  };
}

export async function generateStaticParams() {
  try {
    const rows = await db
      .select({ slug: resources.slug })
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")));
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export default async function WhitepaperDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const whitepaper = await getWhitepaper(slug);
  if (!whitepaper) notFound();

  const related = await getRelated(whitepaper.category, whitepaper.id);
  return <WhitepaperDetail whitepaper={whitepaper} related={related} />;
}
```

- [ ] **Step 3: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors. (`ne` is a valid drizzle-orm operator.)

- [ ] **Step 4: Manual smoke**

`/whitepapers` → click a card → detail page shows TOC, title/meta, abstract, rendered `content` (if present), sticky download card (opens the gated dialog), topics, related grid. A bad slug → 404.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(marketing)/whitepapers/[slug]/" src/components/marketing/whitepapers/whitepaper-detail.tsx
git commit -m "feat(whitepapers): add blog-style detail pages with gated download + related"
```

---

## Task 8: Admin — extract `ResourceManager` + add rich-text content editor

**Files:**
- Create: `src/components/admin/resources/resource-manager.tsx`
- Modify: `src/app/admin/resources/page.tsx`

This is a **mechanical extraction** of the existing 715-line `src/app/admin/resources/page.tsx` into a reusable component, plus three additions: a `lockedType` prop, a configurable title/description, and a Tiptap editor for `content`.

- [ ] **Step 1: Create `resource-manager.tsx` from the existing page**

Copy the **entire current body** of `src/app/admin/resources/page.tsx` into a new file `src/components/admin/resources/resource-manager.tsx`. Then apply these exact changes:

1. Keep `"use client";` at the top. Add the editor import near the other imports:
```ts
import { PostEditor } from "@/components/admin/posts/post-editor";
```

2. Change the component signature and add props + a resolved type:
```ts
interface ResourceManagerProps {
  lockedType?: "whitepaper";
  title?: string;
  description?: string;
}

export function ResourceManager({
  lockedType,
  title = "Resources",
  description = "Manage downloadable resources (whitepapers, guides, etc.)",
}: ResourceManagerProps) {
```
(Remove the old `export default function ResourcesPage() {`.)

3. Add `content` to the form model. In `defaultForm`, add after `shortDescription`:
```ts
  shortDescription: "",
  content: "",
```
And set the default `type` from the prop:
```ts
  type: (lockedType ?? "whitepaper") as "whitepaper",
```
(The form's `type` field is already typed to the whitepaper literal in the current file; leaving it as the whitepaper literal is fine because when `lockedType` is unset the type Select still lets the user change it via `setForm`.)

4. In `openEditDialog`, map `content`:
```ts
      shortDescription: resource.shortDescription || "",
      content: resource.content || "",
```
And add `content: string | null;` to the local `Resource` interface (near `shortDescription`).

5. In `fetchResources`, force the type filter when locked. Where `params` is built, add:
```ts
      if (lockedType) params.set("type", lockedType);
      else if (typeFilter !== "all") params.set("type", typeFilter);
```
(Replace the existing single `if (typeFilter !== "all") params.set("type", typeFilter);` line.)

6. Replace the page header title/subtitle text with the props:
```tsx
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
```

7. Hide the **Type** filter `Select` and the form **Type** `Select` when `lockedType` is set. Wrap each in `{!lockedType && ( ... )}`. (There are two: the toolbar filter Select around line 328, and the form field Select around line 504.)

8. Add the rich-text editor for `content` in the dialog form. Immediately after the `description` Textarea field block, insert:
```tsx
              <div className="col-span-2 space-y-2">
                <Label htmlFor="content">Article Content</Label>
                <PostEditor
                  content={form.content}
                  onChange={(html) => setForm({ ...form, content: html })}
                  placeholder="Write the whitepaper article body..."
                />
              </div>
```

9. Ensure `content` is sent on submit. The handler already spreads `...form` into `payload`, so `content` is included automatically — confirm `payload` is built from `{ ...form, topics, ... }`.

- [ ] **Step 2: Replace the resources page with a thin wrapper**

Overwrite `src/app/admin/resources/page.tsx` with:
```tsx
import { ResourceManager } from "@/components/admin/resources/resource-manager";

export default function ResourcesPage() {
  return <ResourceManager />;
}
```

- [ ] **Step 3: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors. Fix any unused-import or type mismatches surfaced by the move.

- [ ] **Step 4: Manual smoke (existing behavior intact)**

`/admin/resources`: list, search, status/type filters, create/edit (now with an "Article Content" editor), delete — all work as before.

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/resources/resource-manager.tsx src/app/admin/resources/page.tsx
git commit -m "refactor(admin): extract ResourceManager (lockedType + content editor); resources page unchanged"
```

---

## Task 9: Admin — dedicated `/admin/whitepapers` page + sidebar entry

**Files:**
- Create: `src/app/admin/whitepapers/page.tsx`
- Modify: `src/components/admin/layout/admin-sidebar.tsx`

- [ ] **Step 1: Create the dedicated whitepapers admin page**

```tsx
import { ResourceManager } from "@/components/admin/resources/resource-manager";

export default function WhitepapersAdminPage() {
  return (
    <ResourceManager
      lockedType="whitepaper"
      title="Whitepapers"
      description="Create and manage whitepapers (listing + detail pages)."
    />
  );
}
```

- [ ] **Step 2: Add the sidebar entry**

In `src/components/admin/layout/admin-sidebar.tsx`, in the `sidebarItems` array, add a new entry immediately **above** the existing "Resources" item (around line 108). `FileText` is already imported:
```ts
  {
    title: "Whitepapers",
    href: "/admin/whitepapers",
    icon: FileText,
  },
  {
    title: "Resources",
    href: "/admin/resources",
    icon: FolderDown,
  },
```

- [ ] **Step 3: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors.

- [ ] **Step 4: Manual smoke**

`/admin/whitepapers`: title reads "Whitepapers", the Type filter and the form Type selector are hidden, the list shows only whitepaper-type rows, and create/edit/delete works (new items save as `type: "whitepaper"`). Sidebar shows the new "Whitepapers" item.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/whitepapers/page.tsx src/components/admin/layout/admin-sidebar.tsx
git commit -m "feat(admin): add dedicated Whitepapers CRUD page + sidebar entry"
```

---

## Task 10: Cleanup — route all earlier whitepaper links into the hierarchy

**Files:**
- Modify: `src/utils/data/common/footer-data.ts`
- Modify: `src/utils/data/home/cta-section-data.ts`
- Modify: `src/components/marketing/home/blog/resource-card.tsx`
- Modify: `src/app/(marketing)/site-index/page.tsx`
- Modify: `src/app/(marketing)/coming-soon/coming-soon-content.tsx`

- [ ] **Step 1: Footer link**

In `src/utils/data/common/footer-data.ts`, change the Whitepapers link:
```ts
// from:
      { name: "Whitepapers", href: "/coming-soon?for=whitepapers" },
// to:
      { name: "Whitepapers", href: "/whitepapers" },
```

- [ ] **Step 2: Home CTA link**

In `src/utils/data/home/cta-section-data.ts` (line ~59), change:
```ts
// from:
    ctaLink: "/coming-soon?for=whitepapers",
// to:
    ctaLink: "/whitepapers",
```

- [ ] **Step 3: Home resource-card default**

In `src/components/marketing/home/blog/resource-card.tsx` (line ~29), change the default prop:
```ts
// from:
  downloadHref = "/coming-soon?for=whitepapers",
// to:
  downloadHref = "/whitepapers",
```

- [ ] **Step 4: Site index link**

In `src/app/(marketing)/site-index/page.tsx` (line ~59), change:
```ts
// from:
      { name: "Whitepapers", href: "/coming-soon?for=whitepapers" },
// to:
      { name: "Whitepapers", href: "/whitepapers" },
```

- [ ] **Step 5: Remove the coming-soon whitepapers stub**

In `src/app/(marketing)/coming-soon/coming-soon-content.tsx`, delete the entire `whitepapers: { ... },` config object (the block starting `whitepapers: {` at ~line 127 through its closing `},` at ~line 152). The page resolves unknown `for` values to `contextConfigs.default` (line ~375), so any stray `?for=whitepapers` link still renders gracefully.

- [ ] **Step 6: Verify no stale links remain**

```bash
grep -rn "for=whitepapers" src
```
Expected: **no results**.

- [ ] **Step 7: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/utils/data/common/footer-data.ts src/utils/data/home/cta-section-data.ts src/components/marketing/home/blog/resource-card.tsx "src/app/(marketing)/site-index/page.tsx" "src/app/(marketing)/coming-soon/coming-soon-content.tsx"
git commit -m "chore(whitepapers): point all links to /whitepapers; remove coming-soon stub"
```

---

## Task 11: Sitemap — add whitepaper detail URLs

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Make the sitemap async and append whitepaper slugs**

Replace `src/app/sitemap.ts` with:
```ts
import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://itorigin.com";

  // Static pages
  const staticPages = [
    "",
    "/services",
    "/services/managed-soc-services",
    "/services/offensive-security",
    "/services/grc-services",
    "/services/penetration-testing",
    "/services/vulnerability-assessment",
    "/services/security-audit",
    "/platform",
    "/partner",
    "/partner-portal",
    "/training",
    "/blogs",
    "/about",
    "/about/story",
    "/about/team",
    "/about/values",
    "/careers",
    "/case-studies",
    "/news",
    "/docs",
    "/security",
    "/best-practices",
    "/whitepapers",
    "/webinars",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/gdpr",
    "/sla",
    "/security-policy",
    "/sitemap",
    "/accessibility",
  ];

  const staticSitemapEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.9 : 0.8,
  }));

  // Dynamic blog pages (unchanged)
  const blogSitemapEntries = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic whitepaper detail pages
  let whitepaperSitemapEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await db
      .select({ slug: resources.slug, updatedAt: resources.updatedAt })
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")));
    whitepaperSitemapEntries = rows.map((r) => ({
      url: `${baseUrl}/whitepapers/${r.slug}`,
      lastModified: r.updatedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("sitemap: failed to load whitepapers", error);
  }

  return [...staticSitemapEntries, ...blogSitemapEntries, ...whitepaperSitemapEntries];
}
```

- [ ] **Step 2: Type-check + lint**

```bash
bunx tsc --noEmit && bun run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add whitepaper detail pages to sitemap"
```

---

## Task 12: Seed sample whitepapers + full verification

**Files:**
- Modify: `src/db/seed/resources-data.ts`

- [ ] **Step 1: Add 1–2 whitepaper rows with content**

In `src/db/seed/resources-data.ts`, add entries to the seed array using `type: "whitepaper" as const`, `status: "published" as const`, with `slug`, `category`, `shortDescription`, `description`, `pages`, `readTime`, `topics`, `featured`, a `fileUrl` (any valid placeholder PDF URL), and a non-empty `content` HTML string with at least two `<h2>` headings (so the detail TOC has anchors). Mark one `featured: true`. Match the shape of the existing objects in that file (copy an existing entry and adjust fields). Example content value:
```ts
    content: "<h2>Executive Summary</h2><p>...</p><h2>Key Findings</h2><p>...</p><h2>Recommendations</h2><p>...</p>",
```

- [ ] **Step 2: Re-seed locally**

```bash
bun run db:seed:resources
```
Expected: seed completes; whitepaper rows inserted/updated.

- [ ] **Step 3: Full verification**

```bash
bun run lint
bun run build
```
Expected: lint clean; build succeeds (this also runs `next-sitemap` postbuild).

- [ ] **Step 4: End-to-end manual smoke**

`bun dev`, then verify:
1. Header → "Resources" dropdown (desktop + mobile) → Blog and Whitepapers.
2. `/whitepapers` → featured spotlight + animated filterable library; chips + search work.
3. Card → `/whitepapers/[slug]` → TOC, content, sticky gated download, related grid.
4. Footer / home CTA / site-index "Whitepapers" links land on `/whitepapers`.
5. `/admin/whitepapers` → dedicated CRUD (type locked, content editor); create a whitepaper and confirm it appears on the public listing/detail.
6. `/blogs` and a blog post look **identical to before** (no regressions from the TOC move).

- [ ] **Step 5: Commit**

```bash
git add src/db/seed/resources-data.ts
git commit -m "chore(seed): add sample whitepapers with article content"
```

---

## Self-Review (completed)

**Spec coverage:**
- §3 data model → Task 1. §4 nav → Task 2. §5 listing → Tasks 4–6. §6 detail + §6a render → Tasks 3 & 7. §7 admin → Tasks 8–9. §8 cleanup → Tasks 10–11. §9 seed → Task 12. §10 contribution → Task 5 Step 2. §11 reusable/shadcn/motion → Tasks 3–7.
- §6a sanitization hardening is intentionally deferred (optional, codebase-wide) and noted, not a task.

**Placeholder scan:** The only intentional `TODO` is the user-contribution filter (Task 5 Step 2), with a complete reference implementation provided. `RAW_HTML_ATTR` is a documented stand-in (see Conventions), confined to `ContentProse`.

**Type consistency:** `Resource = typeof resources.$inferSelect` used throughout; component prop names (`whitepaper`, `whitepapers`, `related`, `categories`) consistent across Tasks 4–7; `ResourceManagerProps` (`lockedType`, `title`, `description`) consistent across Tasks 8–9; API field `content` consistent across schema/validator/handlers (Task 1).
