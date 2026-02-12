"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, Bot, User, Loader2, Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
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

type ChatPhase = "form" | "verification" | "chat";

// List of blocked free email domains (subset for client-side validation)
const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com", "hotmail.com", "outlook.com", "live.com",
  "yahoo.com", "yahoo.co.in", "ymail.com", "aol.com", "icloud.com", "me.com",
  "protonmail.com", "proton.me", "mail.com", "zoho.com", "rediffmail.com",
  "rediff.com", "mail.ru", "yandex.com", "qq.com", "163.com",
];

function isBlockedDomain(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return true;
  return BLOCKED_DOMAINS.includes(domain);
}

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // Verification state
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string | null>(null);

  // Custom fetch to capture conversation ID and inject dynamic body
  const customFetch = useCallback(async (url: RequestInfo | URL, init?: RequestInit) => {
    // Inject current conversationId into the request body
    if (init?.body) {
      try {
        const bodyData = JSON.parse(init.body as string);
        bodyData.conversationId = conversationIdRef.current;
        bodyData.visitorName = name;
        bodyData.visitorEmail = email;
        init = {
          ...init,
          body: JSON.stringify(bodyData),
        };
      } catch {
        // If body parsing fails, continue with original
      }
    }

    const response = await fetch(url, init);

    // Extract conversation ID from response headers
    const newConversationId = response.headers.get("X-Conversation-Id");
    if (newConversationId && !conversationIdRef.current) {
      conversationIdRef.current = newConversationId;
    }

    return response;
  }, [name, email]);

  const {
    messages,
    status,
    sendMessage,
    setMessages,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        conversationId: conversationIdRef.current,
        visitorName: name,
        visitorEmail: email,
      },
      fetch: customFetch,
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  // Validate email domain on change
  useEffect(() => {
    if (email && email.includes("@")) {
      if (isBlockedDomain(email)) {
        setEmailError("Please use your company email. Personal email addresses are not accepted.");
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }, [email]);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || emailError) return;

    setIsSendingCode(true);
    setVerificationError(null);

    try {
      const res = await fetch("/api/chat/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "BLOCKED_DOMAIN") {
          setEmailError(data.message);
        } else {
          setVerificationError(data.message || "Failed to send verification code");
        }
        return;
      }

      setVerificationId(data.verificationId);
      setPhase("verification");
    } catch (error) {
      setVerificationError("Failed to send verification code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationId || !pin || pin.length !== 6) return;

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const res = await fetch("/api/chat/verify/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationId, pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVerificationError(data.message || "Invalid verification code");
        return;
      }

      setVerificationSuccess(true);
      // Wait a moment to show success, then proceed to chat
      setTimeout(() => {
        setPhase("chat");
      }, 1000);
    } catch (error) {
      setVerificationError("Failed to verify code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setPin("");
    setVerificationError(null);
    setVerificationSuccess(false);
    setIsSendingCode(true);

    try {
      const res = await fetch("/api/chat/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVerificationError(data.message || "Failed to resend code");
        return;
      }

      setVerificationId(data.verificationId);
      setVerificationError(null);
    } catch (error) {
      setVerificationError("Failed to resend code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const resetChat = () => {
    setPhase("form");
    setName("");
    setEmail("");
    setInput("");
    setEmailError(null);
    setVerificationId(null);
    setPin("");
    setVerificationError(null);
    setVerificationSuccess(false);
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
    // Handle direct content string (older format)
    if ("content" in message && typeof message.content === "string") {
      return message.content;
    }
    // Handle parts array (newer format)
    if (message.parts) {
      return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("");
    }
    return "";
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
                ITOrigin AI Assistant
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {phase === "form"
                  ? "Enter your company email to start chatting"
                  : phase === "verification"
                    ? "Verify your email address"
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

                  {/* Company Email Notice */}
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 mb-4">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        <strong>Company email required:</strong> We only accept business email addresses for chat support. Personal emails (Gmail, Yahoo, etc.) are not accepted.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSendVerification} className="space-y-4">
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
                        Company Email *
                      </label>
                      <input
                        id="chat-email"
                        type="email"
                        placeholder="you@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={cn(
                          "mt-1 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          emailError ? "border-destructive focus-visible:ring-destructive" : "border-input"
                        )}
                      />
                      {emailError && (
                        <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {emailError}
                        </p>
                      )}
                    </div>
                    {verificationError && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {verificationError}
                        </p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      disabled={isSendingCode || !!emailError || !name || !email}
                    >
                      {isSendingCode ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Verification Code
                        </>
                      )}
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
              ) : phase === "verification" ? (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 p-4 overflow-auto"
                >
                  {/* Back button */}
                  <button
                    onClick={() => {
                      setPhase("form");
                      setPin("");
                      setVerificationError(null);
                      setVerificationSuccess(false);
                    }}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {/* Email sent confirmation */}
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                          Check your email
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          We sent a 6-digit code to <strong>{email}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyPin} className="space-y-4">
                    <div>
                      <label htmlFor="chat-pin" className="text-sm font-medium">
                        Verification Code *
                      </label>
                      <input
                        id="chat-pin"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        value={pin}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setPin(value);
                          setVerificationError(null);
                        }}
                        required
                        disabled={verificationSuccess}
                        className={cn(
                          "mt-1 flex h-12 w-full rounded-md border bg-background px-3 py-2 text-lg text-center font-mono tracking-widest placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          verificationSuccess ? "border-green-500 bg-green-50 dark:bg-green-950/30" : "border-input"
                        )}
                      />
                    </div>

                    {verificationError && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {verificationError}
                        </p>
                      </div>
                    )}

                    {verificationSuccess && (
                      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          Email verified! Starting chat...
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      disabled={isVerifying || pin.length !== 6 || verificationSuccess}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : verificationSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Verified!
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Verify & Start Chat
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Resend option */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Didn&apos;t receive the code?
                    </p>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isSendingCode}
                      className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingCode ? "Sending..." : "Resend code"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col min-h-0 overflow-hidden"
                >
                  {/* Messages Area */}
                  <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 h-0">
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
                              Hello {name}! I&apos;m ITOrigin&apos;s AI assistant. How
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
