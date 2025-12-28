import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq, desc, and, like, sql, or } from "drizzle-orm";
import { createCaseStudySchema, caseStudyQuerySchema } from "@/lib/validations/case-study";
import { requireAdmin } from "@/lib/auth-utils";

// GET - List all case studies (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const queryResult = caseStudyQuerySchema.safeParse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      search: searchParams.get("search") || undefined,
      industry: searchParams.get("industry") || undefined,
      status: searchParams.get("status") || undefined,
      featured: searchParams.get("featured") || undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    const { page, limit, search, industry, status, featured } = queryResult.data;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (industry) {
      conditions.push(eq(caseStudies.industry, industry));
    }

    if (status) {
      conditions.push(eq(caseStudies.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(caseStudies.featured, featured));
    }

    if (search) {
      conditions.push(
        or(
          like(caseStudies.title, `%${search}%`),
          like(caseStudies.client, `%${search}%`),
          like(caseStudies.industry, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get case studies
    const caseStudiesList = await db
      .select()
      .from(caseStudies)
      .where(whereClause)
      .orderBy(desc(caseStudies.featured), caseStudies.order, desc(caseStudies.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(caseStudies)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get unique industries for filter
    const industriesResult = await db
      .selectDistinct({ industry: caseStudies.industry })
      .from(caseStudies);

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
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

// POST - Create a new case study
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = createCaseStudySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if slug is unique
    const existingCaseStudy = await db
      .select({ id: caseStudies.id })
      .from(caseStudies)
      .where(eq(caseStudies.slug, data.slug))
      .limit(1);

    if (existingCaseStudy.length > 0) {
      return NextResponse.json(
        { error: "A case study with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the case study
    const [newCaseStudy] = await db.insert(caseStudies).values({
      title: data.title,
      slug: data.slug,
      client: data.client,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      metrics: data.metrics,
      services: data.services,
      featured: data.featured,
      status: data.status,
      order: data.order,
      coverImage: data.coverImage || null,
      logo: data.logo || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      publishedAt: data.status === "published" ? new Date() : null,
    }).returning();

    return NextResponse.json({ caseStudy: newCaseStudy }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
