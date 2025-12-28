"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="text-center max-w-3xl mx-auto mb-20"
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
  );
}
