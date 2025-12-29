CREATE TYPE "public"."testimonial_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" text PRIMARY KEY NOT NULL,
	"author_name" text NOT NULL,
	"author_role" text NOT NULL,
	"author_company" text NOT NULL,
	"author_image" text,
	"author_email" text,
	"author_linkedin" text,
	"quote" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"industry" text,
	"service_used" text,
	"featured" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"status" "testimonial_status" DEFAULT 'pending' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"source" text,
	"external_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp
);
