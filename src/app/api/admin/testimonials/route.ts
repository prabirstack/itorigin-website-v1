import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq, desc, and, like, sql, or, inArray } from "drizzle-orm";
import {
  createTestimonialSchema,
  testimonialQuerySchema,
  bulkActionSchema,
} from "@/lib/validations/testimonial";
import { requireAdmin } from "@/lib/auth-utils";
import { nanoid } from "nanoid";

// GET - List all testimonials (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const queryResult = testimonialQuerySchema.safeParse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      featured: searchParams.get("featured") || undefined,
      verified: searchParams.get("verified") || undefined,
      industry: searchParams.get("industry") || undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", issues: queryResult.error.issues },
        { status: 400 }
      );
    }

    const { page, limit, search, status, featured, verified, industry } = queryResult.data;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (status) {
      conditions.push(eq(testimonials.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(testimonials.featured, featured));
    }

    if (verified !== undefined) {
      conditions.push(eq(testimonials.verified, verified));
    }

    if (industry) {
      conditions.push(eq(testimonials.industry, industry));
    }

    if (search) {
      conditions.push(
        or(
          like(testimonials.authorName, `%${search}%`),
          like(testimonials.authorCompany, `%${search}%`),
          like(testimonials.quote, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get testimonials with pagination
    const testimonialsList = await db
      .select()
      .from(testimonials)
      .where(whereClause)
      .orderBy(
        desc(testimonials.featured),
        testimonials.displayOrder,
        desc(testimonials.createdAt)
      )
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(testimonials)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get unique industries for filter
    const industriesResult = await db
      .selectDistinct({ industry: testimonials.industry })
      .from(testimonials)
      .where(sql`${testimonials.industry} IS NOT NULL`);

    // Get status counts for dashboard
    const statusCounts = await db
      .select({
        status: testimonials.status,
        count: sql<number>`count(*)::int`,
      })
      .from(testimonials)
      .groupBy(testimonials.status);

    return NextResponse.json({
      testimonials: testimonialsList,
      industries: industriesResult.map((i) => i.industry).filter(Boolean),
      statusCounts: statusCounts.reduce(
        (acc, { status, count }) => ({ ...acc, [status]: count }),
        { pending: 0, approved: 0, rejected: 0 }
      ),
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST - Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = createTestimonialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Create the testimonial
    const [newTestimonial] = await db
      .insert(testimonials)
      .values({
        id: nanoid(),
        authorName: data.authorName,
        authorRole: data.authorRole,
        authorCompany: data.authorCompany,
        authorImage: data.authorImage || null,
        authorEmail: data.authorEmail || null,
        authorLinkedin: data.authorLinkedin || null,
        quote: data.quote,
        rating: data.rating,
        industry: data.industry || null,
        serviceUsed: data.serviceUsed || null,
        featured: data.featured,
        displayOrder: data.displayOrder,
        status: data.status,
        verified: data.verified,
        verifiedAt: data.verified ? new Date() : null,
        source: data.source || null,
        externalUrl: data.externalUrl || null,
        publishedAt: data.status === "approved" ? new Date() : null,
      })
      .returning();

    return NextResponse.json({ testimonial: newTestimonial }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

// PUT - Bulk actions on testimonials
export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = bulkActionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { ids, action } = result.data;

    switch (action) {
      case "approve":
        await db
          .update(testimonials)
          .set({
            status: "approved",
            publishedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(inArray(testimonials.id, ids));
        break;

      case "reject":
        await db
          .update(testimonials)
          .set({
            status: "rejected",
            updatedAt: new Date(),
          })
          .where(inArray(testimonials.id, ids));
        break;

      case "delete":
        await db.delete(testimonials).where(inArray(testimonials.id, ids));
        break;

      case "feature":
        await db
          .update(testimonials)
          .set({
            featured: true,
            updatedAt: new Date(),
          })
          .where(inArray(testimonials.id, ids));
        break;

      case "unfeature":
        await db
          .update(testimonials)
          .set({
            featured: false,
            updatedAt: new Date(),
          })
          .where(inArray(testimonials.id, ids));
        break;

      case "verify":
        await db
          .update(testimonials)
          .set({
            verified: true,
            verifiedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(inArray(testimonials.id, ids));
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully performed ${action} on ${ids.length} testimonial(s)`,
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error performing bulk action:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk action" },
      { status: 500 }
    );
  }
}
