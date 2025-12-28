import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq, desc, and, like, sql, or } from "drizzle-orm";

// GET - List published case studies (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const industry = searchParams.get("industry");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    // Build conditions - only show published case studies
    const conditions = [eq(caseStudies.status, "published")];

    if (industry) {
      conditions.push(eq(caseStudies.industry, industry));
    }

    if (featured === "true") {
      conditions.push(eq(caseStudies.featured, true));
    }

    if (search) {
      const searchCondition = or(
        like(caseStudies.title, `%${search}%`),
        like(caseStudies.client, `%${search}%`),
        like(caseStudies.industry, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const whereClause = and(...conditions);

    // Get case studies
    const caseStudiesList = await db
      .select()
      .from(caseStudies)
      .where(whereClause)
      .orderBy(desc(caseStudies.featured), caseStudies.order, desc(caseStudies.publishedAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(caseStudies)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get unique industries for filtering
    const industriesResult = await db
      .selectDistinct({ industry: caseStudies.industry })
      .from(caseStudies)
      .where(eq(caseStudies.status, "published"));

    return NextResponse.json({
      caseStudies: caseStudiesList,
      industries: industriesResult.map((i) => i.industry),
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
