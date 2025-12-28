import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { requireAuthorOrAdmin } from "@/lib/auth-utils";
import { createCategorySchema } from "@/lib/validations/category";

export async function GET() {
  try {
    await requireAuthorOrAdmin();

    const categoriesList = await db
      .select()
      .from(categories)
      .orderBy(desc(categories.createdAt));

    return NextResponse.json({ categories: categoriesList });
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
