import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  const adminEmail = "admin@itorigin.com";
  const adminPassword = "Gratitude@2026";
  const adminName = "IT Origin Team";

  console.log("Checking for existing admin user...");

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });

  if (existingUser) {
    console.log("Admin user already exists. Updating role to admin...");
    await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.id, existingUser.id));
    console.log("Admin role updated!");
    return;
  }

  console.log("Creating admin user via Better Auth...");

  // Use Better Auth's internal API to create the user
  const ctx = await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: adminName,
    },
  });

  if (!ctx || !ctx.user) {
    throw new Error("Failed to create admin user");
  }

  // Update the user role to admin
  await db
    .update(users)
    .set({ role: "admin", emailVerified: true })
    .where(eq(users.id, ctx.user.id));

  console.log("Admin user created successfully!");
  console.log("Email:", adminEmail);
  console.log("Password:", adminPassword);
}

seedAdmin()
  .then(() => {
    console.log("Seed completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
