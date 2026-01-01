import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";

type Params = Promise<{ id: string }>;

export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;
    const body = await request.json();
    const { approved } = body;

    // Use standard query for Neon pooler compatibility
    const existingComments = await db
      .select({ id: comments.id })
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);

    if (existingComments.length === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const [updatedComment] = await db
      .update(comments)
      .set({
        approved: approved === true,
        updatedAt: new Date(),
      })
      .where(eq(comments.id, id))
      .returning();

    return NextResponse.json({ comment: updatedComment });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    await requireAuthorOrAdmin();
    const { id } = await params;

    // Use standard query for Neon pooler compatibility
    const existingComments = await db
      .select({ id: comments.id })
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);

    if (existingComments.length === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    await db.delete(comments).where(eq(comments.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
