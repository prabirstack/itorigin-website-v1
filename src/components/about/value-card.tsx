"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface ValueCardProps {
  icon: IconName;
  title: string;
  description: string;
  index?: number;
  color?: string;
}

export function ValueCard({
  icon,
  title,
  description,
  index = 0,
  color = "from-primary to-primary/80"
}: ValueCardProps) {
  const Icon = getIcon(icon);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative space-y-4">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
