import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts, categories, tags, postTags, users } from "@/db/schema";
import { eq, desc, and, ilike, or, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [eq(posts.status, "published")];

    // Category filter - match by category name using standard query for Neon pooler compatibility
    if (category && category !== "All Posts") {
      const categoryResult = await db
        .select()
        .from(categories)
        .where(eq(categories.name, category))
        .limit(1);
      const categoryRecord = categoryResult[0];
      if (categoryRecord) {
        conditions.push(eq(posts.categoryId, categoryRecord.id));
      }
    }

    // Search filter
    if (search) {
      conditions.push(
        or(
          ilike(posts.title, `%${search}%`),
          ilike(posts.excerpt, `%${search}%`)
        )!
      );
    }

    // Get posts with relations
    const postsData = await db.query.posts.findMany({
      where: and(...conditions),
      with: {
        author: true,
        category: true,
        postTags: {
          with: {
            tag: true,
          },
        },
      },
      orderBy: [desc(posts.publishedAt)],
      limit,
      offset,
    });

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(and(...conditions));
    const total = Number(countResult[0]?.count || 0);

    // Transform to match BlogPost interface
    const formattedPosts = postsData.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category?.name || "Uncategorized",
      author: {
        name: post.author?.name || "IT Origin Team",
        avatar: post.author?.image || "/images/authors/default-avatar.jpg",
        role: post.author?.role === "admin" ? "Security Expert" : "Contributor",
      },
      publishedAt: post.publishedAt?.toISOString().split("T")[0] || "",
      readTime: `${post.readingTime || 5} min read`,
      image: post.coverImage || "/images/blog/default-cover.jpg",
      tags: post.postTags.map((pt) => pt.tag.name),
      featured: post.viewCount ? post.viewCount > 500 : false,
    }));

    return NextResponse.json({
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
