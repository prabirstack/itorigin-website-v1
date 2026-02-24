import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";
import { CourseCard } from "@/components/training/course-card";
import { TrainingPathCard } from "@/components/training/training-path-card";
import {
  trainingPageHero,
  trainingPageCTAs,
  trainingPageStats,
  trainingPageSectionHeaders,
  trainingPageCourses,
  trainingPagePaths,
  trainingPageBenefits,
  trainingPageCorporate,
  trainingPageCTA,
} from "@/utils/data/training";

export const metadata: Metadata = {
  title: "Cybersecurity Training & Certification Courses | ITOrigin",
  description:
    "Advance your cybersecurity career with ITOrigin's expert-led training programs. OSCP, CEH, CISSP, security awareness training, and custom corporate programs. Hands-on labs and real-world scenarios.",
  keywords: [
    "cybersecurity training",
    "security certification",
    "OSCP training",
    "CEH certification",
    "CISSP course",
    "penetration testing training",
    "security awareness training",
    "ethical hacking course",
    "corporate security training",
    "hands-on cybersecurity",
    "security bootcamp",
  ],
  openGraph: {
    title: "Cybersecurity Training & Certification Courses | ITOrigin",
    description:
      "Expert-led cybersecurity training programs with hands-on labs. OSCP, CEH, CISSP, and custom corporate training.",
    type: "website",
    url: "https://itorigin.com/training",
    images: [
      {
        url: "/images/og-training.jpg",
        width: 1200,
        height: 630,
        alt: "ITOrigin Cybersecurity Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Training & Certification Courses",
    description:
      "Expert-led cybersecurity training programs with hands-on labs and real-world scenarios.",
    images: ["/images/og-training.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/training",
  },
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={trainingPageHero.badge}
        title={trainingPageHero.title}
        highlight={trainingPageHero.highlight}
        description={trainingPageHero.description}
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {trainingPageCTAs.map((cta) => (
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
      <StatsSection stats={trainingPageStats} />

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={trainingPageSectionHeaders.benefits.title}
            description={trainingPageSectionHeaders.benefits.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPageBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={trainingPageSectionHeaders.courses.title}
            description={trainingPageSectionHeaders.courses.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPageCourses.map((course, index) => (
              <CourseCard key={index} {...course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Training Paths Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={trainingPageSectionHeaders.paths.title}
            description={trainingPageSectionHeaders.paths.description}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {trainingPagePaths.map((path, index) => (
              <TrainingPathCard key={index} {...path} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-6">{trainingPageCorporate.title}</h2>
              <p className="text-lg text-muted-foreground">
                {trainingPageCorporate.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {trainingPageCorporate.programs.map((program) => {
                const ProgramIcon = iconMap[program.icon];
                return (
                  <div key={program.title} className="p-8 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      {ProgramIcon && <ProgramIcon className="w-6 h-6 text-primary" />}
                    </div>
                    <h3 className="text-2xl font-black mb-4">{program.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {program.description}
                    </p>
                    <ul className="space-y-3">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href={trainingPageCorporate.ctaHref}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                {trainingPageCorporate.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={trainingPageCTA.title}
        description={trainingPageCTA.description}
        buttons={trainingPageCTA.buttons}
      />
    </div>
  );
}
