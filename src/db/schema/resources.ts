import { pgTable, text, timestamp, boolean, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Resource types enum
export const resourceTypeEnum = pgEnum("resource_type", [
  "whitepaper",
  "ebook",
  "guide",
  "report",
  "template",
  "checklist",
  "case-study",
  "infographic",
  "toolkit",
  "other"
]);

// Resource status enum
export const resourceStatusEnum = pgEnum("resource_status", [
  "draft",
  "published",
  "archived"
]);

// Resources table
export const resources = pgTable("resources", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  type: resourceTypeEnum("type").notNull().default("whitepaper"),
  category: text("category").notNull().default("Uncategorized"),
  status: resourceStatusEnum("status").notNull().default("draft"),

  // File details
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"), // in bytes
  fileType: text("file_type"), // e.g., "application/pdf"

  // Display metadata
  thumbnailUrl: text("thumbnail_url"),
  coverImageUrl: text("cover_image_url"),
  pages: integer("pages"),
  readTime: text("read_time"),

  // SEO & Marketing
  topics: jsonb("topics").$type<string[]>().default([]),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),

  // Tracking
  featured: boolean("featured").default(false),
  downloadCount: integer("download_count").default(0),
  viewCount: integer("view_count").default(0),

  // Dates
  publishDate: timestamp("publish_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Resource downloads table (for tracking)
export const resourceDownloads = pgTable("resource_downloads", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  resourceId: text("resource_id").notNull().references(() => resources.id, { onDelete: "cascade" }),
  leadId: text("lead_id"),
  email: text("email"),
  name: text("name"),
  company: text("company"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
});

// Resource categories table
export const resourceCategories = pgTable("resource_categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const resourcesRelations = relations(resources, ({ many }) => ({
  downloads: many(resourceDownloads),
}));

export const resourceDownloadsRelations = relations(resourceDownloads, ({ one }) => ({
  resource: one(resources, {
    fields: [resourceDownloads.resourceId],
    references: [resources.id],
  }),
}));

// Types
export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
export type ResourceDownload = typeof resourceDownloads.$inferSelect;
export type NewResourceDownload = typeof resourceDownloads.$inferInsert;
export type ResourceCategory = typeof resourceCategories.$inferSelect;
export type NewResourceCategory = typeof resourceCategories.$inferInsert;
