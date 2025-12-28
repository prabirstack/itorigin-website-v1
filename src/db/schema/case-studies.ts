import { pgTable, text, timestamp, boolean, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Case study status enum
export const caseStudyStatusEnum = pgEnum("case_study_status", [
  "draft",
  "published",
  "archived"
]);

// Case studies table
export const caseStudies = pgTable("case_studies", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  client: text("client").notNull(),
  industry: text("industry").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),

  // Results and metrics as JSON arrays
  results: jsonb("results").$type<string[]>().default([]),
  metrics: jsonb("metrics").$type<{ label: string; value: string }[]>().default([]),
  services: jsonb("services").$type<string[]>().default([]),

  // Display options
  featured: boolean("featured").default(false),
  status: caseStudyStatusEnum("status").notNull().default("draft"),
  order: integer("order").default(0),

  // Media
  coverImage: text("cover_image"),
  logo: text("logo"),

  // SEO
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),

  // Timestamps
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types
export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;
