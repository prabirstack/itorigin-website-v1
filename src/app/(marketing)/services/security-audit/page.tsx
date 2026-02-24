import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCTA } from "@/components/services/pricing-cta";
import { CTASection } from "@/components/about/cta-section";
import {
  auditPageHero,
  auditPageCTAs,
  auditPageStats,
  auditPageSectionHeaders,
  auditPageFeatures,
  auditPageBenefits,
  auditPageProcess,
  auditPageComplianceFrameworks,
  auditPageCTA,
} from "@/utils/data/services/security-audit-data";

export const metadata: Metadata = {
  title: "Security Audit Services | Compliance & Risk Assessment | ITOrigin",
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
    title: "Security Audit Services | Compliance & Risk Assessment | ITOrigin",
    description: "Professional security auditing services for regulatory compliance and risk assessment. Expert guidance for ISO 27001, SOC 2, PCI-DSS, and more.",
    type: "website",
    url: "https://itorigin.com/services/security-audit",
  },
  alternates: {
    canonical: "https://itorigin.com/services/security-audit"
  }
};

export default function SecurityAuditPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={auditPageHero.badge}
        title={auditPageHero.title}
        highlight={auditPageHero.highlight}
        description={auditPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {auditPageCTAs.map((cta) => (
              <Link
                key={cta.text}
                href={cta.href}
                className={cta.primary ? "px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group" : "px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"}
              >
                {cta.text}
                {cta.primary && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={auditPageStats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={auditPageSectionHeaders.features.title}
            description={auditPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {auditPageFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={auditPageSectionHeaders.frameworks.title}
            description={auditPageSectionHeaders.frameworks.description}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {auditPageComplianceFrameworks.map((framework, index) => (
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
            title={auditPageSectionHeaders.benefits.title}
            description={auditPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={auditPageSectionHeaders.process.title}
            description={auditPageSectionHeaders.process.description}
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {auditPageProcess.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <PricingCTA serviceName="security audit" />

      {/* CTA Section */}
      <CTASection
        title={auditPageCTA.title}
        description={auditPageCTA.description}
        buttons={auditPageCTA.buttons}
      />
    </div>
  );
}
