import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");

envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=");
    if (key && value) {
      // Remove quotes if present
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  }
});

// Now dynamically import the seed script
const { spawn } = await import("child_process");

const child = spawn("bunx", ["tsx", "src/db/seed-services.ts"], {
  env: process.env,
  stdio: "inherit",
  cwd: process.cwd(),
});

child.on("close", (code) => {
  process.exit(code || 0);
});
