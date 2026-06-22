# Region-Aware Contact Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the US office's contact details in the marketing topbar banner for visitors located in the US/Canada (detected via browser timezone), and Kolkata details for everyone else.

**Architecture:** A new pure-logic module `src/lib/region.ts` decides the visitor's region from their browser IANA timezone (explicit US/Canada allowlist) and resolves which contact fields to display from the existing `settings.officeLocations` data (US office → fall back field-by-field to Kolkata). The client `Topbar` defaults to the global (`"ROW"`) region during SSR/first paint and upgrades to the real region inside a `useEffect` after mount — SSR-safe, no hydration mismatch. No schema change, no migration, no new dependency.

**Tech Stack:** Next.js 16, React 19, TypeScript, Bun. Verification: a throwaway `bun` assertion script for the pure logic, then `bun run lint` + `bun run build`. No persistent test runner is configured in this repo (per CLAUDE.md).

---

## File Structure

- **Create:** `src/lib/region.ts` — all region detection + contact-resolution logic (pure functions + one environment-reading function). Single responsibility: "given a visitor and settings, what region are they in and which contact details do they see."
- **Modify:** `src/components/layout/topbar.tsx` — consume `region.ts`: hold `region` state, detect it after mount, render resolved contact values. Stays a thin view.
- **Temporary (created then deleted, never committed):** `scripts/verify-region.ts` — assertion script proving the pure logic before wiring the UI.

Types `OfficeLocation` and `SiteSettings` are imported **type-only** from `@/components/providers/settings-provider` (where they are already exported), so `region.ts` pulls in no React at runtime.

---

## Task 1: Region logic module (`src/lib/region.ts`)

**Files:**
- Create: `src/lib/region.ts`
- Temporary verification: `scripts/verify-region.ts` (deleted in Step 5)

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-region.ts` with exactly this content. It imports from the not-yet-created module via a relative path (no alias) so `bun` can run it standalone:

```ts
import { strict as assert } from "node:assert";
import {
  isNorthAmericaTimezone,
  getNorthAmericaOffice,
  resolveTopbarContact,
} from "../src/lib/region";
import type {
  OfficeLocation,
  SiteSettings,
} from "../src/components/providers/settings-provider";

// --- isNorthAmericaTimezone ---
assert.equal(isNorthAmericaTimezone("America/New_York"), true, "NY is NA");
assert.equal(isNorthAmericaTimezone("America/Los_Angeles"), true, "LA is NA");
assert.equal(isNorthAmericaTimezone("America/Toronto"), true, "Toronto is NA");
assert.equal(isNorthAmericaTimezone("Pacific/Honolulu"), true, "Honolulu is NA");
assert.equal(isNorthAmericaTimezone("America/Vancouver"), true, "Vancouver is NA");
assert.equal(isNorthAmericaTimezone("America/Mexico_City"), false, "Mexico is ROW");
assert.equal(isNorthAmericaTimezone("America/Sao_Paulo"), false, "Brazil is ROW");
assert.equal(isNorthAmericaTimezone("Asia/Kolkata"), false, "Kolkata is ROW");
assert.equal(isNorthAmericaTimezone("Europe/London"), false, "London is ROW");
assert.equal(isNorthAmericaTimezone(undefined), false, "undefined is ROW");
assert.equal(isNorthAmericaTimezone(""), false, "empty is ROW");

// --- fixtures ---
const indiaOffice: OfficeLocation = {
  id: "hq", type: "headquarters", label: "HQ",
  addressLine1: "8/14, Sahid Nagar", city: "Kolkata", state: "West Bengal",
  postalCode: "700078", country: "India",
  phone: "+91-7439490434", email: "connect@itorigin.in", isActive: true,
};
const usOffice: OfficeLocation = {
  id: "us", type: "regional", label: "US Office",
  addressLine1: "1 Market St", city: "New York", state: "NY",
  postalCode: "10001", country: "United States",
  phone: "+1-555-0100", email: "us@itorigin.com", isActive: true,
};
const settings = (offices: OfficeLocation[]): SiteSettings => ({
  companyName: "ITOrigin", tagline: null, description: null,
  email: "connect@itorigin.com", phone: "+91-7439490434", whatsapp: null,
  addressLine1: null, addressLine2: null, city: "Kolkata", state: "West Bengal",
  postalCode: null, country: "India", officeLocations: offices,
  footerLocationsLimit: null, businessHours: null, timezone: null,
  socialLinks: null, calendlyUrl: null, supportEmail: null,
  salesEmail: null, mapLink: null,
});

