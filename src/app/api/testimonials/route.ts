import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

// GET - Public endpoint for approved testimonials
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const industry = searchParams.get("industry");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

    // Build conditions - only approved testimonials
    const conditions = [eq(testimonials.status, "approved")];

    if (featured === "true") {
      conditions.push(eq(testimonials.featured, true));
    }

    if (industry) {
      conditions.push(eq(testimonials.industry, industry));
    }

    const whereClause = and(...conditions);

    // Get approved testimonials
    const testimonialsList = await db
      .select({
        id: testimonials.id,
        authorName: testimonials.authorName,
        authorRole: testimonials.authorRole,
        authorCompany: testimonials.authorCompany,
        authorImage: testimonials.authorImage,
        quote: testimonials.quote,
        rating: testimonials.rating,
        industry: testimonials.industry,
        serviceUsed: testimonials.serviceUsed,
        featured: testimonials.featured,
        verified: testimonials.verified,
      })
      .from(testimonials)
      .where(whereClause)
      .orderBy(
        desc(testimonials.featured),
        testimonials.displayOrder,
        desc(testimonials.publishedAt)
      )
      .limit(limit);

    // Get unique industries for filtering
    const industriesResult = await db
      .selectDistinct({ industry: testimonials.industry })
      .from(testimonials)
      .where(
        and(
          eq(testimonials.status, "approved"),
          sql`${testimonials.industry} IS NOT NULL`
        )
      );

    return NextResponse.json({
      testimonials: testimonialsList,
      industries: industriesResult.map((i) => i.industry).filter(Boolean),
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
