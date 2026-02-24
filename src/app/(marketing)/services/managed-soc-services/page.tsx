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
  managedSOCPageHero,
  managedSOCPageCTAs,
  managedSOCPageStats,
  managedSOCPageSectionHeaders,
  managedSOCPageFeatures,
  managedSOCPageBenefits,
  managedSOCPageProcess,
  managedSOCPageCTA,
} from "@/utils/data/services/managed-soc-data";

export const metadata: Metadata = {
  title: "Managed SOC Services | 24/7 Security Operations Center | ITOrigin",
  description:
    "Protect your organization with ITOrigin's managed SOC services. 24/7 threat monitoring, detection, and response by certified security analysts. Advanced threat intelligence and rapid incident response.",
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
    "security analysts",
  ],
  openGraph: {
    title: "Managed SOC Services | 24/7 Security Operations Center | ITOrigin",
    description:
      "24/7 threat monitoring, detection, and response by certified security analysts. Protect your organization with enterprise-grade security operations.",
    type: "website",
    url: "https://itorigin.com/services/managed-soc-services",
    images: [
      {
        url: "/images/og-soc-services.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Managed SOC Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed SOC Services | 24/7 Security Operations Center",
    description: "24/7 threat monitoring, detection, and response by certified security analysts.",
    images: ["/images/og-soc-services.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/services/managed-soc-services",
  },
};

export default function ManagedSOCServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={managedSOCPageHero.badge}
        title={managedSOCPageHero.title}
        highlight={managedSOCPageHero.highlight}
        description={managedSOCPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {managedSOCPageCTAs.map((cta) => (
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
      <StatsSection stats={managedSOCPageStats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={managedSOCPageSectionHeaders.features.title}
            description={managedSOCPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {managedSOCPageFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={managedSOCPageSectionHeaders.benefits.title}
            description={managedSOCPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managedSOCPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={managedSOCPageSectionHeaders.process.title}
            description={managedSOCPageSectionHeaders.process.description}
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {managedSOCPageProcess.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <PricingCTA serviceName="managed SOC" />

      {/* CTA Section */}
      <CTASection
        title={managedSOCPageCTA.title}
        description={managedSOCPageCTA.description}
        buttons={managedSOCPageCTA.buttons}
      />
    </div>
  );
}
