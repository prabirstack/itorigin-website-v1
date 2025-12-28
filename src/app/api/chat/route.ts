import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { chatConversations, chatMessages } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { IT_ORIGIN_SYSTEM_PROMPT } from "@/lib/chat-prompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, conversationId, visitorName, visitorEmail } = body;

    let activeConversationId = conversationId;

    // If no conversation exists and we have visitor info, create one
    if (!activeConversationId && visitorName && visitorEmail) {
      const [newConversation] = await db
        .insert(chatConversations)
        .values({
          id: nanoid(),
          sessionId: nanoid(),
          visitorName,
          visitorEmail,
          status: "active",
          lastMessageAt: new Date(),
        })
        .returning();

      activeConversationId = newConversation.id;
    }

    // Get the last user message to save
    const lastUserMessage = messages?.[messages.length - 1];

    // Save user message to database
    if (activeConversationId && lastUserMessage?.role === "user") {
      await db.insert(chatMessages).values({
        id: nanoid(),
        conversationId: activeConversationId,
        role: "user",
        content: lastUserMessage.content,
        createdAt: new Date(),
      });

      // Update conversation lastMessageAt
      await db
        .update(chatConversations)
        .set({ lastMessageAt: new Date(), updatedAt: new Date() })
        .where(eq(chatConversations.id, activeConversationId));
    }

    // Stream the AI response
    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: IT_ORIGIN_SYSTEM_PROMPT,
      messages: messages || [],
      onFinish: async ({ text }) => {
        // Save AI response to database
        if (activeConversationId && text) {
          await db.insert(chatMessages).values({
            id: nanoid(),
            conversationId: activeConversationId,
            role: "agent",
            content: text,
            createdAt: new Date(),
          });

          await db
            .update(chatConversations)
            .set({ lastMessageAt: new Date(), updatedAt: new Date() })
            .where(eq(chatConversations.id, activeConversationId));
        }
      },
    });

    // Return streaming response with conversation ID in headers
    const response = result.toTextStreamResponse();
    response.headers.set("X-Conversation-Id", activeConversationId || "");
    return response;
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
