"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  features: string[];
  highlight?: boolean;
  index?: number;
}

export function ProductCard({
  name,
  tagline,
  description,
  icon,
  features,
  highlight = false,
  index = 0
}: ProductCardProps) {
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
        highlight
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "border-border bg-card hover:border-primary/50"
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Core Product
          </div>
        </div>
      )}

      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      <h3 className="text-2xl font-black mb-2">{name}</h3>
      <p className="text-sm font-semibold text-primary mb-4">{tagline}</p>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-3">Key Features:</div>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full py-3 rounded-lg font-semibold border border-border hover:bg-accent transition-colors">
        Learn More
      </button>
    </motion.div>
  );
}
