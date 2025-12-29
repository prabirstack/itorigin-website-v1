import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const testimonialStatusEnum = pgEnum("testimonial_status", [
  "pending",
  "approved",
  "rejected",
]);

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  // Author information
  authorName: text("author_name").notNull(),
  authorRole: text("author_role").notNull(),
  authorCompany: text("author_company").notNull(),
  authorImage: text("author_image"),
  authorEmail: text("author_email"),
  authorLinkedin: text("author_linkedin"),

  // Testimonial content
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5), // 1-5 star rating

  // Categorization
  industry: text("industry"), // e.g., "Finance", "Healthcare", "Technology"
  serviceUsed: text("service_used"), // e.g., "SOC Services", "Penetration Testing"

  // Display settings
  featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  status: testimonialStatusEnum("status").notNull().default("pending"),

  // Verification
  verified: boolean("verified").notNull().default(false),
  verifiedAt: timestamp("verified_at"),

  // Metadata
  source: text("source"), // e.g., "website", "email", "linkedin", "google"
  externalUrl: text("external_url"), // Link to original testimonial if external

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  publishedAt: timestamp("published_at"),
});

// Relations can be extended if needed
export const testimonialsRelations = relations(testimonials, ({}) => ({}));

// Types
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