// --- getNorthAmericaOffice ---
assert.equal(getNorthAmericaOffice(settings([indiaOffice, usOffice]))?.id, "us", "finds US office");
assert.equal(getNorthAmericaOffice(settings([indiaOffice])), null, "no US office -> null");
assert.equal(getNorthAmericaOffice(null), null, "null settings -> null");
assert.equal(
  getNorthAmericaOffice(settings([{ ...usOffice, country: "U.S.A." }]))?.id,
  "us", "normalizes U.S.A."
);
assert.equal(
  getNorthAmericaOffice(settings([{ ...usOffice, country: "usa" }]))?.id,
  "us", "normalizes usa"
);
assert.equal(
  getNorthAmericaOffice(settings([{ ...usOffice, isActive: false }])),
  null, "ignores inactive US office"
);

// --- resolveTopbarContact ---
const naFull = resolveTopbarContact("NA", settings([indiaOffice, usOffice]));
assert.deepEqual(
  naFull,
  { phone: "+1-555-0100", email: "us@itorigin.com", city: "New York", state: "NY" },
  "NA full -> US office values"
);

const naNoPhone = resolveTopbarContact(
  "NA", settings([indiaOffice, { ...usOffice, phone: "" }])
);
assert.equal(naNoPhone.phone, "+91-7439490434", "NA missing US phone -> Kolkata phone");
assert.equal(naNoPhone.email, "us@itorigin.com", "NA still uses US email");

const naNoOffice = resolveTopbarContact("NA", settings([indiaOffice]));
assert.deepEqual(
  naNoOffice,
  { phone: "+91-7439490434", email: "connect@itorigin.com", city: "Kolkata", state: "West Bengal" },
  "NA with no US office -> Kolkata"
);

const row = resolveTopbarContact("ROW", settings([indiaOffice, usOffice]));
assert.deepEqual(
  row,
  { phone: "+91-7439490434", email: "connect@itorigin.com", city: "Kolkata", state: "West Bengal" },
  "ROW -> Kolkata/top-level"
);

console.log("ALL REGION ASSERTIONS PASSED");
```

- [ ] **Step 2: Run the script to verify it fails**

Run: `bun scripts/verify-region.ts`
Expected: FAIL — module resolution error like `Cannot find module '../src/lib/region'` (the module does not exist yet).

- [ ] **Step 3: Implement `src/lib/region.ts`**

Create `src/lib/region.ts` with exactly this content:

```ts
import type {
  OfficeLocation,
  SiteSettings,
} from "@/components/providers/settings-provider";

export type Region = "NA" | "ROW";

// Literal fallbacks — preserved from the original Topbar so behaviour is
// unchanged when settings are missing fields.
const DEFAULT_CONTACT = {
  phone: "+91-7439490434",
  email: "connect@itorigin.com",
  city: "Kolkata",
  state: "West Bengal",
} as const;

// Country values (normalized) that identify the North-America office.
// US/Canada visitors are shown the US office per the requirement, so we
// match the US office specifically.
const US_COUNTRY_KEYS = new Set([
  "unitedstates",
  "unitedstatesofamerica",
  "usa",
  "us",
]);

