"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Shield,
  Zap,
  Target,
  Clock,
  Eye,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface PlatformFeature {
  id: string;
  text: string;
  icon: React.ReactNode;
}

interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const platformFeatures: PlatformFeature[] = [
  {
    id: "1",
    text: "Unified threat intelligence aggregation from 100+ sources",
    icon: <Shield className="w-5 h-5 text-primary" />,
  },
  {
    id: "2",
    text: "AI-powered correlation engine with MITRE ATT&CK mapping",
    icon: <Target className="w-5 h-5 text-primary" />,
  },
  {
    id: "3",
    text: "Automated incident response with custom playbooks",
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    id: "4",
    text: "Real-time compliance monitoring and reporting",
    icon: <Eye className="w-5 h-5 text-primary" />,
  },
  {
    id: "5",
    text: "Multi-cloud and hybrid environment support",
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
  },
  {
    id: "6",
    text: "Advanced threat hunting with behavioral analytics",
    icon: <Shield className="w-5 h-5 text-primary" />,
  },
];

const statistics: Statistic[] = [
  {
    id: "1",
    value: "99.8%",
    label: "Threat Detection Accuracy",
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    id: "2",
    value: "<15 Minutes",
    label: "Average Response Time",
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: "3",
    value: "24/7/365",
    label: "Continuous Monitoring",
    icon: <Eye className="w-6 h-6 text-primary" />,
  },
  {
    id: "4",
    value: "500+",
    label: "Protected Organizations",
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
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

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const CyberFusion = () => {
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
            <Zap className="w-4 h-4" />
            <span>IT-Origin Cyber Fusion Centre</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Engineering a Single{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Seamless AI SOC Platform
            </span>{" "}
            with Automation
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
            Advanced cybersecurity operations powered by artificial intelligence and machine
            learning for comprehensive threat detection and response.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Platform Features */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                Platform Features
              </h3>
            </div>

            <div className="space-y-4">
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  variants={featureVariants}
                  custom={index}
                  className="group"
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-start gap-3 flex-1">
                          {feature.icon}
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Statistics */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary-foreground" />
                </div>
                Key Statistics
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  variants={statVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        {stat.icon}
                        <div className="w-2 h-2 bg-primary/60 rounded-full group-hover:bg-primary transition-colors"></div>
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group px-8 py-4 text-lg rounded-md font-medium"
                >
                  Experience the Fusion Center
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
