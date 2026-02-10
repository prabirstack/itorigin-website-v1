"use client";

import { motion } from "motion/react";
import { staggerContainer, scaleUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface Stat {
  label: string;
  value: string;
  icon: IconName;
}

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  const gridCols =
    stats.length === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : stats.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/40 via-accent/20 to-transparent" />
      <div className="absolute inset-0 border-y border-border/50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${gridCols} gap-6 lg:gap-8`}
        >
          {stats.map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <motion.div
                key={index}
                variants={scaleUp}
                className="group relative text-center p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-1.5 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
