import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCard } from "@/components/services/pricing-card";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "Managed SOC Services | 24/7 Security Operations Center | IT Origin",
  description: "Protect your organization with IT Origin's managed SOC services. 24/7 threat monitoring, detection, and response by certified security analysts. Advanced threat intelligence and rapid incident response.",
  keywords: [
    "managed SOC services",
    "security operations center",
    "24/7 security monitoring",
    "threat detection",
    "incident response",
    "SOC as a service",
    "security monitoring",
    "cyber threat detection",
    "SIEM monitoring",
    "security analysts"
  ],
  openGraph: {
    title: "Managed SOC Services | 24/7 Security Operations Center | IT Origin",
    description: "24/7 threat monitoring, detection, and response by certified security analysts. Protect your organization with enterprise-grade security operations.",
    type: "website",
    url: "https://itorigin.com/services/managed-soc-services",
    images: [
      {
        url: "/images/og-soc-services.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Managed SOC Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed SOC Services | 24/7 Security Operations Center",
    description: "24/7 threat monitoring, detection, and response by certified security analysts.",
    images: ["/images/og-soc-services.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/services/managed-soc-services"
  }
};

export default function ManagedSOCServicesPage() {
  const stats = [
    { label: "Average Detection Time", value: "<5min", icon: "Clock" as const },
    { label: "Monitored Events Daily", value: "10M+", icon: "Eye" as const },
    { label: "Threat Response Time", value: "<15min", icon: "Zap" as const },
    { label: "SOC Analysts", value: "25+", icon: "Users" as const },
  ];

  const serviceFeatures = [
    {
      title: "24/7 Security Monitoring",
      features: [
        "Round-the-clock monitoring by certified security analysts",
        "Real-time threat detection and alerting",
        "Continuous log analysis and correlation",
        "Advanced SIEM platform integration",
        "Multi-layered security event analysis",
        "Automated threat intelligence feeds"
      ]
    },
    {
      title: "Threat Detection & Response",
      features: [
        "Advanced threat hunting and analysis",
        "Behavioral anomaly detection",
        "Automated incident response workflows",
        "Rapid threat containment procedures",
        "Forensic investigation capabilities",
        "Post-incident analysis and reporting"
      ]
    },
    {
      title: "Compliance & Reporting",
      features: [
        "Regulatory compliance monitoring (GDPR, HIPAA, PCI-DSS)",
        "Detailed security event reporting",
        "Custom compliance dashboards",
        "Audit trail maintenance",
        "Executive summary reports",
        "Real-time security metrics"
      ]
    }
  ];

  const benefits = [
    {
      icon: "Shield" as const,
      title: "Enterprise-Grade Protection",
      description: "Access to the same advanced security tools and expertise used by Fortune 500 companies."
    },
    {
      icon: "TrendingUp" as const,
      title: "Cost-Effective Security",
      description: "Get 24/7 SOC coverage for a fraction of the cost of building an in-house team."
    },
    {
      icon: "Zap" as const,
      title: "Rapid Response",
      description: "Fast threat detection and response minimizes potential damage and downtime."
    },
    {
      icon: "Users" as const,
      title: "Expert Analysts",
      description: "Certified security professionals with years of experience protecting critical infrastructure."
    },
    {
      icon: "Eye" as const,
      title: "Complete Visibility",
      description: "Comprehensive view of your security posture with real-time dashboards and alerts."
    },
    {
      icon: "Clock" as const,
      title: "Always Available",
      description: "Security threats don't sleep, and neither does our SOC team monitoring your systems."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Assessment & Onboarding",
      description: "We analyze your current security infrastructure, identify gaps, and create a tailored monitoring plan. Our team integrates with your existing tools and establishes baseline security metrics."
    },
    {
      step: 2,
      title: "Deployment & Integration",
      description: "Deploy our SIEM platform and security sensors across your infrastructure. Configure custom detection rules, integrate threat intelligence feeds, and establish monitoring workflows."
    },
    {
      step: 3,
      title: "Continuous Monitoring",
      description: "Our 24/7 SOC team monitors your environment for threats, analyzes security events in real-time, and uses advanced analytics to detect suspicious activities before they become incidents."
    },
    {
      step: 4,
      title: "Threat Response & Resolution",
      description: "When threats are detected, our team immediately responds with containment procedures, investigates the root cause, and works with your team to eliminate the threat and prevent recurrence."
    }
  ];

  const pricingPlans = [
    {
      name: "Essential",
      description: "Perfect for small to medium businesses",
      price: "$2,999",
      features: [
        "24/7 security monitoring",
        "Up to 5,000 events/day",
        "Monthly reporting",
        "Email & phone support",
        "Basic threat intelligence",
        "Incident response (8x5)"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing enterprises",
      price: "$5,999",
      features: [
        "Everything in Essential",
        "Up to 25,000 events/day",
        "Weekly reporting",
        "Priority 24/7 support",
        "Advanced threat intelligence",
        "24/7 incident response",
        "Threat hunting services",
        "Quarterly security reviews"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Unlimited events",
        "Daily reporting",
        "Dedicated security team",
        "Custom integration support",
        "Advanced forensics",
        "Compliance assistance",
        "On-site support available"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "Managed SOC Services" }}
        title="24/7 Security"
        highlight="Operations Center"
        description="Protect your organization with enterprise-grade security monitoring and threat response. Our certified security analysts monitor your infrastructure around the clock, detecting and responding to threats before they impact your business."
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive SOC Coverage"
            description="Our managed SOC service provides complete security operations capabilities tailored to your organization's needs."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Our Managed SOC"
            description="Experience the advantages of partnering with a dedicated security operations team."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="How It Works"
            description="Our proven process ensures seamless integration and immediate security value."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Flexible Pricing Plans"
            description="Choose the plan that fits your organization's size and security requirements."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All plans include a 30-day money-back guarantee and no long-term contracts.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Contact us for custom enterprise pricing
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Strengthen Your Security Posture?"
        description="Get started with our managed SOC services today and protect your organization 24/7."
        buttons={[
          { text: "Get Started", href: "/contact" },
          { text: "View Other Services", href: "/services/offensive-security", variant: "secondary" }
        ]}
      />
    </div>
  );
}
