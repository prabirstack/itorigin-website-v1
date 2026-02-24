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
  pentestPageHero,
  pentestPageCTAs,
  pentestPageStats,
  pentestPageSectionHeaders,
  pentestPageFeatures,
  pentestPageBenefits,
  pentestPageProcess,
  pentestPageCTA,
} from "@/utils/data/services/penetration-testing-data";

export const metadata: Metadata = {
  title: "Penetration Testing Services | Ethical Hacking | ITOrigin",
  description: "Professional penetration testing services to identify vulnerabilities in your web applications, networks, APIs, and cloud infrastructure. OSCP-certified ethical hackers.",
  keywords: [
    "penetration testing",
    "pen testing",
    "ethical hacking",
    "web application testing",
    "network penetration testing",
    "API security testing",
    "mobile app security",
    "cloud security testing",
    "OSCP certified",
    "security assessment"
  ],
  openGraph: {
    title: "Penetration Testing Services | Ethical Hacking | ITOrigin",
    description: "Professional penetration testing by OSCP-certified ethical hackers. Identify vulnerabilities before attackers do.",
    type: "website",
    url: "https://itorigin.com/services/penetration-testing",
  },
  alternates: {
    canonical: "https://itorigin.com/services/penetration-testing"
  }
};

export default function PenetrationTestingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={pentestPageHero.badge}
        title={pentestPageHero.title}
        highlight={pentestPageHero.highlight}
        description={pentestPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {pentestPageCTAs.map((cta) => (
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
      <StatsSection stats={pentestPageStats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={pentestPageSectionHeaders.features.title}
            description={pentestPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pentestPageFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={pentestPageSectionHeaders.benefits.title}
            description={pentestPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pentestPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={pentestPageSectionHeaders.process.title}
            description={pentestPageSectionHeaders.process.description}
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {pentestPageProcess.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <PricingCTA serviceName="penetration testing" />

      {/* CTA Section */}
      <CTASection
        title={pentestPageCTA.title}
        description={pentestPageCTA.description}
        buttons={pentestPageCTA.buttons}
      />
    </div>
  );
}
