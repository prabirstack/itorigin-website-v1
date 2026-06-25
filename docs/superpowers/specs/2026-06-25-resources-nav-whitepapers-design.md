# Resources Nav Dropdown + Whitepapers (Listing + Detail) + Dedicated Admin

**Date:** 2026-06-25
**Status:** Approved (design) — pending implementation plan
**Author:** Prabir Singh (with Claude Code)

## 1. Summary

Replace the flat **"Blogs"** top-level nav item with a **"Resources"** dropdown
(matching the About/Services dropdown pattern) containing two sub-items:
**Blog** (`/blogs`) and **Whitepapers** (`/whitepapers`).

Rebuild the whitepapers experience to work **like the blog**: a dedicated
**listing page** (`/whitepapers`) and **detail pages** (`/whitepapers/[slug]`),
backed by the existing `resources` table (`type = 'whitepaper'`). Whitepapers gain
a rich article **`content`** body authored via the existing Tiptap editor, plus a
gated PDF download.

Add a **dedicated admin CRUD** at `/admin/whitepapers` (scoped to
`type='whitepaper'`) by extracting the existing resources admin UI into a shared,
reusable component — no duplication, behavior of the existing `/admin/resources`
page unchanged.

Consolidate/clean up all earlier whitepaper links and stubs so everything points
into this one hierarchy, reusing existing data.

## 2. Goals / Non-Goals

### Goals
- "Resources" dropdown styled identically to About/Services (zero new dropdown chrome).
- `/whitepapers` listing: **Featured Spotlight + filterable Card Library**.
- `/whitepapers/[slug]` detail: **blog-style, streamlined** (TOC + article body +
  sticky download card + related + newsletter; **no comments/likes**).
- **Extract design-neutral, reusable components shared by both blog and whitepapers**
  (TOC, newsletter, download, content-prose renderer, related-grid, back-link), with
  the **blog's existing layout and design kept 100% intact** (same render output).
- **Whitepapers get a distinct, modern, elegant visual identity** with tasteful
  **micro-animations** (`motion/react`): staggered card reveals, hover lift/tilt,
  animated category chips, cover gradient/scale on hover, sticky download card.
- Dedicated `/admin/whitepapers` CRUD with a rich-text editor for the article body.
- Reuse the existing `resources` schema/table and existing whitepaper rows.
- Clean up every earlier whitepaper page/link into this hierarchy.

### Non-Goals
- No changes to the blog itself.
- No new public API (listing/detail are server components querying the DB directly,
  matching how `/blogs` and the current `/whitepapers` already work).
- No comments/likes on whitepapers.
- No refactor of the inline `navItems` duplication in desktop/mobile nav beyond
  editing the shared `staticNavItems` source.

## 3. Data Model

Add one nullable column to `resources` (`src/db/schema/resources.ts`):

```ts
content: text("content"),   // rich-text HTML article body (nullable)
```

- `bun run db:generate` → new migration → `bun run db:migrate`.
- `src/lib/validations/resources.ts`: add `content: z.string().optional()` to
  `createResourceSchema` and (via `.partial()`) `updateResourceSchema`.
- **Critical:** `/api/admin/resources` POST and `/api/admin/resources/[id]` PUT/PATCH
  map fields **explicitly** (e.g. `type: data.type`). `content` must be added to
  those handlers too, or it will silently not persist. Treat schema + validator +
  route handlers as one atomic change.

Existing fields reused as-is: `fileUrl`/`fileName`/`fileSize` (the gated PDF),
`coverImageUrl`/`thumbnailUrl`, `category`, `topics`, `pages`, `readTime`,
`shortDescription`, `description` (abstract/excerpt), `featured`, `publishDate`,
`viewCount`, `downloadCount`, `status`, `slug`.

## 4. Navigation

**`src/lib/constant.ts`**
- Add `resourcesSubItems: SubMenuItem[]`:
  - `Blog` → `/blogs`, `iconName: "Newspaper"`, description (insights/analysis).
  - `Whitepapers` → `/whitepapers`, `iconName: "FileText"`, description (in-depth research).
- In `staticNavItems`, replace the flat `Blogs` entry with:
  `{ id, name: "Resources", href: "/whitepapers", isSubMenu: true, subItems: resourcesSubItems }`.

`desktop-nav.tsx` / `mobile-nav.tsx` render any `isSubMenu` item generically, so the
dropdown inherits About/Services styling, animation, and hover behavior with no
component edits. (The existing About-only CTA stays About-only.)

## 5. Public Listing — `/whitepapers` (Featured Spotlight + Card Library)

**`src/app/(marketing)/whitepapers/page.tsx`** (server, replaces current file):
- Query `resources` where `type='whitepaper' AND status='published'`,
  order by `featured desc, publishDate desc, createdAt desc`.
