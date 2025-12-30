import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { posts, postTags, categories, tags, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import slugify from "slugify";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";
import { updatePostSchema } from "@/lib/validations/post";

type Params = Promise<{ id: string }>;

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        postTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const session = await requireAuthorOrAdmin();
    const { id } = await params;
    const body = await request.json();

    const validated = updatePostSchema.parse(body);

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user can edit this post (admin can edit all, author can only edit their own)
    if (session.user.role !== "admin" && existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // If slug is being changed, check for duplicates
    if (validated.slug && validated.slug !== existingPost.slug) {
      const duplicateSlug = await db.query.posts.findFirst({
        where: and(eq(posts.slug, validated.slug), eq(posts.id, id)),
      });
      if (duplicateSlug && duplicateSlug.id !== id) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const updateData: Record<string, unknown> = {
      ...validated,
      updatedAt: new Date(),
    };

    if (validated.content) {
      updateData.readingTime = Math.ceil(validated.content.split(/\s+/).length / 200);
    }

    if (validated.status === "published" && existingPost.status === "draft") {
      updateData.publishedAt = new Date();
    }

    const [updatedPost] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();

    // Update tags if provided
    if (validated.tagIds !== undefined) {
      // Remove existing tags
      await db.delete(postTags).where(eq(postTags.postId, id));

      // Add new tags
      if (validated.tagIds.length > 0) {
        await db.insert(postTags).values(
          validated.tagIds.map((tagId) => ({
            postId: id,
            tagId,
          }))
        );
      }
    }

    // Revalidate blog pages to reflect changes
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${existingPost.slug}`);
    revalidatePath("/sitemap.xml");
    if (validated.slug && validated.slug !== existingPost.slug) {
      revalidatePath(`/blogs/${validated.slug}`);
    }

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const session = await requireAuthorOrAdmin();
    const { id } = await params;

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user can delete this post
    if (session.user.role !== "admin" && existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(posts).where(eq(posts.id, id));

    // Revalidate blog pages after deletion
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${existingPost.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true });
  } catch (error) {
    const authError = handleAuthError(error);
    if (authError) return authError;
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete post" },
      { status: 500 }
    );
  }
}
