"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface ServiceFeatureCardProps {
  title: string;
  features: string[];
  index?: number;
}

export function ServiceFeatureCard({ title, features, index = 0 }: ServiceFeatureCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
