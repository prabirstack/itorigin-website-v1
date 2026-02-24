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
  offensiveSecurityPageHero,
  offensiveSecurityPageCTAs,
  offensiveSecurityPageStats,
  offensiveSecurityPageSectionHeaders,
  offensiveSecurityPageFeatures,
  offensiveSecurityPageBenefits,
  offensiveSecurityPageProcess,
  offensiveSecurityPageComplianceStandards,
  offensiveSecurityPageCTA,
} from "@/utils/data/services/offensive-security-data";

export const metadata: Metadata = {
  title: "Offensive Security Services | Penetration Testing & Red Team | ITOrigin",
  description: "Identify vulnerabilities before attackers do with ITOrigin's offensive security services. Expert penetration testing, vulnerability assessments, and red team operations by certified ethical hackers.",
  keywords: [
    "offensive security",
    "penetration testing",
    "ethical hacking",
    "vulnerability assessment",
    "red team operations",
    "security testing",
    "pen testing services",
    "application security testing",
    "network penetration testing",
    "web app security",
    "OSCP certified"
  ],
  openGraph: {
    title: "Offensive Security Services | Penetration Testing & Red Team | ITOrigin",
    description: "Identify vulnerabilities before attackers do. Expert penetration testing and red team operations by certified ethical hackers.",
    type: "website",
    url: "https://itorigin.com/services/offensive-security",
    images: [
      {
        url: "/images/og-offensive-security.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Offensive Security Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Offensive Security Services | Penetration Testing & Red Team",
    description: "Identify vulnerabilities before attackers do with expert penetration testing services.",
    images: ["/images/og-offensive-security.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/services/offensive-security"
  }
};

export default function OffensiveSecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={offensiveSecurityPageHero.badge}
        title={offensiveSecurityPageHero.title}
        highlight={offensiveSecurityPageHero.highlight}
        description={offensiveSecurityPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {offensiveSecurityPageCTAs.map((cta) => (
              <Link
                key={cta.text}
                href={cta.href}
                className={
                  cta.primary
                    ? "px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
                    : "px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                }
              >
                {cta.text}
                {cta.primary && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={offensiveSecurityPageStats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={offensiveSecurityPageSectionHeaders.features.title}
            description={offensiveSecurityPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {offensiveSecurityPageFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={offensiveSecurityPageSectionHeaders.benefits.title}
            description={offensiveSecurityPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offensiveSecurityPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testing Methodology Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={offensiveSecurityPageSectionHeaders.process.title}
            description={offensiveSecurityPageSectionHeaders.process.description}
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {offensiveSecurityPageProcess.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              {offensiveSecurityPageSectionHeaders.compliance.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {offensiveSecurityPageSectionHeaders.compliance.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offensiveSecurityPageComplianceStandards.map((standard, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card text-center"
              >
                <div className="text-2xl font-black text-primary mb-2">
                  {standard.name}
                </div>
                <p className="text-sm text-muted-foreground">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <PricingCTA serviceName="offensive security" />

      {/* CTA Section */}
      <CTASection
        title={offensiveSecurityPageCTA.title}
        description={offensiveSecurityPageCTA.description}
        buttons={offensiveSecurityPageCTA.buttons}
      />
    </div>
  );
}
