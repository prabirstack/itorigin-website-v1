"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface IntegrationCardProps {
  name: string;
  category: string;
  icon: IconName;
  index?: number;
}

export function IntegrationCard({
  name,
  category,
  icon,
  index = 0
}: IntegrationCardProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.05}
      variants={fadeInUp}
      whileHover={{ scale: 1.05, y: -4 }}
      className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 text-center"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h4 className="font-bold mb-1">{name}</h4>
      <p className="text-xs text-muted-foreground">{category}</p>
    </motion.div>
  );
}
