import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts, postTags, categories, tags, users } from "@/db/schema";
import { eq, desc, and, like, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { requireAuthorOrAdmin } from "@/lib/auth-utils";
import { createPostSchema } from "@/lib/validations/post";

export async function GET(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");

    const offset = (page - 1) * limit;

    const conditions = [];
    if (status) {
      conditions.push(eq(posts.status, status as "draft" | "published"));
    }
    if (search) {
      conditions.push(like(posts.title, `%${search}%`));
    }
    if (categoryId) {
      conditions.push(eq(posts.categoryId, categoryId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [postsList, countResult] = await Promise.all([
      db
        .select({
          id: posts.id,
          slug: posts.slug,
          title: posts.title,
          excerpt: posts.excerpt,
          coverImage: posts.coverImage,
          status: posts.status,
          publishedAt: posts.publishedAt,
          viewCount: posts.viewCount,
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
        .where(whereClause)
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      posts: postsList,
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
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuthorOrAdmin();
    const body = await request.json();

    const validated = createPostSchema.parse(body);

    const slug = validated.slug || slugify(validated.title, { lower: true, strict: true });

    // Check if slug already exists
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const postId = nanoid();
    const readingTime = Math.ceil(validated.content.split(/\s+/).length / 200);

    const [newPost] = await db
      .insert(posts)
      .values({
        id: postId,
        slug,
        title: validated.title,
        excerpt: validated.excerpt || null,
        content: validated.content,
        coverImage: validated.coverImage || null,
        status: validated.status,
        publishedAt: validated.status === "published" ? new Date() : null,
        authorId: session.user.id,
        categoryId: validated.categoryId || null,
        readingTime,
      })
      .returning();

    // Add tags if provided
    if (validated.tagIds && validated.tagIds.length > 0) {
      await db.insert(postTags).values(
        validated.tagIds.map((tagId) => ({
          postId,
          tagId,
        }))
      );
    }

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
