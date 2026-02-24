import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";
import {
  partnerPageHero,
  partnerPageCTAs,
  partnerPageStats,
  partnerPageSectionHeaders,
  partnerPageWhyPartner,
  partnerPageHighlights,
  partnerPageProcess,
  partnerPageCTA,
} from "@/utils/data/partner";

export const metadata: Metadata = {
  title: "Partner Program | Join ITOrigin's Cybersecurity Partner Network",
  description: "Grow your business with ITOrigin's partner program. Access training, technical support, marketing resources, and competitive margins. Join our network of trusted cybersecurity partners.",
  keywords: [
    "partner program",
    "cybersecurity partners",
    "reseller program",
    "technology partners",
    "channel partners",
    "security partner network",
    "MSP partners",
    "VAR program",
    "partner benefits",
    "partner portal"
  ],
  openGraph: {
    title: "Partner Program | Join ITOrigin's Cybersecurity Partner Network",
    description: "Grow your business with ITOrigin's partner program. Access training, support, and competitive margins.",
    type: "website",
    url: "https://itorigin.com/partner",
    images: [
      {
        url: "/images/og-partner.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Partner Program"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Program | Join ITOrigin's Cybersecurity Partner Network",
    description: "Grow your business with ITOrigin's partner program. Access training, support, and competitive margins.",
    images: ["/images/og-partner.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/partner"
  }
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={partnerPageHero.badge}
        title={partnerPageHero.title}
        highlight={partnerPageHero.highlight}
        description={partnerPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partnerPageCTAs.map((cta, index) =>
              cta.primary ? (
                <Link
                  key={index}
                  href={cta.href}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
                >
                  {cta.text}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  key={index}
                  href={cta.href}
                  className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                >
                  {cta.text}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={partnerPageStats} />

      {/* Why Partner Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              {partnerPageSectionHeaders.whyPartner.title}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-primary mb-4">
              {partnerPageSectionHeaders.whyPartner.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {partnerPageSectionHeaders.whyPartner.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerPageWhyPartner.map((item, index) => (
              <BenefitCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={partnerPageSectionHeaders.highlights.title}
            description={partnerPageSectionHeaders.highlights.description}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {partnerPageHighlights.map((highlight, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-xl font-black mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Application Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                {partnerPageProcess.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {partnerPageProcess.description}
              </p>
            </div>

            <div className="space-y-6">
              {partnerPageProcess.steps.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-xl font-black flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-black mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Re-enable when real partner testimonials are available
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "ITOrigin's partner program has been instrumental in growing our cybersecurity practice. The training, support, and margins are excellent.",
                author: "Sarah Johnson",
                role: "CEO, SecureNet Solutions",
                company: "Silver Partner"
              },
              {
                quote: "The technical support and resources available to partners are outstanding. We've successfully delivered complex security projects with their assistance.",
                author: "Michael Chen",
                role: "CTO, CyberGuard Technologies",
                company: "Gold Partner"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-border bg-card"
              >
                <p className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary font-semibold">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <CTASection
        title={partnerPageCTA.title}
        description={partnerPageCTA.description}
        buttons={partnerPageCTA.buttons}
      />
    </div>
  );
}
