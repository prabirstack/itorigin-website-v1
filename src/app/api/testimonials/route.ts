import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

// GET - Public endpoint for approved testimonials
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const industry = searchParams.get("industry");
    const limitParam = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

    // Use raw SQL query for better compatibility with Neon pooler
    let query = `
      SELECT
        id,
        author_name as "authorName",
        author_role as "authorRole",
        author_company as "authorCompany",
        author_image as "authorImage",
        quote,
        rating,
        industry,
        service_used as "serviceUsed",
        featured,
        verified
      FROM testimonials
      WHERE status = 'approved'
    `;

    if (featured === "true") {
      query += ` AND featured = true`;
    }

    if (industry) {
      query += ` AND industry = '${industry.replace(/'/g, "''")}'`;
    }

    query += `
      ORDER BY featured DESC, display_order, published_at DESC
      LIMIT ${limitParam}
    `;

    const testimonialsList = await db.execute(sql.raw(query));

    // Get unique industries
    const industriesQuery = `
      SELECT DISTINCT industry
      FROM testimonials
      WHERE status = 'approved' AND industry IS NOT NULL
    `;
    const industriesResult = await db.execute(sql.raw(industriesQuery));

    return NextResponse.json({
      testimonials: testimonialsList,
      industries: (industriesResult as unknown as { industry: string }[]).map((i) => i.industry).filter(Boolean),
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch testimonials",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
