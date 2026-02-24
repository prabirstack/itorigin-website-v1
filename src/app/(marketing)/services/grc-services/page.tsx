import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCTA } from "@/components/services/pricing-cta";
import { CTASection } from "@/components/about/cta-section";
import {
  grcPageHero,
  grcPageCTAs,
  grcPageStats,
  grcPageSectionHeaders,
  grcPageFeatures,
  grcPageBenefits,
  grcPageProcess,
  grcPageFrameworks,
  grcPageCTA,
} from "@/utils/data/services/grc-services-data";

export const metadata: Metadata = {
  title: "GRC Services | Governance, Risk & Compliance Consulting | ITOrigin",
  description: "Streamline your compliance journey with ITOrigin's GRC services. Expert guidance for GDPR, HIPAA, SOC 2, ISO 27001, PCI-DSS, and more. Comprehensive risk management and policy development by certified consultants.",
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
    title: "GRC Services | Governance, Risk & Compliance Consulting | ITOrigin",
    description: "Expert guidance for regulatory compliance, risk management, and security governance. Achieve and maintain compliance with industry standards.",
    type: "website",
    url: "https://itorigin.com/services/grc-services",
    images: [
      {
        url: "/images/og-grc-services.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin GRC Services"
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={grcPageHero.badge}
        title={grcPageHero.title}
        highlight={grcPageHero.highlight}
        description={grcPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {grcPageCTAs.map((cta) => (
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
      <StatsSection stats={grcPageStats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={grcPageSectionHeaders.features.title}
            description={grcPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {grcPageFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={grcPageSectionHeaders.benefits.title}
            description={grcPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grcPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={grcPageSectionHeaders.process.title}
            description={grcPageSectionHeaders.process.description}
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {grcPageProcess.map((item, index) => (
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
              {grcPageSectionHeaders.frameworks.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {grcPageSectionHeaders.frameworks.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grcPageFrameworks.map((framework, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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

      {/* Pricing CTA */}
      <PricingCTA serviceName="GRC" />

      {/* CTA Section */}
      <CTASection
        title={grcPageCTA.title}
        description={grcPageCTA.description}
        buttons={grcPageCTA.buttons}
      />
    </div>
  );
}
