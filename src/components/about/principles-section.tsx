"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface PrinciplesSectionProps {
  title: string;
  description: string;
  principles: string[];
}

export function PrinciplesSection({ title, description, principles }: PrinciplesSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-12 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-4 text-left"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-base font-medium">{principle}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
