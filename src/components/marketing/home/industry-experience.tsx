"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Building2,
  Heart,
  Factory,
  ShoppingCart,
  GraduationCap,
  Landmark,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

interface SuccessStory {
  id: string;
  title: string;
  metric: string;
  description: string;
}

const industries: Industry[] = [
  {
    id: "1",
    name: "Banking & Financial Services",
    icon: <Building2 className="w-8 h-8" />,
    description: "Securing financial transactions and customer data",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "2",
    name: "Healthcare & Pharma",
    icon: <Heart className="w-8 h-8" />,
    description: "Protecting sensitive medical records and research",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "3",
    name: "Manufacturing & Industrial",
    icon: <Factory className="w-8 h-8" />,
    description: "Safeguarding operational technology and IP",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "4",
    name: "E-commerce & Retail",
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "Securing customer transactions and data",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "5",
    name: "Education & Research",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "Protecting academic data and research assets",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "6",
    name: "Government & Public Sector",
    icon: <Landmark className="w-8 h-8" />,
    description: "Ensuring citizen data security and privacy",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
];

const successStories: SuccessStory[] = [
  {
    id: "1",
    title: "Leading Indian Bank",
    metric: "75% Reduction",
    description: "Reduced security incident response time by 75% for leading Indian bank",
  },
  {
    id: "2",
    title: "Fintech Startup",
    metric: "3 Months",
    description: "Achieved SOC2 Type II certification in record 3 months for fintech startup",
  },
  {
    id: "3",
    title: "Manufacturing Client",
    metric: "₹5+ Crores Saved",
    description: "Prevented ransomware attack saving ₹5+ crores for manufacturing client",
  },
  {
    id: "4",
    title: "ISO 27001 Implementations",
    metric: "100% Success",
    description: "100% compliance success rate across 50+ ISO 27001 implementations",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const industryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const IndustryExperience = () => {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const paginate = (newDirection: number): void => {
    setDirection(newDirection);
    setCurrentStory((prevStory) => {
      if (newDirection === 1) {
        return (prevStory + 1) % successStories.length;
      }
      return prevStory === 0 ? successStories.length - 1 : prevStory - 1;
    });
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
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

        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-xl transform rotate-12"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-20 w-24 h-24 border border-primary/10 rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Industry Leadership</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Proven Track Record{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Across Industries
            </span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
            Delivering world-class cybersecurity solutions to organizations across diverse industry
            sectors with measurable results and proven success.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                variants={industryVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                  <CardContent className="p-6 h-full flex flex-col relative z-10">
                    <div className="mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.gradient} border-2 border-border/30 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500`}
                      >
                        {industry.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                      {industry.name}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors leading-relaxed flex-grow">
                      {industry.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">View Solutions</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories Slider */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Success Stories
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results for real businesses across diverse industry sectors
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Slider Container */}
            <div className="relative h-64 mb-8 overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStory}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Card className="h-full bg-gradient-to-br from-primary to-primary/80 border-0 shadow-2xl shadow-primary/20 relative overflow-hidden">
                    <CardContent className="p-8 h-full flex flex-col justify-center text-center relative z-10">
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-primary-foreground mb-2">
                          {successStories[currentStory].metric}
                        </div>
                        <div className="text-xl font-semibold text-primary-foreground/90 mb-4">
                          {successStories[currentStory].title}
                        </div>
                      </div>
                      <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
                        {successStories[currentStory].description}
                      </p>
                    </CardContent>

                    {/* Card gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/[0.05] pointer-events-none" />
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(-1)}
                className="border-border/60 hover:border-primary/40 bg-card/60 hover:bg-card/80 text-foreground hover:text-primary backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentStory ? 1 : -1);
                      setCurrentStory(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStory
                        ? "bg-primary scale-110"
                        : "bg-border hover:bg-border/80"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(1)}
                className="border-border/60 hover:border-primary/40 bg-card/60 hover:bg-card/80 text-foreground hover:text-primary backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group px-8 py-4 text-lg"
            >
              Read Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
