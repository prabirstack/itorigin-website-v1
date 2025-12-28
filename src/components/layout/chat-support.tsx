"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, X, Send, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { name, email, message });
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="fixed bottom-30 right-6 z-50"
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group relative cursor-pointer"
            >
              {/* Shuttle Animation Background */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Icon with subtle bounce */}
              <motion.div
                animate={{
                  y: [0, -2, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
              </motion.div>

              {/* Notification Dot */}
              <motion.div
                className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs text-white font-bold">!</span>
              </motion.div>

              <span className="sr-only">Chat Support</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl">
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Headphones className="h-5 w-5 text-green-500" />
                </motion.div>
                Live Chat Support
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Get instant help from our support team. We&apos;re here to assist you!
              </p>
            </DialogHeader>

            {/* Support Team Status */}
            <motion.div
              className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-3 w-3 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Support team is online
                </span>
              </div>
              <div className="ml-auto text-xs text-green-600 dark:text-green-400">
                Avg. response: 2 min
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </label>
                <textarea
                  id="message"
                  placeholder="How can we help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 pt-2"
              >
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </form>

            {/* Quick Help Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-border/30"
            >
              <p className="text-xs text-muted-foreground mb-2">Quick help:</p>
              <div className="flex flex-wrap gap-2">
                {["Technical Support", "Billing", "General Inquiry"].map((topic) => (
                  <motion.button
                    key={topic}
                    type="button"
                    className="text-xs px-3 py-1 bg-accent/50 hover:bg-accent/80 rounded-full transition-colors duration-200"
                    onClick={() => setMessage(`Hi, I need help with ${topic.toLowerCase()}: `)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {topic}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
};
