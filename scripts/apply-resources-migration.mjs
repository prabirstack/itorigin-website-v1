import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://itorigin:itorigin_dev_password@localhost:5432/itorigin_db";

const sql = postgres(DATABASE_URL);

async function applyMigration() {
  console.log("Applying resources migration...");

  // Create resource_status enum
  try {
    await sql`CREATE TYPE "public"."resource_status" AS ENUM('draft', 'published', 'archived')`;
    console.log("✓ Created resource_status enum");
  } catch (e) {
    if (e.code === '42710') {
      console.log("✓ resource_status enum already exists");
    } else {
      throw e;
    }
  }

  // Create resource_type enum
  try {
    await sql`CREATE TYPE "public"."resource_type" AS ENUM('whitepaper', 'ebook', 'guide', 'report', 'template', 'checklist', 'case-study', 'infographic', 'toolkit', 'other')`;
    console.log("✓ Created resource_type enum");
  } catch (e) {
    if (e.code === '42710') {
      console.log("✓ resource_type enum already exists");
    } else {
      throw e;
    }
  }

  // Create resource_categories table
  await sql`
    CREATE TABLE IF NOT EXISTS "resource_categories" (
      "id" text PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "slug" text NOT NULL,
      "description" text,
      "order" integer DEFAULT 0,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "resource_categories_name_unique" UNIQUE("name"),
      CONSTRAINT "resource_categories_slug_unique" UNIQUE("slug")
    )
  `;
  console.log("✓ Created resource_categories table");

  // Create resources table
  await sql`
    CREATE TABLE IF NOT EXISTS "resources" (
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
    )
  `;
  console.log("✓ Created resources table");

  // Create resource_downloads table
  await sql`
    CREATE TABLE IF NOT EXISTS "resource_downloads" (
      "id" text PRIMARY KEY NOT NULL,
      "resource_id" text NOT NULL,
      "lead_id" text,
      "email" text,
      "name" text,
      "company" text,
      "ip_address" text,
      "user_agent" text,
      "downloaded_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  console.log("✓ Created resource_downloads table");

  // Add foreign key constraint
  try {
    await sql`
      ALTER TABLE "resource_downloads"
      ADD CONSTRAINT "resource_downloads_resource_id_resources_id_fk"
      FOREIGN KEY ("resource_id")
      REFERENCES "public"."resources"("id")
      ON DELETE cascade ON UPDATE no action
    `;
    console.log("✓ Added foreign key constraint");
  } catch (e) {
    if (e.code === '42710') {
      console.log("✓ Foreign key constraint already exists");
    } else {
      throw e;
    }
  }

  await sql.end();
  console.log("Migration complete!");
}

applyMigration().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
