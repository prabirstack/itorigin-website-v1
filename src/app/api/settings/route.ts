import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

// Default settings for initial setup
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

// Public API to get site settings
export async function GET() {
  try {
    // Use standard SQL query for Neon pooler compatibility
    const settingsResult = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, "site_settings"))
      .limit(1);
    let settings = settingsResult[0];

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
    console.error("Failed to fetch settings:", error);
    // Return default settings on error
    return NextResponse.json({ settings: defaultSettings });
  }
}
