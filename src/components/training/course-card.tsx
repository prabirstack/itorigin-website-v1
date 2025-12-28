"use client";

import { motion } from "motion/react";
import { Check, Clock, Target } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  format: string;
  price: string;
  features: string[];
  icon: IconName;
  popular?: boolean;
  index?: number;
}

export function CourseCard({
  title,
  description,
  duration,
  level,
  format,
  price,
  features,
  icon,
  popular = false,
  index = 0
}: CourseCardProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 bg-card ${
        popular
          ? "border-primary shadow-lg shadow-primary/20"
          : "border-border hover:border-primary/50"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-primary">{price}</div>
        </div>
      </div>

      <h3 className="text-2xl font-black mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-sm">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-sm">
          <Target className="w-4 h-4" />
          <span>{level}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-2 text-muted-foreground">
          Format: {format}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-3">What You&apos;ll Learn:</div>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border hover:bg-accent"
        }`}
      >
        Enroll Now
      </button>
    </motion.div>
  );
}
