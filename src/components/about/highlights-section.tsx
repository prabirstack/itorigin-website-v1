"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

interface HighlightsSectionProps {
  title: string;
  description: string;
  highlights: Highlight[];
}

export function HighlightsSection({ title, description, highlights }: HighlightsSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = getIcon(highlight.icon);
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
