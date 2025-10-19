"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface PricingCardProps {
  name: string;
  description: string;
  price?: string;
  features: string[];
  highlighted?: boolean;
  index?: number;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  highlighted = false,
  index = 0
}: PricingCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 ${
        highlighted
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-black mb-2">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {price && (
        <div className="mb-6">
          <div className="text-4xl font-black text-primary">{price}</div>
          <div className="text-sm text-muted-foreground">per month</div>
        </div>
      )}

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border hover:bg-accent"
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}
