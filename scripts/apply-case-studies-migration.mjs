import postgres from "postgres";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the migration SQL
const migrationPath = join(__dirname, "../src/db/migrations/0004_eminent_rawhide_kid.sql");
const migrationSQL = readFileSync(migrationPath, "utf-8");

// Parse the migration - split by statement breakpoint
const statements = migrationSQL
  .split("--> statement-breakpoint")
  .map(s => s.trim())
  .filter(s => s.length > 0);

async function applyMigration() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const sql = postgres(databaseUrl);

  console.log("Applying case studies migration...\n");

  try {
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await sql.unsafe(statement);
      console.log("  ✓ Success\n");
    }

    console.log("Migration applied successfully!");
  } catch (error) {
    if (error.message.includes("already exists")) {
      console.log("Table already exists, skipping...");
    } else {
      console.error("Migration failed:", error);
      process.exit(1);
    }
  } finally {
    await sql.end();
  }
}

applyMigration();