- Derive featured list, the rest, and the unique category set.
- Reuse `PageHero` for the hero; reuse the existing newsletter CTA section at the bottom.

**New `src/components/marketing/whitepapers/`:**
- `featured-whitepaper.tsx` — large 2-col spotlight: cover image + gradient overlay,
  category, pages, abstract; links to `/whitepapers/[slug]` and offers Download.
- `whitepaper-library.tsx` (`'use client'`) — holds active-category + search state;
  renders the responsive grid of cards. **[User contribution: filter `useMemo`.]**
- `whitepaper-card.tsx` — cover thumbnail, category accent, pages/read-time;
  links to `/whitepapers/[slug]`.

Empty state preserved (handles zero whitepapers).

## 6. Public Detail — `/whitepapers/[slug]` (blog-style, streamlined)

**`src/app/(marketing)/whitepapers/[slug]/page.tsx`** (server):
- Fetch by slug + `status='published'`; `notFound()` otherwise.
- Increment `viewCount` (matching blog behavior).
- Fetch related whitepapers (same category, exclude current, limit 3).
- `generateMetadata` (title/description/OpenGraph/canonical) and
  `generateStaticParams` (published whitepaper slugs).

**`src/components/marketing/whitepapers/whitepaper-detail.tsx`:**
- Back-link → cover image → category badge → title → meta row
  (publish date, pages, read-time) → abstract (`shortDescription || description`).
- **Reuse `TableOfContents`** (from `components/blog/`) + the rich `content` body
  rendered inside a `prose` container.
- **Sticky "Download this whitepaper" card** using the existing `DownloadDialog`
  (gated lead capture, `useResourcesApi`, `fileUrl`).
- Topics as tags → related whitepapers grid (reuse `whitepaper-card.tsx`) →
  newsletter CTA.
- **No comments, no likes.**

### 6a. Content rendering & safety
The `content` body is **admin-only authored** (resource create/update is behind the
`requireAdmin` check) via Tiptap, which emits a constrained tag set. The whitepaper
detail page renders it through a shared `ContentProse` component built on
**`html-react-parser`**, which parses the HTML string into real React elements rather
than using a raw-HTML injection attribute. This is a **safe alternative** (React
controls element creation; no `innerHTML` write), SSR-friendly, and it satisfies the
repo's security hook. The **blog is left untouched** — it keeps its own existing
renderer — so this is whitepaper-scoped, not a shared change to the blog.

**`src/app/sitemap.ts`:** add published whitepaper detail URLs
(`${baseUrl}/whitepapers/${slug}`), mirroring the existing `/blogs/${slug}` block.

## 7. Dedicated Admin — `/admin/whitepapers`

Extract the existing `src/app/admin/resources/page.tsx` (~715 lines) into a shared
client component **`src/components/admin/resources/resource-manager.tsx`** with props:

```ts
interface ResourceManagerProps {
  lockedType?: "whitepaper";   // when set: forces ?type=, hides type selector, defaults new items
  title?: string;              // default "Resources"
  description?: string;
}
```

- Add the reusable **`PostEditor`** (Tiptap, `{ content, onChange }`) for the new
  `content` field in the create/edit dialog.
- `/admin/resources/page.tsx` → `<ResourceManager />` (unchanged behavior).
- `/admin/whitepapers/page.tsx` → `<ResourceManager lockedType="whitepaper" title="Whitepapers" />`.
- `src/components/admin/layout/admin-sidebar.tsx`: add a **"Whitepapers"** entry
  (`FileText` icon — already imported) near "Resources".
- Reuses the existing `/api/admin/resources` endpoints (already support a `type`
  query filter and `type` on create/update).

## 8. Cleanup / Consolidation (existing data preserved)

All earlier whitepaper references route into the new hierarchy; the `resources`
table and its existing `type='whitepaper'` rows are the single data source.

| Location | Current | Action |
|---|---|---|
| `(marketing)/whitepapers/page.tsx` | generic "all resources" listing | Replace (whitepaper-only) |
| `coming-soon/coming-soon-content.tsx` (L127–133) | `whitepapers` coming-soon stub | Remove the stub entry |
| `site-index/page.tsx` (L59) | `/coming-soon?for=whitepapers` | → `/whitepapers` |
| `utils/data/common/footer-data.ts` (L54) | `/coming-soon?for=whitepapers` | → `/whitepapers` |
| `components/marketing/home/blog/resource-card.tsx` (L29) | default `/coming-soon?for=whitepapers` | → `/whitepapers` |
| `utils/data/home/cta-section-data.ts` (L59) | `/coming-soon?for=whitepapers` | → `/whitepapers` |
| `sitemap.ts` (L32) | static `/whitepapers` only | Add dynamic `/whitepapers/[slug]` |
| `best-practices/page.tsx` (L209), `security/page.tsx` (L246) | already `/whitepapers` | No change |

