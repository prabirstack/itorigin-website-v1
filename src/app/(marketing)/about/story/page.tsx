import { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { TimelineSection } from "@/components/about/timeline-section";
import { ValuesPreviewSection } from "@/components/about/values-preview-section";
import { CTASection } from "@/components/about/cta-section";
import {
  storyPageHero,
  storyPageMilestones,
  storyPageSectionHeader,
  storyPageMDMessage,
  storyPageValuesPreview,
  storyPageCTA,
} from "@/utils/data/about";

export const metadata: Metadata = {
  title: "Our Story | ITOrigin - Cybersecurity Excellence Since 2017",
  description:
    "Discover ITOrigin's journey from a Kolkata-based consultancy to a globally recognized cybersecurity firm. CERT-In empanelled, STQC approved, serving 300+ clients across 12+ countries.",
  keywords: [
    "ITOrigin story",
    "company history",
    "cybersecurity journey",
    "security milestones",
    "company timeline",
    "about ITOrigin",
    "CERT-In empanelled",
  ],
  openGraph: {
    title: "Our Story | ITOrigin - Cybersecurity Excellence Since 2017",
    description:
      "Discover ITOrigin's journey from a Kolkata-based consultancy to a globally recognized cybersecurity firm.",
    type: "website",
    url: "https://itorigin.com/about/story",
    images: [
      {
        url: "/images/og-story.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | ITOrigin - Cybersecurity Excellence Since 2017",
    description:
      "Discover ITOrigin's journey from a Kolkata-based consultancy to a globally recognized cybersecurity firm.",
    images: ["/images/og-story.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/about/story",
  },
};

export default function StoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={storyPageHero.badge}
        title={storyPageHero.title}
        highlight={storyPageHero.highlight}
        description={storyPageHero.description}
      />

      {/* Timeline Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={storyPageSectionHeader.title}
            description={storyPageSectionHeader.description}
          />
          <TimelineSection milestones={storyPageMilestones} />
        </div>
      </section>

      {/* MD's Message */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {storyPageMDMessage.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                {storyPageMDMessage.title}{" "}
                <span className="text-primary">{storyPageMDMessage.titleHighlight}</span>
              </h2>
            </div>

            <div className="relative p-8 md:p-12 rounded-3xl border border-border bg-card">
              {/* Quote mark */}
              <div className="absolute -top-5 left-8 md:left-12 text-7xl font-serif text-primary/20 select-none">
                &ldquo;
              </div>

              <blockquote className="relative">
                <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 italic">
                  &ldquo;{storyPageMDMessage.quote}&rdquo;
                </p>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {storyPageMDMessage.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <footer className="mt-8 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-4">
                    <Image
                      src={storyPageMDMessage.author.image}
                      alt={storyPageMDMessage.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {storyPageMDMessage.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {storyPageMDMessage.author.role}
                      </p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values Preview Section */}
      <ValuesPreviewSection
        badge={storyPageValuesPreview.badge}
        title={storyPageValuesPreview.title}
        description={storyPageValuesPreview.description}
        values={storyPageValuesPreview.values}
        stats={storyPageValuesPreview.stats}
      />

      {/* CTA Section */}
      <CTASection
        title={storyPageCTA.title}
        description={storyPageCTA.description}
        buttons={storyPageCTA.buttons}
      />
    </div>
  );
}
