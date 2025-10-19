"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  index?: number;
}

export function ProcessStep({ step, title, description, index = 0 }: ProcessStepProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      className="relative"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-xl font-black shadow-lg">
            {step}
          </div>
        </div>
        <div className="flex-1 pt-2">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
