import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

// Public API to get active services for navigation and frontend
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const forNav = searchParams.get("nav") === "true";

    // Use standard SQL query for Neon pooler compatibility
    const servicesList = await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(asc(services.displayOrder));

    // If for navigation, return simplified data
    if (forNav) {
      const navServices = servicesList.map((service) => ({
        id: service.id,
        name: service.title,
        href: `/services/${service.slug}`,
        description: service.shortDescription || service.description.slice(0, 150),
        iconName: service.iconName,
      }));

      return NextResponse.json({ services: navServices });
    }

    return NextResponse.json({ services: servicesList });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
