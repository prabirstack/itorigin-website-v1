import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { posts, postTags, postRedirects, categories, users } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";
import { updatePostSchema } from "@/lib/validations/post";

/**
 * Smart slug management utility
 * Handles auto-generation, uniqueness checking, and redirect creation
 */
async function generateUniqueSlug(
  baseSlug: string,
  excludePostId?: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Use standard query for Neon pooler compatibility
    const existingQuery = excludePostId
      ? db.select({ id: posts.id }).from(posts).where(and(eq(posts.slug, slug), ne(posts.id, excludePostId))).limit(1)
      : db.select({ id: posts.id }).from(posts).where(eq(posts.slug, slug)).limit(1);

    const existing = await existingQuery;

    if (existing.length === 0) return slug;

    // Also check redirects table to avoid conflicts
    const existingRedirect = await db
      .select({ id: postRedirects.id })
      .from(postRedirects)
      .where(eq(postRedirects.oldSlug, slug))
      .limit(1);

    if (existingRedirect.length === 0) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;

    // Safety limit to prevent infinite loops
    if (counter > 100) {
      slug = `${baseSlug}-${nanoid(6)}`;
      break;
    }
  }

  return slug;
}

/**
 * Creates a redirect entry for SEO preservation
 * Old URLs will 301 redirect to the new slug
 */
async function createSlugRedirect(
  oldSlug: string,
  postId: string
): Promise<void> {
  // Check if this redirect already exists using standard query for Neon pooler compatibility
  const existing = await db
    .select({ id: postRedirects.id })
    .from(postRedirects)
    .where(eq(postRedirects.oldSlug, oldSlug))
    .limit(1);

  if (existing.length > 0) {
    // Update the redirect to point to the current post
    await db
      .update(postRedirects)
      .set({ postId })
      .where(eq(postRedirects.oldSlug, oldSlug));
  } else {
    // Create new redirect entry
    await db.insert(postRedirects).values({
      id: nanoid(),
      oldSlug,
      postId,
    });
  }
}

type Params = Promise<{ id: string }>;

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;

    // Use standard query with leftJoin for Neon pooler compatibility
    const result = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        content: posts.content,
        coverImage: posts.coverImage,
        status: posts.status,
        publishedAt: posts.publishedAt,
        authorId: posts.authorId,
        categoryId: posts.categoryId,
        readingTime: posts.readingTime,
        viewCount: posts.viewCount,
        slugLocked: posts.slugLocked,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.id, id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = result[0];

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

    // Use standard query for Neon pooler compatibility
    const existingPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (existingPosts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const existingPost = existingPosts[0];

    // Check if user can edit this post (admin can edit all, author can only edit their own)
    if (session.user.role !== "admin" && existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    // Determine the final slug based on business rules
    let finalSlug = existingPost.slug;
    let slugChanged = false;
    let shouldLockSlug = existingPost.slugLocked;

    // Case 1: User explicitly provides a new slug
    if (validated.slug !== undefined && validated.slug !== existingPost.slug) {
      // Validate and ensure uniqueness
      const newSlug = slugify(validated.slug, { lower: true, strict: true });
      finalSlug = await generateUniqueSlug(newSlug, id);
      slugChanged = true;
      // User manually edited slug, lock it to prevent auto-updates
      shouldLockSlug = true;
    }
    // Case 2: Title changed and slug is NOT locked - auto-generate slug
    else if (
      validated.title !== undefined &&
      validated.title !== existingPost.title &&
      !existingPost.slugLocked
    ) {
      const newSlug = slugify(validated.title, { lower: true, strict: true });
      finalSlug = await generateUniqueSlug(newSlug, id);
      slugChanged = finalSlug !== existingPost.slug;
    }

    // Case 3: User explicitly toggled slugLocked
    if (validated.slugLocked !== undefined) {
      shouldLockSlug = validated.slugLocked;
    }

    // If slug changed, create redirect for SEO
    if (slugChanged && existingPost.slug !== finalSlug) {
      await createSlugRedirect(existingPost.slug, id);
      updateData.slug = finalSlug;
    }

    // Update slugLocked if changed
    if (shouldLockSlug !== existingPost.slugLocked) {
      updateData.slugLocked = shouldLockSlug;
    }

    // Apply other validated fields (excluding slug which we handled above)
    const { slug: _slug, slugLocked: _slugLocked, ...otherFields } = validated;
    Object.assign(updateData, otherFields);

    // Calculate reading time if content changed
    if (validated.content) {
      updateData.readingTime = Math.ceil(validated.content.split(/\s+/).length / 200);
    }

    // Set publishedAt when first publishing
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
    if (slugChanged) {
      revalidatePath(`/blogs/${finalSlug}`);
    }

    return NextResponse.json({
      post: updatedPost,
      slugChanged,
      previousSlug: slugChanged ? existingPost.slug : null,
    });
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

    // Use standard query for Neon pooler compatibility
    const existingPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (existingPosts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const existingPost = existingPosts[0];

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
