"use client";

import { motion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface PartnerTierCardProps {
  name: string;
  description: string;
  icon: IconName;
  benefits: string[];
  requirements: string[];
  highlighted?: boolean;
  index?: number;
}

export function PartnerTierCard({
  name,
  description,
  icon,
  benefits,
  requirements,
  highlighted = false,
  index = 0
}: PartnerTierCardProps) {
  const Icon = getIcon(icon);

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

      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      <h3 className="text-2xl font-black mb-2">{name}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-3">Partner Benefits:</div>
        <ul className="space-y-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 pt-6 border-t border-border">
        <div className="text-sm font-semibold mb-3">Requirements:</div>
        <ul className="space-y-2">
          {requirements.map((requirement, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border hover:bg-accent"
        }`}
      >
        Apply for {name}
      </button>
    </motion.div>
  );
}
