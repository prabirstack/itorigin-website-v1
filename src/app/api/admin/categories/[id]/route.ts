import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { categories, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";
import { updateCategorySchema } from "@/lib/validations/category";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;

    // Use standard query for Neon pooler compatibility
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category: result[0] });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;
    const body = await request.json();

    const validated = updateCategorySchema.parse(body);

    // Check if category exists (use standard query for Neon pooler compatibility)
    const existingResult = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (existingResult.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const existing = existingResult[0];

    // Check slug uniqueness if updating slug
    if (validated.slug && validated.slug !== existing.slug) {
      const slugExistsResult = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, validated.slug))
        .limit(1);
      if (slugExistsResult.length > 0) {
        return NextResponse.json(
          { error: "A category with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const [updated] = await db
      .update(categories)
      .set({
        ...validated,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    // Revalidate pages that use categories
    revalidatePath("/admin/categories");
    revalidatePath("/blogs");

    return NextResponse.json({ category: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;

    // Check if category exists (use standard query for Neon pooler compatibility)
    const existingResult = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (existingResult.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category is used by any posts
    const postsUsingCategory = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.categoryId, id))
      .limit(1);

    if (postsUsingCategory.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete category: it is used by one or more posts" },
        { status: 400 }
      );
    }

    await db.delete(categories).where(eq(categories.id, id));

    // Revalidate pages that use categories
    revalidatePath("/admin/categories");
    revalidatePath("/blogs");

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
