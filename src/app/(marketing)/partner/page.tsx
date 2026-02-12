import { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";

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
  const stats = [
    { label: "Active Partners", value: "50+", icon: "Users" as const },
    { label: "Partner Revenue Growth", value: "45%", icon: "TrendingUp" as const },
    { label: "Certified Partner Engineers", value: "500+", icon: "Award" as const },
    { label: "Countries", value: "12+", icon: "Globe" as const },
  ];

  const benefits = [
    {
      icon: "TrendingUp" as const,
      title: "Revenue Growth",
      description: "Expand your business with high-demand cybersecurity solutions and attractive partner margins."
    },
    {
      icon: "Award" as const,
      title: "Training & Certification",
      description: "Access comprehensive training programs and earn recognized certifications for your team."
    },
    {
      icon: "Users" as const,
      title: "Dedicated Support",
      description: "Get help from dedicated partner managers and technical support teams."
    },
    {
      icon: "Rocket" as const,
      title: "Marketing Resources",
      description: "Leverage our marketing materials, campaigns, and co-marketing opportunities."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Deal Registration",
      description: "Protect your deals and opportunities with our deal registration program."
    },
    {
      icon: "Globe" as const,
      title: "Global Network",
      description: "Join a thriving global network of cybersecurity partners and experts."
    }
  ];

  const programHighlights = [
    {
      title: "Partner Portal",
      description: "Access sales tools, technical documentation, training materials, and marketing resources through our comprehensive partner portal."
    },
    {
      title: "Technical Enablement",
      description: "Product training, hands-on labs, technical workshops, and certification programs to build your team's expertise."
    },
    {
      title: "Sales Support",
      description: "Pre-sales engineering assistance, proof-of-concept support, and competitive intelligence to help you win deals."
    },
    {
      title: "End-to-End Handholding",
      description: "From onboarding to deal closure, our dedicated partner success team walks with you at every step — ensuring you never face a challenge alone."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Users", text: "Partner Program" }}
        title="Grow Together"
        highlight="Succeed Together"
        description="Join ITOrigin's partner network and accelerate your cybersecurity business. Access world-class training, technical support, marketing resources, and competitive margins to help your customers stay secure."
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/partner-portal"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Partner Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Partner Program Benefits"
            description="Everything you need to build a successful cybersecurity practice with ITOrigin."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Program Highlights"
            description="Comprehensive resources and support to help you succeed."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
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
                How to Become a Partner
              </h2>
              <p className="text-lg text-muted-foreground">
                Join our partner program in four simple steps.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Submit Application",
                  description: "Complete the partner application form with details about your business, technical capabilities, and target markets."
                },
                {
                  step: 2,
                  title: "Review & Approval",
                  description: "Our partner team reviews your application and schedules a discussion to understand your business goals and partnership objectives."
                },
                {
                  step: 3,
                  title: "Onboarding & Training",
                  description: "Sign the partner agreement, access the partner portal, and complete initial training to get your team certified."
                },
                {
                  step: 4,
                  title: "Start Selling",
                  description: "Begin selling ITOrigin solutions with full access to sales tools, technical support, and marketing resources."
                }
              ].map((item, index) => (
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
        title="Ready to Partner with ITOrigin?"
        description="Join our growing network of cybersecurity partners and unlock new revenue opportunities."
        buttons={[
          { text: "Apply to Partner Program", href: "/contact" },
          { text: "Partner Login", href: "/partner-portal", variant: "secondary" }
        ]}
      />
    </div>
  );
}
