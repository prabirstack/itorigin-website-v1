"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface FeatureShowcaseProps {
  title: string;
  description: string;
  icon: IconName;
  metrics: string[];
  index?: number;
}

export function FeatureShowcase({
  title,
  description,
  icon,
  metrics,
  index = 0
}: FeatureShowcaseProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-black mb-3">{title}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary"
              >
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
