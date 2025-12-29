import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments, posts, users } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const approved = searchParams.get("approved");
    const postId = searchParams.get("postId");

    const offset = (page - 1) * limit;

    const conditions = [];
    if (approved !== null && approved !== "") {
      conditions.push(eq(comments.approved, approved === "true"));
    }
    if (postId) {
      conditions.push(eq(comments.postId, postId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [commentsList, countResult] = await Promise.all([
      db
        .select({
          id: comments.id,
          content: comments.content,
          guestName: comments.guestName,
          guestEmail: comments.guestEmail,
          approved: comments.approved,
          createdAt: comments.createdAt,
          post: {
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
          },
          author: {
            id: users.id,
            name: users.name,
            email: users.email,
          },
        })
        .from(comments)
        .leftJoin(posts, eq(comments.postId, posts.id))
        .leftJoin(users, eq(comments.authorId, users.id))
        .where(whereClause)
        .orderBy(desc(comments.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(comments)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      comments: commentsList,
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
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
