import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatConversations, chatMessages } from "@/db/schema";
import { desc, eq, like, and, sql } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];
    if (status && status !== "all") {
      conditions.push(
        eq(
          chatConversations.status,
          status as "active" | "closed" | "archived"
        )
      );
    }
    if (search) {
      conditions.push(
        like(chatConversations.visitorEmail, `%${search}%`)
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Fetch conversations with message count
    const [conversations, countResult] = await Promise.all([
      db
        .select({
          id: chatConversations.id,
          sessionId: chatConversations.sessionId,
          visitorName: chatConversations.visitorName,
          visitorEmail: chatConversations.visitorEmail,
          status: chatConversations.status,
          lastMessageAt: chatConversations.lastMessageAt,
          createdAt: chatConversations.createdAt,
          messageCount: sql<number>`(
            SELECT COUNT(*) FROM chat_messages
            WHERE chat_messages.conversation_id = ${chatConversations.id}
          )`.as("message_count"),
        })
        .from(chatConversations)
        .where(whereClause)
        .orderBy(desc(chatConversations.lastMessageAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(chatConversations)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      conversations,
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
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
