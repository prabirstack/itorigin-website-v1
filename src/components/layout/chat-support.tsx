"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ChatPhase = "form" | "chat";

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string | null>(null);

  // Custom fetch to capture conversation ID from response headers
  const customFetch = useCallback(async (url: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(url, init);

    // Extract conversation ID from response headers
    const newConversationId = response.headers.get("X-Conversation-Id");
    if (newConversationId && !conversationIdRef.current) {
      conversationIdRef.current = newConversationId;
      setConversationId(newConversationId);
    }

    return response;
  }, []);

  const {
    messages,
    status,
    sendMessage,
    setMessages,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        conversationId,
        visitorName: name,
        visitorEmail: email,
      },
      fetch: customFetch,
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setPhase("chat");
    }
  };

  const resetChat = () => {
    setPhase("form");
    setName("");
    setEmail("");
    setInput("");
    setConversationId(null);
    conversationIdRef.current = null;
    setMessages([]);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Helper to extract text from message parts
  const getMessageText = (message: typeof messages[0]) => {
    if (!message.parts) return "";
    return message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("");
  };

  const quickTopics = ["SOC Services", "Penetration Testing", "Compliance", "Get a Quote"];

  return (
    <>
      {/* Chat Button - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="fixed bottom-30 right-6 z-50"
      >
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetChat();
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group relative cursor-pointer"
            >
              {/* Pulse Animation */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, -2, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
              </motion.div>
              {/* Notification Dot */}
              <motion.div
                className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xs text-white font-bold">!</span>
              </motion.div>
              <span className="sr-only">Chat Support</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md h-150 flex flex-col bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl p-0 gap-0">
            <DialogHeader className="p-4 pb-2 border-b shrink-0">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-5 w-5 text-green-500" />
                </motion.div>
                IT Origin AI Assistant
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {phase === "form"
                  ? "Enter your details to start chatting"
                  : "Ask me anything about our cybersecurity services!"}
              </p>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {phase === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 p-4 overflow-auto"
                >
                  {/* AI Status Indicator */}
                  <motion.div
                    className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      className="h-3 w-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      AI Assistant is online
                    </span>
                    <div className="ml-auto text-xs text-green-600 dark:text-green-400">
                      Instant responses
                    </div>
                  </motion.div>

                  <form onSubmit={handleStartChat} className="space-y-4">
                    <div>
                      <label htmlFor="chat-name" className="text-sm font-medium">
                        Name *
                      </label>
                      <input
                        id="chat-name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="chat-email" className="text-sm font-medium">
                        Email *
                      </label>
                      <input
                        id="chat-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  </form>

                  {/* Quick Help Options */}
                  <div className="pt-4 border-t border-border/30 mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Popular topics:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickTopics.map((topic) => (
                        <motion.button
                          key={topic}
                          type="button"
                          className="text-xs px-3 py-1 bg-accent/50 hover:bg-accent/80 rounded-full transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {topic}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 px-4">
                    <div className="space-y-4 py-4">
                      {/* Welcome message */}
                      {messages.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[85%]">
                            <p className="text-sm">
                              Hello {name}! I&apos;m IT Origin&apos;s AI assistant. How
                              can I help you with your cybersecurity needs today?
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex gap-3",
                            message.role === "user" && "flex-row-reverse"
                          )}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10"
                            )}
                          >
                            {message.role === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div
                            className={cn(
                              "rounded-lg p-3 max-w-[85%] text-sm",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-muted rounded-tl-none"
                            )}
                          >
                            <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
                          </div>
                        </motion.div>
                      ))}

                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div className="bg-muted rounded-lg rounded-tl-none p-3">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <form
                    onSubmit={handleChatSubmit}
                    className="p-4 border-t flex gap-2 shrink-0"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || !input.trim()}
                      className="bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
};
