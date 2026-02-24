import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { StatsSection } from "@/components/about/stats-section";
import { CertificationsSection } from "@/components/marketing/certifications-section";
import { AboutStory } from "@/components/about/about-story";
import { HighlightsSection } from "@/components/about/highlights-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { CTASection } from "@/components/about/cta-section";
import {
  aboutPageHero,
  aboutPageCTAs,
  aboutPageStats,
  aboutPageHighlights,
  aboutPageMissionVision,
  aboutPageCTA,
} from "@/utils/data/about";

export const metadata: Metadata = {
  title: "About ITOrigin | Leading Cybersecurity Services Provider",
  description:
    "Learn about ITOrigin, a trusted cybersecurity firm with 8+ years of experience protecting organizations worldwide. Discover our mission, values, and expert team.",
  keywords: [
    "ITOrigin",
    "cybersecurity company",
    "security services provider",
    "about us",
    "cybersecurity experts",
    "SOC services",
    "security solutions",
  ],
  openGraph: {
    title: "About ITOrigin | Leading Cybersecurity Services Provider",
    description:
      "Learn about ITOrigin, a trusted cybersecurity firm with 8+ years of experience protecting organizations worldwide.",
    type: "website",
    url: "https://itorigin.com/about",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ITOrigin | Leading Cybersecurity Services Provider",
    description:
      "Learn about ITOrigin, a trusted cybersecurity firm with 8+ years of experience.",
    images: ["/images/og-about.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={aboutPageHero.badge}
        title={aboutPageHero.title}
        highlight={aboutPageHero.highlight}
        description={aboutPageHero.description}
      />

      {/* Hero CTAs */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {aboutPageCTAs.map((cta) =>
              cta.primary ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
                >
                  {cta.text}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  key={cta.href}
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
      <StatsSection stats={aboutPageStats} />

      {/* Who We Are */}
      <AboutStory />

      {/* Certifications & Empanelments */}
      <CertificationsSection />

      {/* Highlights Section */}
      <HighlightsSection
        title={aboutPageHighlights.title}
        description={aboutPageHighlights.description}
        highlights={aboutPageHighlights.items}
      />

      {/* Mission & Vision Section */}
      <MissionVisionSection
        mission={aboutPageMissionVision.mission}
        vision={aboutPageMissionVision.vision}
      />

      {/* CTA Section */}
      <CTASection
        title={aboutPageCTA.title}
        description={aboutPageCTA.description}
        buttons={aboutPageCTA.buttons}
      />
    </div>
  );
}
