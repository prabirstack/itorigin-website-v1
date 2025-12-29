import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

const createCommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  content: z.string().min(1, "Comment content is required").max(2000, "Comment is too long"),
  parentId: z.string().optional(),
});

// GET - Get approved comments for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Get current user to check if they liked comments
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    // Get all approved top-level comments with their approved replies
    const commentsData = await db.query.comments.findMany({
      where: and(
        eq(comments.postId, postId),
        eq(comments.approved, true),
        isNull(comments.parentId)
      ),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          where: eq(comments.approved, true),
          with: {
            author: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
            likes: userId ? {
              where: eq(comments.id, comments.id), // Will filter in code
            } : undefined,
          },
          orderBy: [desc(comments.createdAt)],
        },
        likes: userId ? {
          columns: {
            userId: true,
          },
        } : undefined,
      },
      orderBy: [desc(comments.createdAt)],
    });

    // Transform comments to include userLiked status
    const transformedComments = commentsData.map((comment) => ({
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      authorName: comment.author?.name || comment.guestName || "Anonymous",
      authorImage: comment.author?.image || null,
      likeCount: comment.likeCount,
      userLiked: userId ? comment.likes?.some((like) => like.userId === userId) : false,
      createdAt: comment.createdAt.toISOString(),
      replies: comment.replies?.map((reply) => ({
        id: reply.id,
        content: reply.content,
        authorId: reply.authorId,
        authorName: reply.author?.name || reply.guestName || "Anonymous",
        authorImage: reply.author?.image || null,
        likeCount: reply.likeCount,
        userLiked: userId ? reply.likes?.some((like) => like.userId === userId) : false,
        createdAt: reply.createdAt.toISOString(),
      })) || [],
    }));

    return NextResponse.json({
      comments: transformedComments,
      total: transformedComments.length,
    });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ error: "You must be signed in to comment" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createCommentSchema.parse(body);

    // If it's a reply, verify the parent comment exists and is approved
    if (validatedData.parentId) {
      const parentComment = await db.query.comments.findFirst({
        where: and(
          eq(comments.id, validatedData.parentId),
          eq(comments.approved, true)
        ),
      });

      if (!parentComment) {
        return NextResponse.json({ error: "Parent comment not found" }, { status: 404 });
      }

      // Don't allow nested replies (replies to replies)
      if (parentComment.parentId) {
        return NextResponse.json({ error: "Cannot reply to a reply" }, { status: 400 });
      }
    }

    const newComment = await db
      .insert(comments)
      .values({
        id: nanoid(),
        content: validatedData.content,
        postId: validatedData.postId,
        authorId: session.user.id,
        parentId: validatedData.parentId || null,
        approved: false, // Comments require admin approval
        likeCount: 0,
      })
      .returning();

    return NextResponse.json({
      comment: newComment[0],
      message: "Your comment has been submitted and is pending approval.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Failed to create comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
