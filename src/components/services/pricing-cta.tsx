"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface PricingCTAProps {
  serviceName?: string;
}

export function PricingCTA({ serviceName }: PricingCTAProps) {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-primary/10 p-8 sm:p-12 lg:p-16"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                <span>Talk to Our Experts</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Let&apos;s Build Your{" "}
                <span className="text-primary">Security Plan</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Every organisation is unique. We design{" "}
                {serviceName ? `${serviceName} solutions` : "security solutions"}{" "}
                that fit your specific requirements, scale, and budget.
              </p>
            </motion.div>

            {/* Value props */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card/80 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">No Hidden Costs</p>
                  <p className="text-xs text-muted-foreground">Transparent pricing</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card/80 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Flexible Plans</p>
                  <p className="text-xs text-muted-foreground">Scale as you grow</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card/80 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Consultation</p>
                  <p className="text-xs text-muted-foreground">No obligation quote</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 group w-full sm:w-auto"
              >
                Get a Custom Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
              >
                Schedule a Call
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
