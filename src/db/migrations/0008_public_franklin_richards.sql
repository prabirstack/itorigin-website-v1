CREATE TABLE "post_redirects" (
	"id" text PRIMARY KEY NOT NULL,
	"old_slug" text NOT NULL,
	"post_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_redirects_old_slug_unique" UNIQUE("old_slug")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "slug_locked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "post_redirects" ADD CONSTRAINT "post_redirects_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;