"use client";

import { motion } from "motion/react";
import { fadeInLeft, fadeInRight, scaleUp, staggerContainer } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface Stat {
  value: string;
  label: string;
}

interface ValuesPreviewSectionProps {
  badge: {
    icon: IconName;
    text: string;
  };
  title: string;
  description: string;
  values: string[];
  stats: Stat[];
}

export function ValuesPreviewSection({
  badge,
  title,
  description,
  values,
  stats
}: ValuesPreviewSectionProps) {
  const Icon = getIcon(badge.icon);
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInLeft} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon className="w-4 h-4" />
              <span>{badge.text}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {value}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                custom={index * 0.1}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
