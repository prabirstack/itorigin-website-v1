import { Metadata } from "next";
import {
  Shield,
  Target,
  Users,
  Lightbulb,
  Heart,
  Zap,
  Lock,
  TrendingUp
} from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { ValueCard } from "@/components/about/value-card";
import { PrinciplesSection } from "@/components/about/principles-section";
import { QuoteSection } from "@/components/about/quote-section";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "Our Values | IT Origin - Principles That Guide Us",
  description: "Discover the core values and principles that drive IT Origin. Learn about our commitment to excellence, innovation, integrity, and client-centric cybersecurity solutions.",
  keywords: [
    "IT Origin values",
    "company values",
    "cybersecurity principles",
    "business ethics",
    "security culture",
    "company culture"
  ],
  openGraph: {
    title: "Our Values | IT Origin - Principles That Guide Us",
    description: "Discover the core values and principles that drive IT Origin's commitment to excellence in cybersecurity.",
    type: "website",
    url: "https://itorigin.com/about/values",
    images: [
      {
        url: "/images/og-values.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Values"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Values | IT Origin - Principles That Guide Us",
    description: "Discover the core values and principles that drive IT Origin's commitment to excellence.",
    images: ["/images/og-values.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/about/values"
  }
};

export default function ValuesPage() {
  const coreValues = [
    {
      icon: "Shield" as const,
      title: "Excellence in Execution",
      description: "We pursue excellence in everything we do, from threat detection to incident response. Our commitment to quality ensures that our clients receive world-class security solutions that exceed expectations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "Lightbulb" as const,
      title: "Continuous Innovation",
      description: "The threat landscape evolves constantly, and so do we. We invest heavily in research, emerging technologies, and cutting-edge tools to stay ahead of cybercriminals and protect our clients.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "Heart" as const,
      title: "Client-Centric Approach",
      description: "Our clients' success is our success. We build lasting partnerships by truly understanding their unique challenges, tailoring solutions to their needs, and being there whenever they need us.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "Lock" as const,
      title: "Unwavering Integrity",
      description: "Trust is the foundation of cybersecurity. We operate with complete transparency, maintain the highest ethical standards, and protect client data with the utmost confidentiality.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: "Users" as const,
      title: "Collaborative Teamwork",
      description: "Security is a team sport. We foster a culture of collaboration where experts from different disciplines work together seamlessly to deliver comprehensive protection.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "Zap" as const,
      title: "Proactive Mindset",
      description: "We don't wait for threats to materialize. Our proactive approach means identifying vulnerabilities, anticipating attacks, and implementing defenses before incidents occur.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: "Target" as const,
      title: "Results-Driven Focus",
      description: "We measure our success by the tangible results we deliver. From reduced incident response times to improved security postures, we're committed to outcomes that matter.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "TrendingUp" as const,
      title: "Continuous Learning",
      description: "The cybersecurity field demands constant learning. We invest in our team's professional development, certifications, and training to maintain our position as industry leaders.",
      color: "from-teal-500 to-green-500"
    }
  ];

  const operatingPrinciples = [
    "Prioritize client security above all else",
    "Respond to incidents with urgency and precision",
    "Communicate clearly and transparently",
    "Embrace accountability for our actions",
    "Foster diversity and inclusion in our team",
    "Maintain the highest professional standards",
    "Share knowledge and learn from each other",
    "Challenge assumptions and think critically",
    "Adapt quickly to changing threat landscapes",
    "Celebrate successes and learn from failures"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Heart", text: "Our Values" }}
        title="The Values That"
        highlight="Define Us"
        description="Our core values aren't just words on a wall—they're the principles that guide every decision we make, every solution we build, and every relationship we forge."
      />

      {/* Core Values Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Core Values"
            description="Eight fundamental values that shape our culture, drive our innovation, and define how we serve our clients."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <ValueCard
                key={index}
                {...value}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection
        quote="Values are not just what we believe—they're what we do when no one is watching. At IT Origin, our values are lived every day in every interaction."
        author="Sarah Chen"
        role="Chief Executive Officer"
      />

      {/* Operating Principles */}
      <PrinciplesSection
        title="Our Operating Principles"
        description="These principles guide our daily operations and interactions with clients, partners, and each other."
        principles={operatingPrinciples}
      />

      {/* Culture Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card">
              <div className="text-4xl font-black text-primary mb-4">24/7</div>
              <h3 className="text-xl font-bold mb-3">Always Available</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cyber threats don't sleep, and neither do we. Our commitment means being there for our clients around the clock.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card">
              <div className="text-4xl font-black text-primary mb-4">100%</div>
              <h3 className="text-xl font-bold mb-3">Full Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in complete honesty with our clients about threats, risks, and the effectiveness of our solutions.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card">
              <div className="text-4xl font-black text-primary mb-4">Zero</div>
              <h3 className="text-xl font-bold mb-3">No Compromises</h3>
              <p className="text-muted-foreground leading-relaxed">
                When it comes to security, we never compromise on quality, integrity, or the safety of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Join a Team That Lives These Values"
        description="If these values resonate with you, we'd love to hear from you. Explore career opportunities and become part of our mission."
        buttons={[
          { text: "View Careers", href: "mailto:careers@itorigin.com" },
          { text: "Meet Our Team", href: "/about/team", variant: "secondary" }
        ]}
      />
    </div>
  );
}
