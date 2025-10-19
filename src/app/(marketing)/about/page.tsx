import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  ArrowRight
} from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { StatsSection } from "@/components/about/stats-section";
import { HighlightsSection } from "@/components/about/highlights-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "About IT Origin | Leading Cybersecurity Services Provider",
  description: "Learn about IT Origin, a trusted cybersecurity firm with 15+ years of experience protecting organizations worldwide. Discover our mission, values, and expert team.",
  keywords: [
    "IT Origin",
    "cybersecurity company",
    "security services provider",
    "about us",
    "cybersecurity experts",
    "SOC services",
    "security solutions"
  ],
  openGraph: {
    title: "About IT Origin | Leading Cybersecurity Services Provider",
    description: "Learn about IT Origin, a trusted cybersecurity firm with 15+ years of experience protecting organizations worldwide.",
    type: "website",
    url: "https://itorigin.com/about",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin - About Us"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About IT Origin | Leading Cybersecurity Services Provider",
    description: "Learn about IT Origin, a trusted cybersecurity firm with 15+ years of experience.",
    images: ["/images/og-about.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/about"
  }
};

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "15+", icon: "Award" as const },
    { label: "Security Experts", value: "100+", icon: "Users" as const },
    { label: "Clients Protected", value: "500+", icon: "Shield" as const },
    { label: "Countries Served", value: "25+", icon: "Globe" as const },
  ];

  const highlights = [
    {
      icon: "Shield" as const,
      title: "Industry-Leading Expertise",
      description: "Our team of certified security professionals brings decades of combined experience in protecting critical infrastructure."
    },
    {
      icon: "Target" as const,
      title: "Proactive Security Approach",
      description: "We don't just respond to threats—we anticipate them, using advanced threat intelligence and AI-powered analytics."
    },
    {
      icon: "TrendingUp" as const,
      title: "Proven Track Record",
      description: "With 99.9% uptime and zero major breaches across our client portfolio, we deliver results that matter."
    },
  ];

  const missionVision = {
    mission: {
      badge: { icon: "Target" as const, text: "Our Mission" },
      title: "Empowering Secure Digital Transformation",
      description: "Our mission is to empower organizations to embrace digital transformation with confidence by providing world-class cybersecurity solutions. We strive to be the trusted partner that enables businesses to innovate fearlessly while staying protected against evolving cyber threats.",
      values: [
        "Excellence in Execution",
        "Client-Centric Approach",
        "Continuous Innovation"
      ]
    },
    vision: {
      badge: { icon: "TrendingUp" as const, text: "Our Vision" },
      title: "A Secure Digital Future for All",
      description: "We envision a world where every organization, regardless of size or industry, has access to enterprise-grade cybersecurity. Through innovation, education, and relentless dedication, we aim to set new standards for security excellence and make the digital world a safer place for everyone.",
      values: [
        "Transparency & Trust",
        "Ethical Security Practices",
        "24/7 Commitment"
      ]
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "Trusted Cybersecurity Partner" }}
        title="Protecting What"
        highlight="Matters Most"
        description="IT Origin is a leading cybersecurity firm dedicated to safeguarding organizations against evolving digital threats. With cutting-edge technology and unparalleled expertise, we deliver comprehensive security solutions tailored to your unique needs."
      />

      {/* Hero CTAs */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services/managed-soc-services"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about/team"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Highlights Section */}
      <HighlightsSection
        title="Why Choose IT Origin"
        description="We combine technical excellence with business understanding to deliver security solutions that drive real value."
        highlights={highlights}
      />

      {/* Mission & Vision Section */}
      <MissionVisionSection
        mission={missionVision.mission}
        vision={missionVision.vision}
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Secure Your Future?"
        description="Learn more about our story, meet our team, and discover the values that drive us forward."
        buttons={[
          { text: "Our Story", href: "/about/story" },
          { text: "Our Values", href: "/about/values", variant: "secondary" }
        ]}
      />
    </div>
  );
}
