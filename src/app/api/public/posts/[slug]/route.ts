import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts, categories, tags, postTags } from "@/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get post with relations
    const post = await db.query.posts.findFirst({
      where: and(eq(posts.slug, slug), eq(posts.status, "published")),
      with: {
        author: true,
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

    // Increment view count
    await db
      .update(posts)
      .set({ viewCount: (post.viewCount || 0) + 1 })
      .where(eq(posts.id, post.id));

    // Get related posts from same category
    let relatedPosts: typeof post[] = [];
    if (post.categoryId) {
      relatedPosts = await db.query.posts.findMany({
        where: and(
          eq(posts.categoryId, post.categoryId),
          eq(posts.status, "published"),
          ne(posts.id, post.id)
        ),
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
        limit: 3,
      });
    }

    // Transform to match BlogPost interface
    const formatPost = (p: typeof post) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || "",
      content: p.content,
      category: p.category?.name || "Uncategorized",
      author: {
        name: p.author?.name || "IT Origin Team",
        avatar: p.author?.image || "/images/authors/default-avatar.jpg",
        role: p.author?.role === "admin" ? "Security Expert" : "Contributor",
      },
      publishedAt: p.publishedAt?.toISOString().split("T")[0] || "",
      readTime: `${p.readingTime || 5} min read`,
      image: p.coverImage || "/images/blog/default-cover.jpg",
      tags: p.postTags.map((pt) => pt.tag.name),
      featured: p.viewCount ? p.viewCount > 500 : false,
    });

    return NextResponse.json({
      post: formatPost(post),
      relatedPosts: relatedPosts.map(formatPost),
    });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
