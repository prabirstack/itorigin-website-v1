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
