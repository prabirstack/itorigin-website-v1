"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

export function CTASection({ title, description, buttons }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-8"
          >
            {description}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={
                  button.variant === "secondary"
                    ? "px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                    : "px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
                }
              >
                {button.text}
                {button.variant !== "secondary" && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
