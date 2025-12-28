"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Bot, DollarSign, Shield, FileBarChart, Target } from "lucide-react";

interface Benefit {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  accentColor: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: Zap,
    title: "Sub-15 Min Response Time",
    description:
      "Lightning-fast incident response with automated threat containment and expert intervention within 15 minutes.",
    gradient: "from-blue-500/10 via-cyan-500/10 to-blue-600/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    accentColor: "border-blue-500/20 hover:border-blue-400/40",
  },
  {
    id: 2,
    icon: Bot,
    title: "AI-Powered Threat Detection",
    description:
      "Advanced machine learning algorithms continuously analyze patterns to identify and neutralize emerging threats.",
    gradient: "from-purple-500/10 via-pink-500/10 to-purple-600/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    accentColor: "border-purple-500/20 hover:border-purple-400/40",
  },
  {
    id: 3,
    icon: DollarSign,
    title: "70% Cost Reduction",
    description:
      "Significantly reduce security overhead costs while maintaining enterprise-grade protection and compliance.",
    gradient: "from-green-500/10 via-emerald-500/10 to-green-600/10",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    accentColor: "border-green-500/20 hover:border-green-400/40",
  },
  {
    id: 4,
    icon: Shield,
    title: "24/7/365 Expert Monitoring",
    description:
      "Round-the-clock surveillance by certified security professionals ensuring continuous protection.",
    gradient: "from-orange-500/10 via-red-500/10 to-orange-600/10",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    accentColor: "border-orange-500/20 hover:border-orange-400/40",
  },
  {
    id: 5,
    icon: FileBarChart,
    title: "Audit-Ready Compliance Reports",
    description:
      "Comprehensive reporting and documentation that meets industry standards and regulatory requirements.",
    gradient: "from-indigo-500/10 via-blue-500/10 to-indigo-600/10",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
    accentColor: "border-indigo-500/20 hover:border-indigo-400/40",
  },
  {
    id: 6,
    icon: Target,
    title: "Zero False Positive Guarantee",
    description:
      "Precision-tuned detection systems ensure genuine threats are identified without alert fatigue.",
    gradient: "from-teal-500/10 via-cyan-500/10 to-teal-600/10",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    accentColor: "border-teal-500/20 hover:border-teal-400/40",
  },
];

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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
          Why Choose IT Origin?
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Experience unparalleled cybersecurity protection with our comprehensive suite of advanced
          security solutions
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {benefits.map((benefit) => (
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
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${benefit.gradient} border-2 border-border/30 flex items-center justify-center mb-8 relative overflow-hidden group-hover:border-primary/40 transition-all duration-500 group-hover:scale-105`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${benefit.iconBg} flex items-center justify-center shadow-2xl relative`}
                  >
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className="relative z-10"
                    >
                      <benefit.icon className="w-7 h-7 text-white drop-shadow-lg" />
                    </motion.div>
                    <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
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
                  <motion.div
                    className="flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
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
                  </motion.div>
                </div>

                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated border gradient */}
                <div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
        ))}
      </motion.div>

      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-l from-primary/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"
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
      </div>
    </section>
  );
};
