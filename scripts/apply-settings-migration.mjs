import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://itorigin:itorigin_dev_password@localhost:5432/itorigin_db";

const sql = postgres(DATABASE_URL);

async function applyMigration() {
  console.log("Applying site_settings table migration...");

  await sql`
    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" text PRIMARY KEY DEFAULT 'site_settings' NOT NULL,
      "company_name" text DEFAULT 'IT Origin' NOT NULL,
      "tagline" text,
      "description" text,
      "email" text DEFAULT 'info@itorigin.com' NOT NULL,
      "phone" text DEFAULT '+1 (234) 567-890' NOT NULL,
      "whatsapp" text,
      "address_line1" text,
      "address_line2" text,
      "city" text,
      "state" text,
      "postal_code" text,
      "country" text,
      "business_hours" text DEFAULT 'Mon-Fri 9:00 AM - 6:00 PM',
      "timezone" text DEFAULT 'IST',
      "social_links" jsonb DEFAULT '{}'::jsonb,
      "calendly_url" text,
      "support_email" text,
      "sales_email" text,
      "map_embed_url" text,
      "map_link" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `;

  console.log("✓ site_settings table created or already exists");

  // Insert default settings if not exists
  const existing = await sql`SELECT id FROM site_settings WHERE id = 'site_settings'`;

  if (existing.length === 0) {
    await sql`
      INSERT INTO site_settings (id) VALUES ('site_settings')
    `;
    console.log("✓ Default settings inserted");
  } else {
    console.log("✓ Settings already exist");
  }

  await sql.end();
  console.log("Migration complete!");
}

applyMigration().catch(console.error);
