import { Metadata } from "next";
import Link from "next/link";
import { Shield, FileText, BarChart, Settings, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCard } from "@/components/services/pricing-card";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "GRC Services | Governance, Risk & Compliance Consulting | IT Origin",
  description: "Streamline your compliance journey with IT Origin's GRC services. Expert guidance for GDPR, HIPAA, SOC 2, ISO 27001, PCI-DSS, and more. Comprehensive risk management and policy development by certified consultants.",
  keywords: [
    "GRC services",
    "governance risk compliance",
    "compliance consulting",
    "risk management",
    "ISO 27001",
    "SOC 2 compliance",
    "GDPR compliance",
    "HIPAA compliance",
    "PCI-DSS",
    "security policy",
    "audit preparation",
    "compliance monitoring",
    "regulatory compliance"
  ],
  openGraph: {
    title: "GRC Services | Governance, Risk & Compliance Consulting | IT Origin",
    description: "Expert guidance for regulatory compliance, risk management, and security governance. Achieve and maintain compliance with industry standards.",
    type: "website",
    url: "https://itorigin.com/services/grc-services",
    images: [
      {
        url: "/images/og-grc-services.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin GRC Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GRC Services | Governance, Risk & Compliance Consulting",
    description: "Expert guidance for regulatory compliance, risk management, and security governance.",
    images: ["/images/og-grc-services.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/services/grc-services"
  }
};

export default function GRCServicesPage() {
  const stats = [
    { label: "Compliance Frameworks", value: "15+", icon: "CheckCircle2" as const },
    { label: "Successful Audits", value: "200+", icon: "FileText" as const },
    { label: "Risk Assessments", value: "350+", icon: "BarChart" as const },
    { label: "Certified Consultants", value: "20+", icon: "Users" as const },
  ];

  const serviceFeatures = [
    {
      title: "Compliance Management",
      features: [
        "GDPR, CCPA, and data privacy compliance",
        "HIPAA healthcare compliance programs",
        "SOC 2 Type I & Type II certification",
        "ISO 27001 implementation and certification",
        "PCI-DSS compliance for payment systems",
        "NIST Cybersecurity Framework alignment"
      ]
    },
    {
      title: "Risk Management",
      features: [
        "Comprehensive risk assessments and analysis",
        "Third-party vendor risk management",
        "Business impact analysis (BIA)",
        "Threat modeling and risk quantification",
        "Risk treatment and mitigation strategies",
        "Continuous risk monitoring programs"
      ]
    },
    {
      title: "Governance & Policy",
      features: [
        "Security policy development and review",
        "Information security governance frameworks",
        "Compliance program design and implementation",
        "Security awareness training programs",
        "Incident response plan development",
        "Business continuity and disaster recovery planning"
      ]
    }
  ];

  const benefits = [
    {
      icon: "Shield" as const,
      title: "Regulatory Expertise",
      description: "Deep knowledge of global compliance frameworks and regulatory requirements across industries."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Audit Readiness",
      description: "Prepare your organization for audits with comprehensive documentation and evidence collection."
    },
    {
      icon: "BarChart" as const,
      title: "Risk Reduction",
      description: "Identify and mitigate risks before they impact your business operations or reputation."
    },
    {
      icon: "Users" as const,
      title: "Certified Professionals",
      description: "Work with CISA, CRISC, CISSP, and ISO 27001 Lead Auditor certified consultants."
    },
    {
      icon: "FileText" as const,
      title: "Documentation Support",
      description: "Comprehensive policies, procedures, and documentation that meet compliance requirements."
    },
    {
      icon: "Settings" as const,
      title: "Tailored Solutions",
      description: "Customized compliance programs that align with your business objectives and risk appetite."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Gap Assessment",
      description: "Evaluate your current security and compliance posture against target frameworks. Identify gaps, prioritize remediation efforts, and create a roadmap to achieve compliance with regulatory requirements and industry standards."
    },
    {
      step: 2,
      title: "Program Design",
      description: "Develop comprehensive compliance programs tailored to your organization. Create policies, procedures, and controls that address regulatory requirements while aligning with your business processes and objectives."
    },
    {
      step: 3,
      title: "Implementation & Training",
      description: "Deploy compliance controls and security measures across your organization. Provide staff training, document procedures, and establish governance structures to ensure ongoing compliance and risk management."
    },
    {
      step: 4,
      title: "Audit & Maintenance",
      description: "Prepare for and support external audits with comprehensive evidence collection. Maintain compliance through continuous monitoring, periodic reviews, and updates to policies and controls as regulations evolve."
    }
  ];

  const pricingPlans = [
    {
      name: "Compliance Starter",
      description: "Essential compliance for small businesses",
      price: "$3,999",
      features: [
        "Gap assessment (1 framework)",
        "Basic policy templates",
        "Compliance roadmap",
        "Email support",
        "Monthly progress reviews",
        "Up to 10 hours consulting"
      ]
    },
    {
      name: "Enterprise Compliance",
      description: "Comprehensive GRC program",
      price: "$9,999",
      features: [
        "Everything in Compliance Starter",
        "Multi-framework support (up to 3)",
        "Custom policy development",
        "Risk assessment included",
        "Priority support",
        "Audit preparation assistance",
        "Up to 40 hours consulting",
        "Quarterly compliance reviews"
      ],
      highlighted: true
    },
    {
      name: "Managed GRC",
      description: "Ongoing compliance management",
      price: "Custom",
      features: [
        "Everything in Enterprise Compliance",
        "Unlimited frameworks",
        "Dedicated compliance team",
        "Continuous monitoring",
        "Vendor risk management",
        "Full audit support",
        "Unlimited consulting hours",
        "Executive reporting dashboard"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "GRC Services" }}
        title="Navigate Compliance"
        highlight="With Confidence"
        description="Achieve and maintain regulatory compliance with expert guidance. Our comprehensive GRC services help you build robust governance frameworks, manage risks effectively, and meet compliance requirements across GDPR, HIPAA, SOC 2, ISO 27001, and more."
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
            title="Comprehensive GRC Solutions"
            description="Our services cover all aspects of governance, risk management, and compliance to protect your organization."
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
            title="Why Choose Our GRC Services"
            description="Partner with experienced compliance professionals who understand regulatory requirements and business needs."
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
            title="Our GRC Methodology"
            description="A proven approach to achieving and maintaining compliance with regulatory requirements."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Compliance Frameworks We Support
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert guidance across major regulatory and industry standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "ISO 27001", description: "Information security management certification" },
              { name: "SOC 2", description: "Service organization controls for SaaS" },
              { name: "GDPR", description: "EU data protection and privacy regulation" },
              { name: "HIPAA", description: "Healthcare information privacy compliance" },
              { name: "PCI-DSS", description: "Payment card data security standards" },
              { name: "NIST CSF", description: "Cybersecurity framework and controls" }
            ].map((framework, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-black mb-2">
                      {framework.name}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {framework.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Flexible Pricing Options"
            description="Choose the GRC service level that matches your compliance needs and organizational size."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All plans include gap assessment, compliance roadmap, and ongoing support.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Need help choosing? Contact us for a free consultation
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Achieve Compliance?"
        description="Start your compliance journey today with expert GRC consulting and support."
        buttons={[
          { text: "Get Started", href: "/contact" },
          { text: "View Security Services", href: "/services/managed-soc-services", variant: "secondary" }
        ]}
      />
    </div>
  );
}