// IANA timezones browsers emit for the US and Canada. An explicit allowlist
// (not an `America/*` prefix) so Latin-American zones resolve to "ROW".
export const NORTH_AMERICA_TIMEZONES = new Set<string>([
  // United States
  "America/New_York",
  "America/Detroit",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Chicago",
  "America/Menominee",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Denver",
  "America/Boise",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Sitka",
  "America/Metlakatla",
  "America/Yakutat",
  "America/Nome",
  "America/Adak",
  "Pacific/Honolulu",
  // Canada
  "America/St_Johns",
  "America/Halifax",
  "America/Glace_Bay",
  "America/Moncton",
  "America/Goose_Bay",
  "America/Toronto",
  "America/Iqaluit",
  "America/Winnipeg",
  "America/Resolute",
  "America/Rankin_Inlet",
  "America/Regina",
  "America/Swift_Current",
  "America/Edmonton",
  "America/Cambridge_Bay",
  "America/Inuvik",
  "America/Yellowknife",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Dawson",
  "America/Creston",
]);

/** Pure: is this IANA timezone within the US/Canada allowlist? */
export function isNorthAmericaTimezone(timeZone: string | undefined): boolean {
  if (!timeZone) return false;
  return NORTH_AMERICA_TIMEZONES.has(timeZone);
}

/**
 * Reads the visitor's browser timezone and classifies their region.
 * Client-only (relies on Intl resolved options). Defaults to "ROW" if the
 * Intl API is unavailable or throws.
 */
export function detectRegion(): Region {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return isNorthAmericaTimezone(timeZone) ? "NA" : "ROW";
  } catch {
    return "ROW";
  }
}

function normalizeCountry(country: string | null | undefined): string {
  return (country ?? "").toLowerCase().replace(/[^a-z]/g, "");
}

/** Pure: first active office whose country identifies it as the US office. */
export function getNorthAmericaOffice(
  settings: SiteSettings | null,
): OfficeLocation | null {
  const offices = settings?.officeLocations;
  if (!offices) return null;
  return (
    offices.find(
      (office) =>
        office.isActive && US_COUNTRY_KEYS.has(normalizeCountry(office.country)),
    ) ?? null
  );
}

/**
 * Pure: resolve the topbar contact fields for a region.
 * NA visitors get the US office's fields, each falling back field-by-field to
 * the global setting and then to the literal default. Everyone else (and NA
 * with no US office configured) gets the global/Kolkata details.
 */
export function resolveTopbarContact(
  region: Region,
  settings: SiteSettings | null,
): { phone: string; email: string; city: string; state: string } {
  const base = {
    phone: settings?.phone || DEFAULT_CONTACT.phone,
    email: settings?.email || DEFAULT_CONTACT.email,
    city: settings?.city || DEFAULT_CONTACT.city,
    state: settings?.state || DEFAULT_CONTACT.state,
  };

  if (region !== "NA") return base;

  const office = getNorthAmericaOffice(settings);
  if (!office) return base;

  return {
    phone: office.phone || base.phone,
    email: office.email || base.email,
    city: office.city || base.city,
    state: office.state || base.state,
  };
}
```

- [ ] **Step 4: Run the script to verify it passes**

Run: `bun scripts/verify-region.ts`
Expected: PASS — prints `ALL REGION ASSERTIONS PASSED` and exits 0.

- [ ] **Step 5: Delete the temporary script and lint**

Run:
```bash
rm scripts/verify-region.ts
rmdir scripts 2>/dev/null || true
bun run lint
```
Expected: `rm` succeeds; `bun run lint` reports no errors for `src/lib/region.ts`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/region.ts
git commit -m "feat: add region detection + contact resolution util

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Wire the Topbar to region-aware contact

**Files:**
- Modify: `src/components/layout/topbar.tsx`

- [ ] **Step 1: Update the React import (line 3)**

Replace:
```tsx
import React from "react";
```
with:
```tsx
import React, { useEffect, useState } from "react";
```

- [ ] **Step 2: Add the region module import**

Immediately after the existing settings-provider import (line 7), add:
```tsx
import { detectRegion, resolveTopbarContact, type Region } from "@/lib/region";
```

- [ ] **Step 3: Replace the contact-derivation block**

Replace this block (currently lines 10-16):
```tsx
  const { settings } = useSettings();

  const phone = settings?.phone || "+91-7439490434";
  const email = settings?.email || "connect@itorigin.com";
  const city = settings?.city || "Kolkata";
  const state = settings?.state || "West Bengal";
  const location = `${city}, ${state}`;
