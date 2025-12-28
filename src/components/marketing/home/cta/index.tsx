"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Shield, ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { engagementOptions } from "@/lib/data/cta-data";
import { EngagementCard } from "./engagement-card";
import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 sm:-left-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 sm:-right-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] hidden sm:block"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 sm:right-20 w-16 sm:w-32 h-16 sm:h-32 border border-primary/10 rounded-xl transform rotate-12 hidden sm:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-10 sm:left-20 w-12 sm:w-24 h-12 sm:h-24 border border-primary/10 rounded-full hidden sm:block"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Ready to Secure Your Business?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Get Started{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Today
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2">
            Choose your preferred way to begin your cybersecurity journey with IT Origin. Our
            experts are ready to help you strengthen your security posture.
          </p>
        </motion.div>

        {/* Engagement Options */}
        <motion.div variants={fadeInUp} className="mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Multiple Engagement Options
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Select the option that best fits your immediate security needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {engagementOptions.map((option, index) => (
              <EngagementCard key={option.id} {...option} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
          <motion.div variants={fadeInUp}>
            <ContactForm />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ContactInfo />
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div variants={fadeInUp} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group px-8 py-4 text-lg rounded-md font-medium"
            >
              Start Your Security Journey
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            Join 500+ organizations that trust IT Origin for their cybersecurity needs
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTASection;
