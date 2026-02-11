import { pgTable, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

// Office location type for multiple addresses
export type OfficeLocation = {
  id: string;
  type: "headquarters" | "regional" | "offshore" | "branch";
  label: string; // e.g., "Headquarters", "Regional Office", "VC Office"
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  phone?: string;
  email?: string;
  mapLink?: string;
  mapEmbedUrl?: string;
  isActive: boolean;
};

// Site settings stored as JSON for flexibility
export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("site_settings"),

  // Company Info
  companyName: text("company_name").notNull().default("IT Origin"),
  tagline: text("tagline"),
  description: text("description"),

  // Contact Details
  email: text("email").notNull().default("connect@itorigin.com"),
  phone: text("phone").notNull().default("+91-7439490434"),
  whatsapp: text("whatsapp"),

  // Legacy Address (kept for backward compatibility)
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  country: text("country"),

  // Multiple Office Locations (new)
  officeLocations: jsonb("office_locations").$type<OfficeLocation[]>().default([]),

  // Footer Settings
  footerLocationsLimit: integer("footer_locations_limit").default(2),

  // Business Hours
  businessHours: text("business_hours").default("Mon-Fri 9:00 AM - 6:00 PM"),
  timezone: text("timezone").default("IST"),

  // Social Links (stored as JSON)
  socialLinks: jsonb("social_links").$type<{
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  }>().default({}),

  // Additional Links
  calendlyUrl: text("calendly_url"),
  supportEmail: text("support_email"),
  salesEmail: text("sales_email"),

  // Google Maps (legacy - kept for backward compatibility)
  mapEmbedUrl: text("map_embed_url"),
  mapLink: text("map_link"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type NewSiteSettings = typeof siteSettings.$inferInsert;
