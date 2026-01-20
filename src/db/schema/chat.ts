import { pgTable, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const conversationStatusEnum = pgEnum("conversation_status", [
  "active",
  "closed",
  "archived",
]);

export const messageRoleEnum = pgEnum("message_role", ["user", "agent"]);

export const chatConversations = pgTable("chat_conversations", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  visitorName: text("visitor_name"),
  visitorEmail: text("visitor_email"),
  status: conversationStatusEnum("status").notNull().default("active"),
  assignedTo: text("assigned_to").references(() => users.id, {
    onDelete: "set null",
  }),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => chatConversations.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  senderId: text("sender_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const chatConversationsRelations = relations(
  chatConversations,
  ({ one, many }) => ({
    assignedAgent: one(users, {
      fields: [chatConversations.assignedTo],
      references: [users.id],
    }),
    messages: many(chatMessages),
  })
);

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  conversation: one(chatConversations, {
    fields: [chatMessages.conversationId],
    references: [chatConversations.id],
  }),
}));

// Chat Email Verification - for verifying company emails before chat
export const chatEmailVerifications = pgTable("chat_email_verifications", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  pin: text("pin").notNull(),
  verified: boolean("verified").notNull().default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type NewChatConversation = typeof chatConversations.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type NewChatMessage = typeof chatMessages.$inferInsert;
export type ChatEmailVerification = typeof chatEmailVerifications.$inferSelect;
export type NewChatEmailVerification = typeof chatEmailVerifications.$inferInsert;
