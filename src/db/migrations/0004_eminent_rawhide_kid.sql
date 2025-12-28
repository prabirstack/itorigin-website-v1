CREATE TYPE "public"."case_study_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"client" text NOT NULL,
	"industry" text NOT NULL,
	"challenge" text NOT NULL,
	"solution" text NOT NULL,
	"results" jsonb DEFAULT '[]'::jsonb,
	"metrics" jsonb DEFAULT '[]'::jsonb,
	"services" jsonb DEFAULT '[]'::jsonb,
	"featured" boolean DEFAULT false,
	"status" "case_study_status" DEFAULT 'draft' NOT NULL,
	"order" integer DEFAULT 0,
	"cover_image" text,
	"logo" text,
	"meta_title" text,
	"meta_description" text,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "case_studies_slug_unique" UNIQUE("slug")
);
