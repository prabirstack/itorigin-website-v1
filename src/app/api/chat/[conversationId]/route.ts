import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatMessages, chatConversations } from "@/db/schema";
import { eq, asc, sql } from "drizzle-orm";

type Params = Promise<{ conversationId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { conversationId } = await params;

    // Get conversation using standard SQL for Neon pooler compatibility
    const conversationResult = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, sql`${conversationId}`))
      .limit(1);
    const conversation = conversationResult[0];

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Get messages
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(asc(chatMessages.createdAt));

    return NextResponse.json({
      conversation,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role === "agent" ? "assistant" : "user",
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}
