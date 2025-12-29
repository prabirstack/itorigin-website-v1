import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatConversations, chatMessages } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";
import { updateConversationSchema } from "@/lib/validations/chat";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Get conversation with messages
    const conversation = await db.query.chatConversations.findFirst({
      where: eq(chatConversations.id, id),
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Get all messages
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, id))
      .orderBy(asc(chatMessages.createdAt));

    return NextResponse.json({
      conversation,
      messages,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateConversationSchema.parse(body);

    // Check if conversation exists
    const existing = await db.query.chatConversations.findFirst({
      where: eq(chatConversations.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Update conversation
    const [updated] = await db
      .update(chatConversations)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(chatConversations.id, id))
      .returning();

    return NextResponse.json({ conversation: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Check if conversation exists
    const existing = await db.query.chatConversations.findFirst({
      where: eq(chatConversations.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Delete conversation (messages will cascade delete)
    await db
      .delete(chatConversations)
      .where(eq(chatConversations.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
