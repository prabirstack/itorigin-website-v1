import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories, posts } from "@/db/schema";
import { eq, desc, sql, ilike } from "drizzle-orm";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { requireAuthorOrAdmin } from "@/lib/auth-utils";
import { createCategorySchema } from "@/lib/validations/category";

export async function GET(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereClause = search ? ilike(categories.name, `%${search}%`) : undefined;

    // Get categories with post count
    const categoriesList = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
        postCount: sql<number>`count(${posts.id})::int`,
      })
      .from(categories)
      .leftJoin(posts, eq(posts.categoryId, categories.id))
      .where(whereClause)
      .groupBy(categories.id)
      .orderBy(desc(categories.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(categories)
      .where(whereClause);
    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      categories: categoriesList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();
    const body = await request.json();

    const validated = createCategorySchema.parse(body);

    const slug =
      validated.slug || slugify(validated.name, { lower: true, strict: true });

    // Check if slug already exists
    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    const [newCategory] = await db
      .insert(categories)
      .values({
        id: nanoid(),
        name: validated.name,
        slug,
        description: validated.description || null,
      })
      .returning();

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
