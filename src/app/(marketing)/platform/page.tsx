import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";
import { ProductCard } from "@/components/platform/product-card";
import { FeatureShowcase } from "@/components/platform/feature-showcase";
import { IntegrationCard } from "@/components/platform/integration-card";
import {
  platformPageHero,
  platformPageCTAs,
  platformPageStats,
  platformPageProducts,
  platformPageSectionHeaders,
  platformPageCoreFeatures,
  platformPageIntegrations,
  platformPageBenefits,
  platformPageDeployment,
  platformPagePricing,
  platformPageIntegrationsFooter,
  platformPageCTA,
} from "@/utils/data/platform";

export const metadata: Metadata = {
  title: "SecureOps Platform | Unified Security Operations & Threat Management | ITOrigin",
  description: "Transform your security operations with ITOrigin's SecureOps Platform. Unified SIEM, automated threat detection, compliance monitoring, and AI-powered security analytics in one comprehensive solution.",
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
    title: "SecureOps Platform | Unified Security Operations & Threat Management | ITOrigin",
    description: "Transform your security operations with unified SIEM, automated threat detection, and AI-powered analytics.",
    type: "website",
    url: "https://itorigin.com/platform",
    images: [
      {
        url: "/images/og-platform.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin SecureOps Platform"
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={platformPageHero.badge}
        title={platformPageHero.title}
        highlight={platformPageHero.highlight}
        description={platformPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platformPageCTAs.map((cta, index) => (
              <Link
                key={index}
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
      <StatsSection stats={platformPageStats} />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={platformPageSectionHeaders.products.title}
            description={platformPageSectionHeaders.products.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {platformPageProducts.map((product, index) => (
              <ProductCard key={index} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={platformPageSectionHeaders.features.title}
            description={platformPageSectionHeaders.features.description}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {platformPageCoreFeatures.map((feature, index) => (
              <FeatureShowcase key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={platformPageSectionHeaders.benefits.title}
            description={platformPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={platformPageSectionHeaders.integrations.title}
            description={platformPageSectionHeaders.integrations.description}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformPageIntegrations.map((integration, index) => (
              <IntegrationCard key={index} {...integration} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {platformPageIntegrationsFooter.text}
            </p>
            <Link
              href={platformPageIntegrationsFooter.linkHref}
              className="text-primary hover:underline font-semibold"
            >
              {platformPageIntegrationsFooter.linkText}
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
                {platformPageDeployment.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {platformPageDeployment.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {platformPageDeployment.options.map((option, index) => {
                const IconComponent = iconMap[option.icon];
                return (
                  <div
                    key={index}
                    className={
                      option.recommended
                        ? "p-8 rounded-2xl border border-primary bg-primary/5 text-center shadow-lg shadow-primary/20"
                        : "p-8 rounded-2xl border border-border bg-card text-center"
                    }
                  >
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                    </div>
                    <h3 className="text-xl font-black mb-3">{option.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {option.description}
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>&bull; {feature}</li>
                      ))}
                    </ul>
                    {option.recommended && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          Recommended
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {platformPagePricing.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {platformPagePricing.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platformPagePricing.buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={
                  button.primary
                    ? "px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                    : "px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                }
              >
                {button.text}
                {button.primary && <ArrowRight className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={platformPageCTA.title}
        description={platformPageCTA.description}
        buttons={platformPageCTA.buttons}
      />
    </div>
  );
}
