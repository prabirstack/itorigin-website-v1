import { pgTable, text, timestamp, integer, json, pgEnum, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { subscribers } from "./leads";

export const campaignStatusEnum = pgEnum("campaign_status", [
  "draft",
  "scheduled",
  "sending",
  "sent",
  "cancelled",
]);

export const campaignTypeEnum = pgEnum("campaign_type", [
  "one-time",
  "monthly",
  "welcome",
]);

export interface CampaignAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface CampaignSocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export const emailCampaigns = pgTable("email_campaigns", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  previewText: text("preview_text"),
  htmlContent: text("html_content").notNull(),
  status: campaignStatusEnum("status").notNull().default("draft"),
  campaignType: campaignTypeEnum("campaign_type").notNull().default("one-time"),
  // For monthly newsletters: day of month (1-28)
  recurringDay: integer("recurring_day"),
  // Last time this recurring campaign was sent
  lastSentAt: timestamp("last_sent_at"),
  // Whether the monthly recurring is active
  isRecurringActive: boolean("is_recurring_active").default(false),
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  totalRecipients: integer("total_recipients").default(0),
  sentCount: integer("sent_count").default(0),
  openCount: integer("open_count").default(0),
  clickCount: integer("click_count").default(0),
  bounceCount: integer("bounce_count").default(0),
  // Attachments stored as JSON array
  attachments: json("attachments").$type<CampaignAttachment[]>().default([]),
  // Social media links for the campaign footer
  socialLinks: json("social_links").$type<CampaignSocialLinks>(),
  metrics: json("metrics").$type<{
    openRate?: number;
    clickRate?: number;
    bounceRate?: number;
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const emailSends = pgTable("email_sends", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => emailCampaigns.id, { onDelete: "cascade" }),
  subscriberId: text("subscriber_id")
    .notNull()
    .references(() => subscribers.id, { onDelete: "cascade" }),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  bouncedAt: timestamp("bounced_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const emailCampaignsRelations = relations(emailCampaigns, ({ many }) => ({
  sends: many(emailSends),
}));

export const emailSendsRelations = relations(emailSends, ({ one }) => ({
  campaign: one(emailCampaigns, {
    fields: [emailSends.campaignId],
    references: [emailCampaigns.id],
  }),
  subscriber: one(subscribers, {
    fields: [emailSends.subscriberId],
    references: [subscribers.id],
  }),
}));

export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type NewEmailCampaign = typeof emailCampaigns.$inferInsert;
export type EmailSend = typeof emailSends.$inferSelect;
export type NewEmailSend = typeof emailSends.$inferInsert;
