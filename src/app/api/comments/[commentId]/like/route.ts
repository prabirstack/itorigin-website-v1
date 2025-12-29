import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments, commentLikes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface RouteParams {
  params: Promise<{
    commentId: string;
  }>;
}

// POST - Like or unlike a comment
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { commentId } = await params;
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ error: "You must be signed in to like comments" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if comment exists and is approved
    const comment = await db.query.comments.findFirst({
      where: and(eq(comments.id, commentId), eq(comments.approved, true)),
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check if user already liked this comment
    const existingLike = await db.query.commentLikes.findFirst({
      where: and(
        eq(commentLikes.commentId, commentId),
        eq(commentLikes.userId, userId)
      ),
    });

    if (existingLike) {
      // Unlike - remove the like
      await db
        .delete(commentLikes)
        .where(
          and(
            eq(commentLikes.commentId, commentId),
            eq(commentLikes.userId, userId)
          )
        );

      // Decrement like count
      await db
        .update(comments)
        .set({ likeCount: Math.max(0, comment.likeCount - 1) })
        .where(eq(comments.id, commentId));

      return NextResponse.json({
        liked: false,
        likeCount: Math.max(0, comment.likeCount - 1),
      });
    } else {
      // Like - add the like
      await db.insert(commentLikes).values({
        commentId,
        userId,
      });

      // Increment like count
      await db
        .update(comments)
        .set({ likeCount: comment.likeCount + 1 })
        .where(eq(comments.id, commentId));

      return NextResponse.json({
        liked: true,
        likeCount: comment.likeCount + 1,
      });
    }
  } catch (error) {
    console.error("Failed to like comment:", error);
    return NextResponse.json({ error: "Failed to like comment" }, { status: 500 });
  }
}
