"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface PageHeroProps {
  badge?: {
    icon: IconName;
    text: string;
  };
  title: string;
  highlight?: string;
  description: string;
  className?: string;
}

export function PageHero({
  badge,
  title,
  highlight,
  description,
  className = ""
}: PageHeroProps) {
  return (
    <section className={`relative py-20 md:py-32 overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {badge && (() => {
            const Icon = getIcon(badge.icon);
            return (
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Icon className="w-4 h-4" />
                <span>{badge.text}</span>
              </motion.div>
            );
          })()}

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
          >
            {title}
            {highlight && (
              <span className="block text-primary mt-2">{highlight}</span>
            )}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
