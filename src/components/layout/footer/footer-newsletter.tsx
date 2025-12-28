"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Send, CheckCircle } from "lucide-react";
import { securityBadges } from "@/lib/data/footer-data";
import { iconMap } from "@/lib/icon-map";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Stay Updated</h4>
        <p className="text-sm text-muted-foreground">
          Get the latest cybersecurity insights, threat intelligence, and product updates.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-muted-foreground"
            required
          />
          <motion.button
            type="submit"
            disabled={isLoading || isSubscribed}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all duration-200 ${
              isSubscribed
                ? "bg-green-500 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : isSubscribed ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {isSubscribed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-600 dark:text-green-400"
          >
            ✅ Successfully subscribed!
          </motion.p>
        )}

        <p className="text-xs text-muted-foreground">
          By subscribing, you agree to our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          and consent to receive updates from IT Origin.
        </p>
      </form>

      {/* Security Badges */}
      <div className="space-y-4">
        <h5 className="font-medium text-foreground text-sm">Security & Compliance</h5>
        <div className="grid grid-cols-2 gap-2">
          {securityBadges.map((badge) => {
            const Icon = iconMap[badge.iconName];
            return (
              <div
                key={badge.label}
                className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg"
              >
                {Icon && <Icon className="w-4 h-4 text-primary" />}
                <span className="text-xs font-medium">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
