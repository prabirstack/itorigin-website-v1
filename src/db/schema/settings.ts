import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

// Site settings stored as JSON for flexibility
export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("site_settings"),

  // Company Info
  companyName: text("company_name").notNull().default("IT Origin"),
  tagline: text("tagline"),
  description: text("description"),

  // Contact Details
  email: text("email").notNull().default("info@itorigin.com"),
  phone: text("phone").notNull().default("+1 (234) 567-890"),
  whatsapp: text("whatsapp"),

  // Address
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  country: text("country"),

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

  // Google Maps
  mapEmbedUrl: text("map_embed_url"),
  mapLink: text("map_link"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type NewSiteSettings = typeof siteSettings.$inferInsert;
