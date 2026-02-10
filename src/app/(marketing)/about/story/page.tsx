import { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { TimelineSection } from "@/components/about/timeline-section";
import { ValuesPreviewSection } from "@/components/about/values-preview-section";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "Our Story | IT Origin - 15 Years of Cybersecurity Excellence",
  description:
    "Discover IT Origin's journey from a small startup to a global cybersecurity leader. Learn about our milestones, achievements, and 15 years of protecting organizations worldwide.",
  keywords: [
    "IT Origin story",
    "company history",
    "cybersecurity journey",
    "security milestones",
    "company timeline",
    "about IT Origin",
  ],
  openGraph: {
    title: "Our Story | IT Origin - 15 Years of Cybersecurity Excellence",
    description:
      "Discover IT Origin's journey from a small startup to a global cybersecurity leader.",
    type: "website",
    url: "https://itorigin.com/about/story",
    images: [
      {
        url: "/images/og-story.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | IT Origin - 15 Years of Cybersecurity Excellence",
    description:
      "Discover IT Origin's journey from a small startup to a global cybersecurity leader.",
    images: ["/images/og-story.jpg"],
  },
  alternates: {
    canonical: "https://itorigin.com/about/story",
  },
};

export default function StoryPage() {
  const milestones = [
    {
      year: "2009",
      title: "The Foundation",
      description:
        "IT Origin was founded by a group of security experts who saw the growing need for comprehensive cybersecurity solutions. Starting with just 5 people in a small office, we set out to change the industry.",
      icon: "Rocket" as const,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2012",
      title: "First Major Client",
      description:
        "Secured our first Fortune 500 client, marking a turning point in our growth. This partnership validated our approach and opened doors to enterprise-level opportunities.",
      icon: "Award" as const,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "2015",
      title: "Global Expansion",
      description:
        "Expanded operations internationally, opening offices in Europe and Asia. Our team grew to 50+ security professionals serving clients across 15 countries.",
      icon: "Users" as const,
      color: "from-orange-500 to-red-500",
    },
    {
      year: "2018",
      title: "Innovation Leader",
      description:
        "Launched our proprietary AI-powered threat detection platform, setting new industry standards. Received recognition as one of the top cybersecurity innovators.",
      icon: "Target" as const,
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2021",
      title: "100+ Expert Team",
      description:
        "Grew to over 100 certified security professionals. Expanded our service offerings to include comprehensive GRC consulting and advanced penetration testing.",
      icon: "TrendingUp" as const,
      color: "from-indigo-500 to-blue-500",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description:
        "Achieved major industry certifications and awards. Now protecting 300+ organizations globally with 24/7 SOC operations and cutting-edge security solutions.",
      icon: "Award" as const,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const stats = [
    { value: "300+", label: "Clients Protected" },
    { value: "100+", label: "Security Experts" },
    { value: "12+", label: "Countries" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Calendar", text: "Our Journey" }}
        title="Our Story"
        highlight="15 Years of Excellence"
        description="From a small startup to a global cybersecurity leader, our journey has been defined by innovation, dedication, and an unwavering commitment to protecting what matters most."
      />

      {/* Timeline Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Milestones"
            description="Key moments that shaped IT Origin into the trusted security partner we are today."
          />
          <TimelineSection milestones={milestones} />
        </div>
      </section>

      {/* MD's Message */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                From the Managing Director
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                A Message from Our{" "}
                <span className="text-primary">Leadership</span>
              </h2>
            </div>

            <div className="relative p-8 md:p-12 rounded-3xl border border-border bg-card">
              {/* Quote mark */}
              <div className="absolute -top-5 left-8 md:left-12 text-7xl font-serif text-primary/20 select-none">
                &ldquo;
              </div>

              <blockquote className="relative">
                <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8 italic">
                  &ldquo;Customer trust is our purpose, our people are our
                  strength, and global excellence is our destination.&rdquo;
                </p>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our vision is to build a cybersecurity company where trust is
                    earned every day&mdash;from our customers, our partners, and
                    our people.
                  </p>
                  <p>
                    We exist to protect our customers&apos; digital futures.
                    Every solution we design, every service we deliver, and every
                    decision we make begins with a simple question: does this
                    genuinely improve our customer&apos;s security, resilience,
                    and confidence?
                  </p>
                  <p>
                    We aim to be more than a vendor&mdash;we strive to be a
                    long-term security partner who understands our
                    customers&apos; risks, business realities and aspirations
                    where every service aims to add value to customers&apos;
                    business.
                  </p>
                </div>

                <footer className="mt-8 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/team/basudev-ganguly.jpg"
                      alt="Basudev Gangopadhyay"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Basudev Gangopadhyay
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Managing Director, IT Origin
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
        badge={{ icon: "Target", text: "What Drives Us" }}
        title="Built on Strong Values"
        description="Throughout our journey, our core values have remained constant. They guide every decision we make and shape the way we serve our clients. From day one, we've been committed to excellence, innovation, and unwavering integrity."
        values={["Innovation", "Integrity", "Excellence", "Client Focus"]}
        stats={stats}
      />

      {/* CTA Section */}
      <CTASection
        title="Be Part of Our Story"
        description="Join hundreds of organizations that trust IT Origin to protect their digital future."
        buttons={[
          { text: "Meet Our Team", href: "/about/team" },
          {
            text: "Explore Services",
            href: "/services/managed-soc-services",
            variant: "secondary",
          },
        ]}
      />
    </div>
  );
}
