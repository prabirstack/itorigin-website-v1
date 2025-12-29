import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resources, resourceDownloads } from "@/db/schema";
import { eq, desc, and, like, sql, or } from "drizzle-orm";
import { createResourceSchema, resourceQuerySchema } from "@/lib/validations/resources";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

// GET - List all resources (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const queryResult = resourceQuerySchema.safeParse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || undefined,
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status") || undefined,
      featured: searchParams.get("featured") || undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    const { page, limit, search, type, category, status, featured } = queryResult.data;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (type) {
      conditions.push(eq(resources.type, type));
    }

    if (category) {
      conditions.push(eq(resources.category, category));
    }

    if (status) {
      conditions.push(eq(resources.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(resources.featured, featured));
    }

    if (search) {
      conditions.push(
        or(
          like(resources.title, `%${search}%`),
          like(resources.description, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get resources with download counts
    const resourcesList = await db
      .select()
      .from(resources)
      .where(whereClause)
      .orderBy(desc(resources.updatedAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(resources)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get unique categories for filter
    const categoriesResult = await db
      .selectDistinct({ category: resources.category })
      .from(resources);

    return NextResponse.json({
      resources: resourcesList,
      categories: categoriesResult.map(c => c.category),
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
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST - Create a new resource
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const result = createResourceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if slug is unique
    const existingResource = await db
      .select({ id: resources.id })
      .from(resources)
      .where(eq(resources.slug, data.slug))
      .limit(1);

    if (existingResource.length > 0) {
      return NextResponse.json(
        { error: "A resource with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the resource
    const [newResource] = await db.insert(resources).values({
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      type: data.type,
      category: data.category,
      status: data.status,
      fileUrl: data.fileUrl || null,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
      thumbnailUrl: data.thumbnailUrl || null,
      coverImageUrl: data.coverImageUrl || null,
      pages: data.pages,
      readTime: data.readTime,
      topics: data.topics,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      featured: data.featured,
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
    }).returning();

    return NextResponse.json({ resource: newResource }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
