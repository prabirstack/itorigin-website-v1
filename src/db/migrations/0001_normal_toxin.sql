CREATE TYPE "public"."campaign_type" AS ENUM('one-time', 'monthly', 'welcome');--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "campaign_type" "campaign_type" DEFAULT 'one-time' NOT NULL;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "recurring_day" integer;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "last_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "is_recurring_active" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "attachments" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "email_campaigns" ADD COLUMN "social_links" json;