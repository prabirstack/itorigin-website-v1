"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Rocket,
  Shield,
  ArrowLeft,
  Bell,
  BookOpen,
  FileText,
  Server,
  FileSearch,
  Play,
  Zap,
  Lock,
  Eye,
  Monitor,
  TrendingUp,
  BarChart3,
  Newspaper,
  Clock,
} from "lucide-react";
import { Container } from "@/components/common/container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ContextConfig {
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  features: FeatureItem[];
}

const contextConfigs: Record<string, ContextConfig> = {
  default: {
    icon: Rocket,
    badge: "Coming Soon",
    titleLine1: "Something Great is",
    titleHighlight: "On the Way",
    description:
      "We're working on something exciting. This page will be available soon with new features and content designed to strengthen your cybersecurity posture.",
    features: [
      {
        icon: Shield,
        title: "Enterprise Grade",
        description: "Built for business-critical security needs",
      },
      {
        icon: Zap,
        title: "Cutting Edge",
        description: "Latest cybersecurity innovations",
      },
      {
        icon: Lock,
        title: "Trusted & Secure",
        description: "Following industry best practices",
      },
    ],
  },
  "watch-demo": {
    icon: Play,
    badge: "Platform Demo",
    titleLine1: "Interactive Demo",
    titleHighlight: "Coming Soon",
    description:
      "We're building an immersive demo experience to showcase our AI-driven cybersecurity platform in action. Stay tuned for a walkthrough of real-time threat detection, automated response, and intelligent SOC operations.",
    features: [
      {
        icon: Eye,
        title: "Live Threat Detection",
        description: "Watch AI identify threats in real-time",
      },
      {
        icon: Zap,
        title: "Automated Response",
        description: "See instant incident containment",
      },
      {
        icon: Monitor,
        title: "SOC Dashboard",
        description: "Explore our unified security view",
      },
    ],
  },
  "knowledge-center": {
    icon: BookOpen,
    badge: "Knowledge Center",
    titleLine1: "Security Knowledge Hub",
    titleHighlight: "Coming Soon",
    description:
      "A comprehensive collection of cybersecurity resources, expert guides, and actionable intelligence — curated to help you build a stronger security posture.",
    features: [
      {
        icon: FileText,
        title: "Expert Resources",
        description: "Whitepapers, guides & technical reports",
      },
      {
        icon: TrendingUp,
        title: "Threat Intelligence",
        description: "Latest security insights & analysis",
      },
      {
        icon: BookOpen,
        title: "Best Practices",
        description: "Industry-leading security guidance",
      },
    ],
  },
  blog: {
    icon: Newspaper,
    badge: "Blog & Insights",
    titleLine1: "Security Blog",
    titleHighlight: "Coming Soon",
    description:
      "Expert cybersecurity insights, in-depth threat analysis, and industry best practices from our security team. Fresh content is on its way.",
    features: [
      {
        icon: TrendingUp,
        title: "Threat Analysis",
        description: "Expert breakdown of emerging threats",
      },
      {
        icon: Shield,
        title: "Security Tips",
        description: "Actionable security best practices",
      },
      {
        icon: FileText,
        title: "Case Studies",
        description: "Real-world security success stories",
      },
    ],
  },
  whitepapers: {
    icon: FileText,
    badge: "Whitepapers & Research",
    titleLine1: "Research Library",
    titleHighlight: "Coming Soon",
    description:
      "Downloadable whitepapers, research reports, and technical guides from IT Origin's cybersecurity experts. We're preparing valuable resources for you.",
    features: [
      {
        icon: FileText,
        title: "Technical Reports",
        description: "Deep-dive security research papers",
      },
      {
        icon: Shield,
        title: "Compliance Guides",
        description: "Regulatory framework breakdowns",
      },
      {
        icon: BarChart3,
        title: "Industry Analysis",
        description: "Market trends & threat landscape",
      },
    ],
  },
  "managed-security": {
    icon: Server,
    badge: "Managed Security",
    titleLine1: "Security Infrastructure",
    titleHighlight: "Coming Soon",
    description:
      "Complete management of firewalls, IDS/IPS, WAF, and security patches. Our managed security infrastructure service is launching soon to help you maintain strong perimeter defenses.",
    features: [
      {
        icon: Shield,
        title: "Firewall Management",
        description: "Enterprise firewall configuration & monitoring",
      },
      {
        icon: Server,
        title: "IDS/IPS Monitoring",
        description: "Intrusion detection & prevention systems",
      },
      {
        icon: Lock,
        title: "Patch Management",
        description: "Automated security patch deployment",
      },
    ],
  },
  "incident-response": {
    icon: FileSearch,
    badge: "Incident Response",
    titleLine1: "IR & Forensics",
    titleHighlight: "Coming Soon",
    description:
      "Rapid incident response, digital forensics investigation, and breach containment. Our dedicated IR team is preparing to deliver swift, expert-led response services.",
    features: [
      {
        icon: Clock,
        title: "Rapid Response",
        description: "Swift incident containment & triage",
      },
      {
        icon: FileSearch,
        title: "Digital Forensics",
        description: "Root cause & impact investigation",
      },
      {
        icon: Shield,
        title: "Recovery Support",
        description: "Business continuity & hardening",
      },
    ],
  },
  training: {
    icon: BookOpen,
    badge: "Training Programs",
    titleLine1: "Security Training",
    titleHighlight: "Coming Soon",
    description:
      "Expert-led cybersecurity training programs, certification courses, and hands-on labs. We're preparing comprehensive learning paths to advance your security skills.",
    features: [
      {
        icon: BookOpen,
        title: "Certification Courses",
        description: "OSCP, CEH, CISSP preparation",
      },
      {
        icon: Shield,
        title: "Hands-on Labs",
        description: "Real-world security scenarios",
      },
      {
        icon: TrendingUp,
        title: "Corporate Programs",
        description: "Custom training for your team",
      },
    ],
  },
  documentation: {
    icon: FileText,
    badge: "Documentation",
    titleLine1: "Documentation Hub",
    titleHighlight: "Coming Soon",
    description:
      "Comprehensive documentation for IT Origin's security platform, APIs, and services. Detailed guides and reference materials are being prepared.",
    features: [
      {
        icon: FileText,
        title: "API Reference",
        description: "Complete API documentation",
      },
      {
        icon: BookOpen,
        title: "Integration Guides",
        description: "Step-by-step setup tutorials",
      },
      {
        icon: Shield,
        title: "Best Practices",
        description: "Security implementation guidance",
      },
    ],
  },
  "security-center": {
    icon: Shield,
    badge: "Security Center",
    titleLine1: "Security Center",
    titleHighlight: "Coming Soon",
    description:
      "A centralised hub for security advisories, vulnerability disclosures, and threat intelligence. Stay informed about the latest security developments.",
    features: [
      {
        icon: Shield,
        title: "Security Advisories",
        description: "Latest vulnerability alerts",
      },
      {
        icon: Eye,
        title: "Threat Intelligence",
        description: "Real-time threat monitoring",
      },
      {
        icon: Lock,
        title: "Security Updates",
        description: "Platform security bulletins",
      },
    ],
  },
  "best-practices": {
    icon: Shield,
    badge: "Best Practices",
    titleLine1: "Security Best Practices",
    titleHighlight: "Coming Soon",
    description:
      "Industry-leading cybersecurity best practices, implementation guides, and security frameworks. Expert recommendations are being compiled for you.",
    features: [
      {
        icon: Shield,
        title: "Security Frameworks",
        description: "NIST, CIS, and ISO guidance",
      },
      {
        icon: Lock,
        title: "Implementation Guides",
        description: "Step-by-step security setup",
      },
      {
        icon: TrendingUp,
        title: "Maturity Models",
        description: "Assess and improve your posture",
      },
    ],
  },
  webinars: {
    icon: Play,
    badge: "Webinars & Events",
    titleLine1: "Live Webinars",
    titleHighlight: "Coming Soon",
    description:
      "Join live cybersecurity webinars, workshops, and on-demand sessions from IT Origin's security experts. Upcoming events are being scheduled.",
    features: [
      {
        icon: Play,
        title: "Live Sessions",
        description: "Interactive expert-led webinars",
      },
      {
        icon: BookOpen,
        title: "On-Demand Library",
        description: "Watch past sessions anytime",
      },
      {
        icon: TrendingUp,
        title: "Expert Speakers",
        description: "Industry leaders & practitioners",
      },
    ],
  },
  careers: {
    icon: BookOpen,
    badge: "Careers",
    titleLine1: "Open Positions",
    titleHighlight: "Coming Soon",
    description:
      "We're preparing our careers portal with open positions and an online application system. Check back soon to explore opportunities and submit your resume.",
    features: [
      {
        icon: Shield,
        title: "Security Roles",
        description: "SOC analysts, pentesters & more",
      },
      {
        icon: TrendingUp,
        title: "Career Growth",
        description: "Clear paths to leadership",
      },
      {
        icon: BookOpen,
        title: "Apply Online",
        description: "Easy application & resume upload",
      },
    ],
  },
  news: {
    icon: Newspaper,
    badge: "News & Events",
    titleLine1: "News & Updates",
    titleHighlight: "Coming Soon",
    description:
      "Stay up to date with IT Origin's latest announcements, industry news, partnerships, and event highlights.",
    features: [
      {
        icon: Newspaper,
        title: "Company News",
        description: "Latest announcements & updates",
      },
      {
        icon: TrendingUp,
        title: "Industry Insights",
        description: "Market trends & developments",
      },
      {
        icon: BookOpen,
        title: "Event Coverage",
        description: "Conference highlights & recaps",
      },
    ],
  },
};

export function ComingSoonContent({ context }: { context?: string }) {
  const config = contextConfigs[context || ""] || contextConfigs.default;
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {config.badge}
              </span>
            </motion.div>

            {/* Animated Icon */}
            <motion.div
              variants={fadeInUp}
              className="relative mx-auto mb-10 w-28 h-28 sm:w-32 sm:h-32"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm"
              >
                <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-primary" />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-primary mb-6 leading-tight"
            >
              {config.titleLine1}{" "}
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {config.titleHighlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-2"
            >
              {config.description}
            </motion.p>

            {/* Feature Preview Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            >
              {config.features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-5 sm:p-6 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                      <FeatureIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25"
              >
                <Bell className="w-5 h-5" />
                Notify Me When Ready
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 sm:right-20 w-16 sm:w-32 h-16 sm:h-32 border border-primary/10 rounded-xl transform rotate-12 hidden sm:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 sm:left-20 w-12 sm:w-24 h-12 sm:h-24 border border-primary/10 rounded-full hidden sm:block"
        />
      </div>
    </div>
  );
}
