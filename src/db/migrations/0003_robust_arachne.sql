CREATE TYPE "public"."resource_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('whitepaper', 'ebook', 'guide', 'report', 'template', 'checklist', 'case-study', 'infographic', 'toolkit', 'other');--> statement-breakpoint
CREATE TABLE "resource_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resource_categories_name_unique" UNIQUE("name"),
	CONSTRAINT "resource_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "resource_downloads" (
	"id" text PRIMARY KEY NOT NULL,
	"resource_id" text NOT NULL,
	"lead_id" text,
	"email" text,
	"name" text,
	"company" text,
	"ip_address" text,
	"user_agent" text,
	"downloaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text,
	"type" "resource_type" DEFAULT 'whitepaper' NOT NULL,
	"category" text DEFAULT 'Uncategorized' NOT NULL,
	"status" "resource_status" DEFAULT 'draft' NOT NULL,
	"file_url" text,
	"file_name" text,
	"file_size" integer,
	"file_type" text,
	"thumbnail_url" text,
	"cover_image_url" text,
	"pages" integer,
	"read_time" text,
	"topics" jsonb DEFAULT '[]'::jsonb,
	"meta_title" text,
	"meta_description" text,
	"featured" boolean DEFAULT false,
	"download_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"publish_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resources_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "resource_downloads" ADD CONSTRAINT "resource_downloads_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;