## 9. Seed

Add 1–2 `type='whitepaper'` rows (with `content`, `coverImageUrl`, `pages`,
`readTime`, `topics`, `fileUrl`) to `src/db/seed/resources-data.ts` so the listing
and detail pages render locally.

## 10. Learning-Mode Contribution

**`whitepaper-library.tsx`** will be scaffolded with the component, props, and a
`TODO`-marked signature for the filter predicate:

```ts
// Decide: case-insensitive? does search match topics + title + description?
// how does the "All" category behave?
const filtered = useMemo(() => {
  // TODO(you): return whitepapers matching activeCategory + searchQuery
}, [whitepapers, activeCategory, searchQuery]);
```

This ~6-line decision shapes the listing UX (match fields, "All" semantics).

## 11. Component / Unit Boundaries

- **Server pages** own data fetching; presentational components receive typed
  `Resource` props (`typeof resources.$inferSelect`). No `any`.
- `whitepaper-library.tsx` is the only stateful client unit on the listing.
- `resource-manager.tsx` is a single source of truth for resource CRUD UI,
  parameterized by `lockedType`.

### 11a. Reusable vs. distinctive (blog stays intact)
The reusable layer is **design-neutral** — shared structure/logic/utilities, not the
blog's visual shells. The blog's existing cards and detail layout are **not changed**;
they keep rendering exactly as today. Whitepapers get their own visual shells.

**Shared, reusable (used by both blog + whitepapers):** moved to `components/common/`
where not already, with the blog import updated so its output is identical.
- `TableOfContents` (already in `components/blog/`) → reused; if moved to
  `components/common/`, update the blog import only (same render).
- `NewsletterForm` / newsletter CTA → reused as-is.
- `DownloadDialog` (already in `components/marketing/`) → reused as-is.
- New **`ContentProse`** (`components/common/`) — wraps the `prose` HTML render so
  blog and whitepaper share one renderer. Blog adopts it **only if** its output is
  byte-for-byte the same wrapper/classes; otherwise blog is left untouched and
  whitepaper uses `ContentProse` alone. (Keeping the blog intact wins any conflict.)
- New **`RelatedGrid`** generic layout wrapper (optional) — accepts already-styled
  cards as children, so each surface supplies its own card.

**Whitepaper-distinctive (new, not shared):** built on shadcn/ui primitives +
`motion/react` micro-animations.
- `featured-whitepaper.tsx`, `whitepaper-card.tsx`, `whitepaper-library.tsx`,
  `whitepaper-detail.tsx`.

### 11b. shadcn/ui usage
Project style is **new-york / zinc / lucide**. Build the whitepaper UI on existing
primitives in `src/components/ui/`: `card`, `badge`, `button`, `input`, `tabs`,
`dialog` (via `DownloadDialog`), `separator`, `avatar`, `scroll-area`, `skeleton`,
`tooltip`. Add missing primitives only if needed via
`bunx shadcn@latest add <component>` (candidate: `toggle-group` for the category
filter chips; otherwise styled `badge`/`button`). Follow the repo's Tailwind v4
canonical-class rules (e.g. `bg-linear-to-*`, canonical spacing, no `any`).

### 11c. Micro-animation guidelines (whitepapers only)
Use `motion/react` with variants from `@/lib/animations` (`fadeInUp`,
`staggerContainer`) plus subtle hover interactions:
- Card grid: `staggerContainer` + `fadeInUp` on scroll-in (`whileInView`, `once`).
- Card hover: gentle lift (`y: -4`) + cover image `scale` + shadow; respect
  `prefers-reduced-motion`.
- Category chips: animated active indicator (e.g. `layoutId`).
- Featured spotlight + sticky download card: soft entrance + hover emphasis.
Keep motion tasteful and performant (transform/opacity only).

## 12. Verification

- `bun run lint` and `bun run build` (no test runner configured in this project).
- Manual smoke: Resources dropdown (desktop + mobile) → listing filter/search →
  detail page (TOC, content, gated download, related) → admin Whitepapers CRUD
  (create with rich body, edit, delete; type locked) → footer/site-index/home
  links land on `/whitepapers`.

## 13. Risks

- **Explicit field mapping** in the resources API (must add `content` in 3 places:
  schema, validator, route handlers).
- **Raw-HTML render**: whitepaper `content` follows the blog's existing raw-HTML
  render (admin-authored, Tiptap-constrained). See §6a for the optional, codebase-wide
  sanitization hardening.
- **Dialog-based rich editor**: the admin create/edit dialog (`max-w-2xl`) now hosts
  a Tiptap editor; acceptable but slightly cramped. Dedicated new/edit pages are a
  future option if needed (out of scope).
- **Empty content**: detail page must gracefully handle whitepapers with no
  `content` (show abstract + download only).
