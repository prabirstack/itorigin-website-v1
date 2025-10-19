import { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, BarChart, Eye, Lock, Server, ArrowRight, CheckCircle2, Users, TrendingUp, Target, Settings } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";
import { ProductCard } from "@/components/platform/product-card";
import { FeatureShowcase } from "@/components/platform/feature-showcase";
import { IntegrationCard } from "@/components/platform/integration-card";

export const metadata: Metadata = {
  title: "SecureOps Platform | Unified Security Operations & Threat Management | IT Origin",
  description: "Transform your security operations with IT Origin's SecureOps Platform. Unified SIEM, automated threat detection, compliance monitoring, and AI-powered security analytics in one comprehensive solution.",
  keywords: [
    "security platform",
    "SIEM platform",
    "threat detection platform",
    "security operations platform",
    "unified security",
    "compliance monitoring",
    "security analytics",
    "threat intelligence platform",
    "automated security",
    "SOC platform",
    "security automation"
  ],
  openGraph: {
    title: "SecureOps Platform | Unified Security Operations & Threat Management | IT Origin",
    description: "Transform your security operations with unified SIEM, automated threat detection, and AI-powered analytics.",
    type: "website",
    url: "https://itorigin.com/platform",
    images: [
      {
        url: "/images/og-platform.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin SecureOps Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureOps Platform | Unified Security Operations & Threat Management",
    description: "Transform your security operations with unified SIEM, automated threat detection, and AI-powered analytics.",
    images: ["/images/og-platform.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/platform"
  }
};

export default function PlatformPage() {
  const stats = [
    { label: "Events Processed Daily", value: "50B+", icon: "Zap" as const },
    { label: "Average Detection Time", value: "<3min", icon: "Eye" as const },
    { label: "Platform Uptime", value: "99.9%", icon: "Server" as const },
    { label: "Active Deployments", value: "500+", icon: "Target" as const },
  ];

  const products = [
    {
      name: "SecureOps Core",
      tagline: "Unified Security Intelligence",
      description: "Next-generation SIEM platform that consolidates security data from across your infrastructure for real-time threat detection and response.",
      icon: "Shield" as const,
      features: [
        "Real-time log aggregation and analysis",
        "Advanced correlation engine",
        "Machine learning-based anomaly detection",
        "Automated incident response workflows",
        "Custom dashboard and reporting",
        "Multi-tenant architecture"
      ],
      highlight: true
    },
    {
      name: "ThreatIntel Pro",
      tagline: "AI-Powered Threat Intelligence",
      description: "Leverage artificial intelligence to identify, analyze, and respond to emerging threats before they impact your organization.",
      icon: "Zap" as const,
      features: [
        "Global threat intelligence feeds",
        "Automated threat hunting",
        "Behavioral analytics and profiling",
        "Attack pattern recognition",
        "Threat actor attribution",
        "Predictive threat modeling"
      ],
      highlight: false
    },
    {
      name: "ComplianceHub",
      tagline: "Continuous Compliance Monitoring",
      description: "Automate compliance monitoring and reporting across multiple frameworks with real-time policy enforcement and audit trails.",
      icon: "BarChart" as const,
      features: [
        "Multi-framework compliance (GDPR, HIPAA, SOC 2, ISO 27001)",
        "Automated policy enforcement",
        "Real-time compliance scoring",
        "Executive compliance dashboards",
        "Audit trail automation",
        "Regulatory change tracking"
      ],
      highlight: false
    }
  ];

  const coreFeatures = [
    {
      title: "Unified Security Dashboard",
      description: "Get a comprehensive view of your security posture with customizable dashboards that aggregate data from all your security tools and infrastructure.",
      icon: "BarChart" as const,
      metrics: ["Real-time threat visualization", "Custom KPI tracking", "Executive reporting"]
    },
    {
      title: "Automated Response",
      description: "Accelerate incident response with automated playbooks that contain threats, gather evidence, and initiate remediation workflows instantly.",
      icon: "Zap" as const,
      metrics: ["Pre-built playbooks", "Custom automation", "Integration with SOAR tools"]
    },
    {
      title: "Advanced Analytics",
      description: "Leverage machine learning and behavioral analytics to detect sophisticated threats that traditional security tools miss.",
      icon: "TrendingUp" as const,
      metrics: ["ML-powered detection", "User behavior analytics", "Predictive modeling"]
    },
    {
      title: "Threat Intelligence",
      description: "Stay ahead of threats with integrated threat intelligence feeds and automated enrichment of security events.",
      icon: "Eye" as const,
      metrics: ["40+ threat feeds", "Automatic IoC enrichment", "Threat scoring"]
    }
  ];

  const integrations = [
    { name: "AWS Security Hub", category: "Cloud Security", icon: "Server" as const },
    { name: "Microsoft Sentinel", category: "SIEM", icon: "Shield" as const },
    { name: "CrowdStrike", category: "EDR", icon: "Lock" as const },
    { name: "Palo Alto Networks", category: "Firewall", icon: "Shield" as const },
    { name: "Splunk", category: "Log Management", icon: "BarChart" as const },
    { name: "ServiceNow", category: "ITSM", icon: "Settings" as const },
    { name: "Okta", category: "Identity", icon: "Users" as const },
    { name: "Jira", category: "Ticketing", icon: "Target" as const }
  ];

  const benefits = [
    {
      icon: "Shield" as const,
      title: "Comprehensive Protection",
      description: "Unified platform covering all aspects of security operations from detection to response."
    },
    {
      icon: "Zap" as const,
      title: "Automated Workflows",
      description: "Reduce manual effort with intelligent automation that speeds up threat detection and response."
    },
    {
      icon: "TrendingUp" as const,
      title: "Scalable Architecture",
      description: "Cloud-native platform that scales effortlessly from small teams to enterprise deployments."
    },
    {
      icon: "Eye" as const,
      title: "Complete Visibility",
      description: "Centralized view of all security events across your entire infrastructure and cloud environments."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Compliance Ready",
      description: "Built-in compliance monitoring and reporting for major regulatory frameworks."
    },
    {
      icon: "Users" as const,
      title: "Expert Support",
      description: "24/7 technical support from our security operations team with guaranteed response times."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Zap", text: "SecureOps Platform" }}
        title="Unified Security"
        highlight="Operations Platform"
        description="Transform your security operations with our comprehensive platform. SecureOps combines SIEM, threat intelligence, compliance monitoring, and automated response in one powerful solution built for modern security teams."
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#products"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Platform Products"
            description="Comprehensive security solutions that work together seamlessly to protect your organization."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Core Platform Features"
            description="Powerful capabilities designed to streamline security operations and improve threat detection."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <FeatureShowcase key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose SecureOps Platform"
            description="Experience the advantages of a unified security operations platform built for modern threats."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Seamless Integrations"
            description="Connect with your existing security tools and infrastructure for a unified security operations experience."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <IntegrationCard key={index} {...integration} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Supporting 100+ integrations with leading security, cloud, and enterprise tools.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              View all integrations
            </Link>
          </div>
        </div>
      </section>

      {/* Deployment Options Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Flexible Deployment Options
              </h2>
              <p className="text-lg text-muted-foreground">
                Deploy SecureOps the way that works best for your organization.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-border bg-card text-center">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Server className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-3">SaaS</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Fully managed cloud platform with zero infrastructure overhead.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Instant deployment</li>
                  <li>• Automatic updates</li>
                  <li>• 99.9% uptime SLA</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl border border-primary bg-primary/5 text-center shadow-lg shadow-primary/20">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-3">Hybrid</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Combine cloud scalability with on-premise data control.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Data residency compliance</li>
                  <li>• Cloud-managed control plane</li>
                  <li>• Best of both worlds</li>
                </ul>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Recommended
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl border border-border bg-card text-center">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-3">On-Premise</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete control with self-hosted deployment in your datacenter.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Full data sovereignty</li>
                  <li>• Air-gapped option</li>
                  <li>• Custom configuration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Enterprise-Ready Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Flexible pricing based on your environment size and feature requirements. Start with a free trial or request a custom quote for enterprise deployments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Security Operations?"
        description="See SecureOps Platform in action with a personalized demo from our security experts."
        buttons={[
          { text: "Schedule Demo", href: "/contact" },
          { text: "View Documentation", href: "/docs", variant: "secondary" }
        ]}
      />
    </div>
  );
}
