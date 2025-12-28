import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  json,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortDescription: text("short_description"),
  description: text("description").notNull(),
  iconName: text("icon_name"),
  coverImage: text("cover_image"),
  features: json("features").$type<string[]>().default([]),
  benefits: json("benefits").$type<string[]>().default([]),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  bgPattern: text("bg_pattern"),
  active: boolean("active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
