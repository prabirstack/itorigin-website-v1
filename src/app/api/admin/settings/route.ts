import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-utils";
import { updateSettingsSchema } from "@/lib/validations/settings";

// Default settings
const defaultSettings = {
  id: "site_settings",
  companyName: "IT Origin",
  tagline: "Cybersecurity Excellence",
  description: "Leading cybersecurity solutions provider",
  email: "info@itorigin.com",
  phone: "+1 (234) 567-890",
  whatsapp: "",
  addressLine1: "123 Cybersecurity Avenue",
  addressLine2: "Tech District",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400001",
  country: "India",
  businessHours: "Mon-Fri 9:00 AM - 6:00 PM",
  timezone: "IST",
  socialLinks: {
    twitter: "https://twitter.com/itorigin",
    linkedin: "https://linkedin.com/company/itorigin",
    github: "https://github.com/itorigin",
  },
  calendlyUrl: "",
  supportEmail: "",
  salesEmail: "",
  mapEmbedUrl: "",
  mapLink: "",
};

export async function GET() {
  try {
    await requireAdmin();

    let settings = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, "site_settings"),
    });

    // If no settings exist, create default ones
    if (!settings) {
      const [newSettings] = await db
        .insert(siteSettings)
        .values(defaultSettings)
        .returning();
      settings = newSettings;
    }

    return NextResponse.json({ settings });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validatedData = updateSettingsSchema.parse(body);

    // Check if settings exist
    let existing = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, "site_settings"),
    });

    if (!existing) {
      // Create with defaults and overrides
      const [newSettings] = await db
        .insert(siteSettings)
        .values({
          ...defaultSettings,
          ...validatedData,
        })
        .returning();
      return NextResponse.json({ settings: newSettings });
    }

    // Update existing settings
    const [updatedSettings] = await db
      .update(siteSettings)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, "site_settings"))
      .returning();

    return NextResponse.json({ settings: updatedSettings });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
