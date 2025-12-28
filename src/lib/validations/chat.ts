import { z } from "zod";

export const startChatSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  conversationId: z.string().optional(),
});

export const conversationStatusSchema = z.enum(["active", "closed", "archived"]);

export const updateConversationSchema = z.object({
  status: conversationStatusSchema.optional(),
});

export type StartChatInput = z.infer<typeof startChatSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type UpdateConversationInput = z.infer<typeof updateConversationSchema>;
