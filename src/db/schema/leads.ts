import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "contact_form",
  "newsletter",
  "download",
  "chat",
  "referral",
  "other",
]);

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message"),
  status: leadStatusEnum("status").notNull().default("new"),
  source: leadSourceEnum("source").notNull().default("contact_form"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  confirmed: boolean("confirmed").notNull().default(false),
  confirmToken: text("confirm_token"),
  unsubscribeToken: text("unsubscribe_token"),
  subscribedAt: timestamp("subscribed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
