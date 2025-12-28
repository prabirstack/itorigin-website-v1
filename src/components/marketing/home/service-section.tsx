"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Shield,
  SearchCheck,
  Bug,
  FileCheck2,
  Server,
  FileSearch,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface ServiceItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  description: string;
  services: string[];
  ctaText: string;
  ctaLink: string;
  primaryColor: string;
  secondaryColor: string;
  bgPattern: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: Shield,
    headline: "24/7 Security Operations Center",
    description:
      "CERT-IN empanelled SOC with AI-SIEM technology. Real-time threat detection, incident response, and compliance reporting for continuous protection.",
    services: [
      "24/7 security monitoring and threat detection",
      "Incident response and remediation",
      "Next-gen SIEM management",
      "Managed XDR and EDR",
      "Threat hunting and intelligence",
    ],
    ctaText: "Explore SOCaaS",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-blue-500",
    secondaryColor: "bg-blue-500/10",
    bgPattern: "from-blue-500/5 to-cyan-500/5",
  },
  {
    id: 2,
    icon: SearchCheck,
    headline: "Advanced Threat Hunting & Response",
    description:
      "Multi-vendor EDR support with elite threat hunters. Proactive detection and hands-on remediation to neutralize sophisticated attacks.",
    services: [
      "Advanced behavioral analytics",
      "Real-time threat containment",
      "Forensic investigation",
      "Guided remediation support",
      "Threat advisory services",
    ],
    ctaText: "Discover MDR",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-purple-500",
    secondaryColor: "bg-purple-500/10",
    bgPattern: "from-purple-500/5 to-pink-500/5",
  },
  {
    id: 3,
    icon: Bug,
    headline: "Comprehensive Security Testing",
    description:
      "STQC-approved penetration testing across web, mobile, network, cloud, and API environments. Find vulnerabilities before attackers do.",
    services: [
      "Vulnerability Assessment",
      "Web & Mobile App Testing",
      "Network Penetration Testing",
      "Cloud Security Assessment",
      "API Security Testing (SAST/DAST)",
      "Red Team Operations",
    ],
    ctaText: "View Offensive Security",
    ctaLink: "/services/offensive-security",
    primaryColor: "text-red-500",
    secondaryColor: "bg-red-500/10",
    bgPattern: "from-red-500/5 to-orange-500/5",
  },
  {
    id: 4,
    icon: FileCheck2,
    headline: "Governance, Risk & Compliance",
    description:
      "End-to-end compliance consulting for ISO 27001, SOC2, GDPR, and Indian regulations. Achieve certification faster.",
    services: [
      "ISO 27001 Implementation",
      "SOC1/SOC2 Compliance",
      "GDPR Compliance Support",
      "Risk Assessment & Management",
      "Audit & Gap Analysis",
      "Regulatory Advisory",
    ],
    ctaText: "Explore GRC Services",
    ctaLink: "/services/grc-services",
    primaryColor: "text-green-500",
    secondaryColor: "bg-green-500/10",
    bgPattern: "from-green-500/5 to-emerald-500/5",
  },
  {
    id: 5,
    icon: Server,
    headline: "Managed Security Infrastructure",
    description:
      "Complete management of firewalls, IDS/IPS, WAF, and security patches. Maintain strong perimeter defenses.",
    services: [
      "Firewall configuration & management",
      "IDS/IPS deployment & monitoring",
      "WAF management & optimization",
      "Patch management services",
      "Security infrastructure monitoring",
    ],
    ctaText: "Learn More",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-indigo-500",
    secondaryColor: "bg-indigo-500/10",
    bgPattern: "from-indigo-500/5 to-blue-500/5",
  },
  {
    id: 6,
    icon: FileSearch,
    headline: "Incident Response & Forensics",
    description:
      "Rapid incident response, digital forensics investigation, and breach containment. Minimize damage and ensure business continuity.",
    services: [
      "Incident response planning",
      "Digital forensics analysis",
      "Breach containment & eradication",
      "Post-incident analysis & reporting",
      "Recovery assistance & hardening",
    ],
    ctaText: "Explore IR Services",
    ctaLink: "/services/offensive-security",
    primaryColor: "text-orange-500",
    secondaryColor: "bg-orange-500/10",
    bgPattern: "from-orange-500/5 to-yellow-500/5",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export const ServiceSection = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          <span>Enterprise Security Services</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Comprehensive
          <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Cybersecurity Solutions
          </span>
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
          From 24/7 monitoring to incident response, our full-spectrum security services protect
          your digital assets with enterprise-grade solutions tailored for modern threats.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
      >
        {services.map((service) => {
          const isExpanded = expandedCards.has(service.id);
          const IconComponent = service.icon;

          return (
            <motion.div key={service.id} variants={cardVariants} className="group">
              <Card className="h-full border border-border/40 bg-card/80 backdrop-blur-sm hover:border-border/60 transition-all duration-500 hover:shadow-xl overflow-hidden relative">
                {/* Background pattern */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgPattern} opacity-30`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)] opacity-50" />

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${service.secondaryColor} border border-border/30 group-hover:scale-105 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-6 h-6 ${service.primaryColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                          {service.headline}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  {/* Services List Toggle */}
                  <motion.button
                    onClick={() => toggleCard(service.id)}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-200 mb-4 group/toggle"
                  >
                    <span className="text-sm font-medium text-foreground">
                      View Services ({service.services.length})
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/toggle:text-foreground transition-colors" />
                    </motion.div>
                  </motion.button>

                  {/* Expandable Services List */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <ul className="space-y-2">
                        {service.services.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: isExpanded ? 1 : 0,
                              x: isExpanded ? 0 : -10,
                            }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${service.secondaryColor} mt-2 flex-shrink-0`}
                            />
                            <span className="leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={service.ctaLink}
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl group/cta relative overflow-hidden`}
                    >
                      <span className="relative z-10">{service.ctaText}</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>

                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
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

        {/* Gradient orbs */}
        <div className="absolute top-1/3 -right-48 w-80 h-80 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 -left-48 w-80 h-80 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-2xl" />
      </div>
    </section>
  );
};
