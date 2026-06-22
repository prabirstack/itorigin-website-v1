# Region-Aware Contact Banner — Design

**Date:** 2026-06-23
**Status:** Implemented

## Goal

The home/marketing topbar banner currently always shows the Kolkata (India HQ)
contact details. Visitors located in the **US or Canada** should instead see the
company's **US office** contact details (phone, email, location). Everyone else
("rest of world") continues to see Kolkata. This is a contact-display
convenience only — it gates nothing and changes no access control.

## Context / Constraints

- **Hosting:** Hostinger VPS + Coolify (Traefik). No geo-aware CDN, so there is
  **no country header** (`x-vercel-ip-country` / `cf-ipcountry`) available.
  Vercel is being removed from production.
- **Topbar is already a client component** (`"use client"`) that reads contact
  info from `useSettings()` (React context hydrated from `/api/settings`). The
  values are therefore already dynamic; they "pop in" after the client fetch.
- **US office already exists** in `settings.officeLocations` and is rendered by
  the footer (`FooterOffices` via `getActiveOffices()`). It has an address and
  an email. It may or may not have a separate US phone.
- Privacy posture matters (security/GDPR-focused brand): no visitor IP should be
  sent to a third party.

## Decisions (resolved during brainstorming)

1. **Detection method:** client-side **browser timezone heuristic**. No network,
   no third party, no infra, no schema change. Accepted trade-off: VPN
   users / travelers can be misclassified — acceptable for a contact banner.
2. **US data source:** the existing **`officeLocations`** US entry (admin-editable,
   no migration, same record the footer uses). Falls back to Kolkata if absent.
3. **Missing US phone:** fall back **field-by-field** to the Kolkata phone so the
   phone slot is never empty.

**As-built refinement (from runtime verification):** the live US office is
`San Jose, California` (country "United States Of America", with both phone and
email). `city`/`state` are treated as a **coupled location** — when the US office
is matched, its `state` is used as-is (empty if absent) and never borrowed from
the company-level state, so a US city can never render with an Indian state
(e.g. "San Jose, West Bengal"). The topbar omits the state segment when empty.

## Architecture

### New utility — `src/lib/region.ts`

- `NORTH_AMERICA_TIMEZONES`: a curated `Set<string>` of the IANA zones browsers
  actually emit for the US and Canada, e.g. `America/New_York`,
  `America/Detroit`, `America/Chicago`, `America/Denver`, `America/Boise`,
  `America/Phoenix`, `America/Los_Angeles`, `America/Anchorage`,
  `Pacific/Honolulu`, `America/Toronto`, `America/Vancouver`,
  `America/Edmonton`, `America/Winnipeg`, `America/Halifax`,
  `America/St_Johns`, `America/Regina` (plus the other common US/Canada zones).
  An **explicit allowlist** is used deliberately — not an `America/*` prefix —
  so Latin-American zones (`America/Mexico_City`, `America/Sao_Paulo`, …)
  correctly resolve to `"ROW"`.
- `detectRegion(): "NA" | "ROW"` — reads
  `Intl.DateTimeFormat().resolvedOptions().timeZone` and returns `"NA"` only when
  that zone is in the allowlist; otherwise `"ROW"`. Guards against environments
  where the API throws/returns undefined by defaulting to `"ROW"`.
- `getNorthAmericaOffice(settings): OfficeLocation | null` — returns the first
  **active** office whose `country`, normalized (lowercased, non-alphanumerics
  stripped), matches a US synonym set: `unitedstates`, `usa`, `us`,
  `unitedstatesofamerica`. Returns `null` if none.

### `Topbar` changes — `src/components/layout/topbar.tsx`

- Add `region` state initialized to `"ROW"` (safe global default = Kolkata).
- In a `useEffect` (runs after mount, client only), call `detectRegion()` and
  `setRegion(...)`. **Region is never computed during render** — the server's
  timezone is not the visitor's, so computing at render would cause a hydration
  mismatch. Defaulting to `"ROW"` and upgrading after mount is SSR-safe and is
  consistent with how the banner already reveals its settings post-fetch.
- Resolve the displayed values:
  - If `region === "NA"` **and** `getNorthAmericaOffice(settings)` returns an
    office → use that office's `phone` / `email` / `city` / `state`, each with a
    field-level fallback to the existing top-level setting (then to the current
    hardcoded literal defaults) when blank.
  - Otherwise → current behaviour: top-level `settings.phone` / `email` /
    `city` / `state` (Kolkata), with the same literal fallbacks.
- The existing hardcoded fallback literals (`+91-7439490434`,
  `connect@itorigin.com`, `Kolkata`, `West Bengal`) are preserved as the final
  fallback layer.

### Data flow

```
client mount
  → detectRegion() reads Intl…timeZone
      → "NA": getNorthAmericaOffice(settings)
                 ├ found → US office phone/email/city/state (field-level fallback to Kolkata)
                 └ null  → Kolkata top-level settings
      → "ROW": Kolkata top-level settings
```

## Out of scope (YAGNI)

- No `navigator.language` or IP-based signal (timezone only).
- No DB schema change / migration / new settings fields.
- No changes to the footer, contact page, or admin UI.
- No new visual indicator beyond the swapped values.
- `vercel.json` / monthly-newsletter cron migration to Coolify is a **separate**
  task and explicitly not part of this change.

## Error handling / edge cases

- `Intl…timeZone` unavailable or throws → `detectRegion()` returns `"ROW"`.
- No US office configured, or US office inactive → Kolkata details (current
  behaviour). Feature degrades safely.
- US office present but missing a field (e.g., phone) → that field falls back to
  the Kolkata value; the slot is never empty.

## Verification

No automated test runner is configured. Verify with:

- `bun run lint`
- `bun run build`
- Manual: Chrome DevTools → Sensors → Location → set an `America/*` (US) timezone,
  reload, confirm the banner shows US office details; set an Asian timezone,
  confirm Kolkata details. Also confirm `America/Mexico_City` shows Kolkata
  (allowlist correctness).
