"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Bot, DollarSign, Shield, FileBarChart, Target } from "lucide-react";
import { benefitSectionHeader, benefits, type BenefitItem } from "@/utils/data/home/benefit-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Bot,
  DollarSign,
  Shield,
  FileBarChart,
  Target,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const BenifitGrid = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
          {benefitSectionHeader.title}
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          {benefitSectionHeader.description}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {benefits.map((benefit) => {
          const Icon = iconMap[benefit.iconName];
          return (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card
                className={`h-full border-2 ${benefit.accentColor} bg-card/60 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 relative overflow-hidden group`}
              >
                <CardContent className="p-6 sm:p-8 flex flex-col h-full relative z-10">
                  <div
                    className={`w-20 h-20 rounded-3xl bg-linear-to-br ${benefit.gradient} border-2 border-border/30 flex items-center justify-center mb-8 relative overflow-hidden group-hover:border-primary/40 transition-all duration-500 group-hover:scale-105`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl ${benefit.iconBg} flex items-center justify-center shadow-2xl relative`}
                    >
                      <motion.div
                        variants={iconVariants}
                        whileHover="hover"
                        className="relative z-10"
                      >
                        {Icon && <Icon className="w-7 h-7 text-white drop-shadow-lg" />}
                      </motion.div>
                      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-500 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                    <Link
                      href={benefit.href}
                      className="flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      <span className="mr-3">Explore Feature</span>
                      <motion.svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        whileHover={{ x: 4, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="drop-shadow-sm"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </motion.svg>
                    </Link>
                  </div>

                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-black/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Animated border gradient */}
                  <div
                    className="absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${
                        benefit.iconBg.split("from-")[1].split(" ")[0]
                      }/20 120deg, transparent 240deg)`,
                      mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                      maskComposite: "xor",
                      WebkitMask:
                        "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                      WebkitMaskComposite: "xor",
                      padding: "2px",
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-linear-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-64 w-96 h-96 bg-linear-to-l from-primary/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </section>
  );
};
