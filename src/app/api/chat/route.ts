import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { chatConversations, chatMessages } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { IT_ORIGIN_SYSTEM_PROMPT } from "@/lib/chat-prompt";
import { withRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Apply rate limiting (30 messages per minute)
  const rateLimitResponse = await withRateLimit(request, "chat");
  if (rateLimitResponse) return rateLimitResponse;

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

      // Revalidate admin chat page
      revalidatePath("/admin/chat");
    }

    // Get the last user message to save
    const lastUserMessage = messages?.[messages.length - 1];

    // Extract text content from message (handles both old `content` and new `parts` format)
    const getMessageContent = (msg: {
      content?: string;
      parts?: Array<{ type: string; text?: string }>;
    }) => {
      if (msg.content) return msg.content;
      if (msg.parts) {
        return msg.parts
          .filter((p: { type: string }) => p.type === "text")
          .map((p: { text?: string }) => p.text || "")
          .join("");
      }
      return "";
    };

    // Save user message to database
    if (activeConversationId && lastUserMessage?.role === "user") {
      const userContent = getMessageContent(lastUserMessage);
      await db.insert(chatMessages).values({
        id: nanoid(),
        conversationId: activeConversationId,
        role: "user",
        content: userContent,
        createdAt: new Date(),
      });

      // Update conversation lastMessageAt
      await db
        .update(chatConversations)
        .set({ lastMessageAt: new Date(), updatedAt: new Date() })
        .where(eq(chatConversations.id, activeConversationId));
    }

    // Convert messages to format expected by AI SDK
    const formattedMessages = (messages || []).map(
      (msg: {
        role: string;
        content?: string;
        parts?: Array<{ type: string; text?: string }>;
      }) => ({
        role: msg.role as "user" | "assistant",
        content: getMessageContent(msg),
      })
    );

    // Stream the AI response
    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      system: IT_ORIGIN_SYSTEM_PROMPT,
      messages: formattedMessages,
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
    const response = result.toUIMessageStreamResponse({
      headers: {
        "X-Conversation-Id": activeConversationId || "",
      },
    });
    return response;
  } catch (error) {
    console.error("Chat API error:", error);

    // Check for rate limit / quota errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      return new Response(
        JSON.stringify({
          error: "Service temporarily unavailable",
          message: "Our AI assistant is currently busy. Please try again in a few moments.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Failed to process chat message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