```
with:
```tsx
  const { settings } = useSettings();
  const [region, setRegion] = useState<Region>("ROW");

  // Detect region after mount only — the server's timezone is not the
  // visitor's, so computing during render would cause a hydration mismatch.
  useEffect(() => {
    setRegion(detectRegion());
  }, []);

  const { phone, email, city, state } = resolveTopbarContact(region, settings);
  const location = `${city}, ${state}`;
```

Leave everything else in the file unchanged (the `socialLinks` line, the JSX that already references `phone`, `email`, `location`, `getPhoneLink`, `getEmailLink`).

- [ ] **Step 4: Lint and type/build check**

Run:
```bash
bun run lint
```
Expected: no errors.

Run:
```bash
bun run build
```
Expected: build completes successfully (this also type-checks via `next build`). No type errors referencing `topbar.tsx` or `region.ts`.

- [ ] **Step 5: Manual behaviour check**

Run `bun dev`, open `http://localhost:3000`, then in Chrome DevTools:
1. Open the **Sensors** panel (⋮ → More tools → Sensors). Under **Location**, choose a US preset or set timezone to `America/New_York`. Reload. Expect the topbar phone/email/location to show the **US office** values (location e.g. `New York, NY`). If the US office has no phone, the phone shows the Kolkata number (expected fallback).
2. Set the Sensors timezone to `Asia/Kolkata` (or `America/Mexico_City`). Reload. Expect the topbar to show **Kolkata** details — confirming Mexico is treated as ROW.

(If `bun dev` isn't run during execution, rely on Steps 4 build/lint; this manual check is the human verification gate.)

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/topbar.tsx
git commit -m "feat: show US contact details in topbar for US/Canada visitors

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Final verification + spec status

**Files:**
- Modify: `docs/superpowers/specs/2026-06-23-region-aware-contact-banner-design.md`

- [ ] **Step 1: Full lint + build**

Run:
```bash
bun run lint && bun run build
```
Expected: both succeed with no errors.

- [ ] **Step 2: Mark the spec implemented**

In `docs/superpowers/specs/2026-06-23-region-aware-contact-banner-design.md`, change the status line:
```markdown
**Status:** Approved (pending spec review)
```
to:
```markdown
**Status:** Implemented
```

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-06-23-region-aware-contact-banner-design.md
git commit -m "docs: mark region-aware contact banner spec as implemented

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Detection via browser timezone allowlist → Task 1 (`isNorthAmericaTimezone`, `detectRegion`, `NORTH_AMERICA_TIMEZONES`). ✔
- US data from `officeLocations`, US-synonym match → Task 1 (`getNorthAmericaOffice`, `US_COUNTRY_KEYS`). ✔
- Field-by-field fallback incl. missing US phone → Task 1 (`resolveTopbarContact`) + verified by `naNoPhone` assertion. ✔
- SSR-safe default-ROW-then-useEffect → Task 2 Step 3. ✔
- Latin America excluded → Task 1 assertion (`America/Mexico_City` false). ✔
- No schema/migration, footer/contact untouched → only `region.ts` + `topbar.tsx` modified. ✔
- Verification via lint + build + manual DevTools → Task 2 Steps 4-5, Task 3 Step 1. ✔

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every command shows expected output. ✔

**Type consistency:** `Region`, `isNorthAmericaTimezone`, `getNorthAmericaOffice`, `resolveTopbarContact`, `detectRegion`, `NORTH_AMERICA_TIMEZONES` are named identically in the module (Task 1), the verification script (Task 1), and the Topbar import (Task 2). `resolveTopbarContact` returns `{ phone, email, city, state }` everywhere it is used. `OfficeLocation`/`SiteSettings` are imported type-only from `@/components/providers/settings-provider`, matching the exported interface fields used in fixtures. ✔
