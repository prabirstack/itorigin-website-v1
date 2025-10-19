"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface BenefitCardProps {
  icon: IconName;
  title: string;
  description: string;
  index?: number;
}

export function BenefitCard({ icon, title, description, index = 0 }: BenefitCardProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
