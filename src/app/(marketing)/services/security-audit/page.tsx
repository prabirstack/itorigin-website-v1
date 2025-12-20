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
  title: "Security Audit Services | Compliance & Risk Assessment | IT Origin",
  description: "Comprehensive security auditing services for regulatory compliance, risk assessment, and security program evaluation. ISO 27001, SOC 2, PCI-DSS, HIPAA audit support.",
  keywords: [
    "security audit",
    "compliance audit",
    "ISO 27001 audit",
    "SOC 2 audit",
    "PCI-DSS audit",
    "HIPAA audit",
    "security assessment",
    "risk assessment",
    "security program review",
    "gap analysis"
  ],
  openGraph: {
    title: "Security Audit Services | Compliance & Risk Assessment | IT Origin",
    description: "Professional security auditing services for regulatory compliance and risk assessment. Expert guidance for ISO 27001, SOC 2, PCI-DSS, and more.",
    type: "website",
    url: "https://itorigin.com/services/security-audit",
  },
  alternates: {
    canonical: "https://itorigin.com/services/security-audit"
  }
};

export default function SecurityAuditPage() {
  const stats = [
    { label: "Audits Completed", value: "300+", icon: "FileCheck" as const },
    { label: "Compliance Frameworks", value: "15+", icon: "CheckCircle" as const },
    { label: "Certification Success Rate", value: "100%", icon: "Award" as const },
    { label: "Remediation Items Resolved", value: "5,000+", icon: "Target" as const },
  ];

  const serviceFeatures = [
    {
      title: "Compliance Audits",
      features: [
        "ISO 27001 readiness assessment",
        "SOC 2 Type I & Type II audits",
        "PCI-DSS compliance validation",
        "HIPAA security assessment",
        "GDPR compliance review",
        "NIST framework assessment"
      ]
    },
    {
      title: "Technical Security Audits",
      features: [
        "Network architecture review",
        "Cloud security configuration audit",
        "Application security assessment",
        "Access control audit",
        "Encryption implementation review",
        "Security logging and monitoring audit"
      ]
    },
    {
      title: "Program & Policy Audits",
      features: [
        "Security policy review",
        "Incident response plan assessment",
        "Business continuity audit",
        "Vendor security management review",
        "Security awareness program evaluation",
        "Risk management framework review"
      ]
    }
  ];

  const benefits = [
    {
      icon: "FileCheck" as const,
      title: "Compliance Assurance",
      description: "Achieve and maintain compliance with industry standards and regulatory requirements."
    },
    {
      icon: "Eye" as const,
      title: "Independent Assessment",
      description: "Get an unbiased, third-party evaluation of your security controls and practices."
    },
    {
      icon: "Target" as const,
      title: "Gap Identification",
      description: "Identify gaps between your current state and desired security maturity level."
    },
    {
      icon: "FileText" as const,
      title: "Audit-Ready Reports",
      description: "Comprehensive documentation suitable for regulators, auditors, and stakeholders."
    },
    {
      icon: "TrendingUp" as const,
      title: "Roadmap for Improvement",
      description: "Prioritized recommendations to address findings and improve security posture."
    },
    {
      icon: "Users" as const,
      title: "Expert Auditors",
      description: "Certified professionals with deep experience in compliance frameworks and security auditing."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Scoping & Planning",
      description: "Define audit objectives, scope, and timeline. Identify applicable frameworks, key stakeholders, and documentation requirements. Develop a detailed audit plan."
    },
    {
      step: 2,
      title: "Documentation Review",
      description: "Review security policies, procedures, and documentation against framework requirements. Identify gaps in documentation and areas requiring evidence collection."
    },
    {
      step: 3,
      title: "Control Testing",
      description: "Evaluate the design and operating effectiveness of security controls through interviews, observations, and technical testing. Gather evidence of control implementation."
    },
    {
      step: 4,
      title: "Gap Analysis",
      description: "Analyze findings to identify gaps between current state and compliance requirements. Assess risk and business impact of identified gaps."
    },
    {
      step: 5,
      title: "Reporting & Remediation",
      description: "Deliver detailed audit report with findings, risk ratings, and remediation recommendations. Provide support for remediation planning and certification preparation."
    }
  ];

  const complianceFrameworks = [
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "SOC 2", description: "Service Organization Controls" },
    { name: "PCI-DSS", description: "Payment Card Security" },
    { name: "HIPAA", description: "Healthcare Data Protection" },
    { name: "GDPR", description: "EU Data Protection" },
    { name: "NIST CSF", description: "Cybersecurity Framework" },
    { name: "CIS Controls", description: "Critical Security Controls" },
    { name: "CMMC", description: "Defense Contractor Security" }
  ];

  const pricingPlans = [
    {
      name: "Gap Assessment",
      description: "Readiness evaluation for compliance",
      price: "$7,999",
      features: [
        "Single framework assessment",
        "Documentation review",
        "Control gap analysis",
        "Maturity scoring",
        "Gap report with findings",
        "Remediation roadmap",
        "Executive presentation"
      ]
    },
    {
      name: "Comprehensive Audit",
      description: "Full compliance audit with certification support",
      price: "$19,999",
      features: [
        "Complete audit program",
        "Policy & procedure review",
        "Technical control testing",
        "Staff interviews",
        "Evidence collection support",
        "Detailed audit report",
        "Certification preparation",
        "Remediation support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise Program",
      description: "Multi-framework ongoing compliance",
      price: "Custom",
      features: [
        "Multiple frameworks",
        "Continuous compliance monitoring",
        "Annual audit cycles",
        "Policy development support",
        "Control implementation guidance",
        "Board-ready reporting",
        "Dedicated compliance advisor",
        "Audit defense support"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "FileCheck", text: "Security Auditing" }}
        title="Validate Your"
        highlight="Security Posture"
        description="Comprehensive security audits to evaluate your controls, validate compliance, and identify opportunities for improvement. Expert guidance through certification and regulatory requirements."
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
              Schedule Consultation
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
            title="Comprehensive Audit Services"
            description="We evaluate all aspects of your security program against industry frameworks and best practices."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Compliance Frameworks We Support"
            description="Expert auditors certified in major security and compliance frameworks."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card text-center hover:border-primary transition-colors"
              >
                <div className="text-xl font-black text-primary mb-2">
                  {framework.name}
                </div>
                <p className="text-sm text-muted-foreground">
                  {framework.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Our Audit Services"
            description="Expert auditors who understand both compliance requirements and practical security."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Audit Process"
            description="A thorough methodology that ensures comprehensive coverage and actionable results."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Audit Packages"
            description="Choose the audit program that meets your compliance and security objectives."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All audits include detailed findings and remediation guidance.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Need multi-framework or custom audit? Contact us for a quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Validate Your Security?"
        description="Get expert audit services to ensure compliance and strengthen your security program."
        buttons={[
          { text: "Schedule Audit", href: "/contact" },
          { text: "View GRC Services", href: "/services/grc-services", variant: "secondary" }
        ]}
      />
    </div>
  );
}
