import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Clock, ExternalLink, Tag } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "News & Events | IT Origin",
  description: "Stay updated with the latest news, announcements, and events from IT Origin. Industry insights, company updates, and upcoming conferences.",
  keywords: [
    "cybersecurity news",
    "security events",
    "IT Origin news",
    "security conferences",
    "company announcements",
    "industry updates"
  ],
  openGraph: {
    title: "News & Events | IT Origin",
    description: "Latest news, announcements, and events from IT Origin.",
    type: "website",
    url: "https://itorigin.com/news",
  },
  alternates: {
    canonical: "https://itorigin.com/news"
  }
};

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "announcement" | "press" | "award" | "partnership";
  featured: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "conference" | "webinar" | "workshop" | "meetup";
  registrationUrl?: string;
  isPast: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: "series-a",
    title: "IT Origin Announces $15M Series A Funding",
    excerpt: "Funding will accelerate product development and expansion into new markets. Led by Accel Partners with participation from existing investors.",
    date: "January 15, 2025",
    category: "announcement",
    featured: true
  },
  {
    id: "iso-certification",
    title: "IT Origin Achieves ISO 27001:2022 Certification",
    excerpt: "Demonstrates our commitment to maintaining the highest standards of information security management.",
    date: "January 10, 2025",
    category: "award",
    featured: true
  },
  {
    id: "aws-partnership",
    title: "IT Origin Becomes AWS Security Competency Partner",
    excerpt: "Partnership enables enhanced cloud security services for AWS customers with specialized tools and expertise.",
    date: "December 20, 2024",
    category: "partnership",
    featured: false
  },
  {
    id: "gartner-recognition",
    title: "Recognized in Gartner's Market Guide for MDR Services",
    excerpt: "IT Origin listed as a representative vendor in Gartner's latest Market Guide for Managed Detection and Response.",
    date: "December 15, 2024",
    category: "press",
    featured: true
  },
  {
    id: "new-office",
    title: "IT Origin Opens New Security Operations Center in Singapore",
    excerpt: "Expansion strengthens our 24/7 coverage and provides better service to Asia-Pacific customers.",
    date: "December 1, 2024",
    category: "announcement",
    featured: false
  },
  {
    id: "cto-hire",
    title: "Industry Veteran Joins IT Origin as Chief Technology Officer",
    excerpt: "Former Microsoft security leader brings 20+ years of experience to drive innovation and product development.",
    date: "November 20, 2024",
    category: "announcement",
    featured: false
  }
];

const events: Event[] = [
  {
    id: "rsac-2025",
    title: "RSA Conference 2025",
    description: "Visit our booth to see live demos of our SOC platform and meet our security experts. Exclusive show discounts available.",
    date: "April 28 - May 1, 2025",
    time: "All Day",
    location: "San Francisco, CA",
    type: "conference",
    registrationUrl: "https://www.rsaconference.com",
    isPast: false
  },
  {
    id: "webinar-threat-hunting",
    title: "Webinar: Advanced Threat Hunting Techniques",
    description: "Learn advanced techniques for proactive threat hunting from our SOC analysts. Live demo and Q&A included.",
    date: "February 15, 2025",
    time: "11:00 AM IST",
    location: "Online",
    type: "webinar",
    registrationUrl: "/contact?event=threat-hunting-webinar",
    isPast: false
  },
  {
    id: "workshop-incident-response",
    title: "Workshop: Building an Incident Response Playbook",
    description: "Hands-on workshop to develop and test incident response procedures for your organization.",
    date: "February 20, 2025",
    time: "10:00 AM - 4:00 PM IST",
    location: "Mumbai, India",
    type: "workshop",
    registrationUrl: "/contact?event=ir-workshop",
    isPast: false
  },
  {
    id: "blackhat-asia",
    title: "Black Hat Asia 2025",
    description: "Our offensive security team will be presenting research on emerging attack techniques.",
    date: "April 1-4, 2025",
    time: "All Day",
    location: "Singapore",
    type: "conference",
    registrationUrl: "https://www.blackhat.com/asia-25/",
    isPast: false
  }
];

const getCategoryLabel = (category: NewsItem["category"]) => {
  const labels = {
    announcement: "Announcement",
    press: "Press",
    award: "Award",
    partnership: "Partnership"
  };
  return labels[category];
};

const getEventTypeLabel = (type: Event["type"]) => {
  const labels = {
    conference: "Conference",
    webinar: "Webinar",
    workshop: "Workshop",
    meetup: "Meetup"
  };
  return labels[type];
};

export default function NewsPage() {
  const featuredNews = newsItems.filter(item => item.featured);
  const otherNews = newsItems.filter(item => !item.featured);
  const upcomingEvents = events.filter(event => !event.isPast);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Newspaper", text: "News & Events" }}
        title="Stay Informed"
        highlight="Stay Secure"
        description="The latest news, announcements, and events from IT Origin. Stay updated on industry trends, company milestones, and upcoming opportunities to connect."
      />

      {/* Featured News */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Featured News"
            description="Major announcements and highlights from IT Origin."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {featuredNews.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Upcoming Events"
            description="Join us at conferences, webinars, and workshops."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  {event.registrationUrl && (
                    <div>
                      <Link
                        href={event.registrationUrl}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                      >
                        Register
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Want to host a workshop or webinar with us?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Get in touch
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* All News */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="All News"
            description="Company updates, partnerships, and industry recognition."
          />

          <div className="space-y-4 max-w-4xl mx-auto">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors flex items-start gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Press Contact */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Press & Media</h2>
            <p className="text-muted-foreground mb-8">
              For press inquiries, interviews, or media resources, please contact our communications team.
            </p>
            <div className="p-6 rounded-xl border border-border bg-card inline-block">
              <p className="font-semibold mb-1">Press Contact</p>
              <p className="text-muted-foreground">press@itorigin.com</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Never Miss an Update
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to our newsletter for the latest news, security insights, and event invitations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blogs"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
