import { Metadata } from "next";

import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { ValueCard } from "@/components/about/value-card";
import { PrinciplesSection } from "@/components/about/principles-section";
import { QuoteSection } from "@/components/about/quote-section";
import { CTASection } from "@/components/about/cta-section";
import {
  valuesPageHero,
  valuesPageCoreValues,
  valuesPageSectionHeaders,
  valuesPageOperatingPrinciples,
  valuesPageQuote,
  valuesPageCultureStats,
  valuesPageCTA,
} from "@/utils/data/about";

export const metadata: Metadata = {
  title: "Our Values | ITOrigin - Principles That Guide Us",
  description:
    "Discover the core values and principles that drive ITOrigin. Learn about our commitment to excellence, innovation, integrity, and client-centric cybersecurity solutions.",
  keywords: [
    "ITOrigin values",
    "company values",
    "cybersecurity principles",
    "business ethics",
    "security culture",
    "company culture",
  ],
  openGraph: {
    title: "Our Values | ITOrigin - Principles That Guide Us",
    description:
      "Discover the core values and principles that drive ITOrigin's commitment to excellence in cybersecurity.",
    type: "website",
    url: "https://itorigin.com/about/values",
    images: [
      {
        url: "/images/og-values.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Values",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Values | ITOrigin - Principles That Guide Us",
    description:
      "Discover the core values and principles that drive ITOrigin's commitment to excellence.",
    images: ["/images/og-values.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/about/values",
  },
};

export default function ValuesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={valuesPageHero.badge}
        title={valuesPageHero.title}
        highlight={valuesPageHero.highlight}
        description={valuesPageHero.description}
      />

      {/* Core Values Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={valuesPageSectionHeaders.coreValues.title}
            description={valuesPageSectionHeaders.coreValues.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesPageCoreValues.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection
        quote={valuesPageQuote.quote}
        author={valuesPageQuote.author}
        role={valuesPageQuote.role}
        image={valuesPageQuote.image}
      />

      {/* Operating Principles */}
      <PrinciplesSection
        title={valuesPageSectionHeaders.principles.title}
        description={valuesPageSectionHeaders.principles.description}
        principles={valuesPageOperatingPrinciples}
      />

      {/* Culture Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {valuesPageCultureStats.map((stat) => (
              <div key={stat.value} className="p-8 rounded-2xl border border-border bg-card">
                <div className="text-4xl font-black text-primary mb-4">{stat.value}</div>
                <h3 className="text-xl font-bold mb-3">{stat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={valuesPageCTA.title}
        description={valuesPageCTA.description}
        buttons={valuesPageCTA.buttons}
      />
    </div>
  );
}
