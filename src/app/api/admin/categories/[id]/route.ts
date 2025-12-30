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

    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
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

    // Check if category exists
    const existing = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check slug uniqueness if updating slug
    if (validated.slug && validated.slug !== existing.slug) {
      const slugExists = await db.query.categories.findFirst({
        where: eq(categories.slug, validated.slug),
      });
      if (slugExists) {
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

    // Check if category exists
    const existing = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category is used by any posts
    const postsUsingCategory = await db.query.posts.findFirst({
      where: eq(posts.categoryId, id),
    });

    if (postsUsingCategory) {
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
