import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, Calendar, Clock, Users, Video } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Webinars & Training | IT Origin",
  description: "Join live cybersecurity webinars and access on-demand training from IT Origin's security experts. Learn threat detection, incident response, and more.",
  keywords: [
    "cybersecurity webinars",
    "security training",
    "online security courses",
    "threat detection training",
    "incident response webinar",
    "security education"
  ],
  alternates: {
    canonical: "https://itorigin.com/webinars"
  }
};

interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  time: string;
  duration: string;
  topics: string[];
  type: "upcoming" | "on-demand";
  registrationUrl?: string;
  watchUrl?: string;
  attendees?: number;
}

const webinars: Webinar[] = [
  {
    id: "threat-hunting-2025",
    title: "Advanced Threat Hunting Techniques for 2025",
    description: "Learn cutting-edge threat hunting methodologies used by our SOC analysts. Includes live demos with real-world scenarios and hands-on exercises.",
    speaker: "Amit Sharma",
    speakerTitle: "Head of Threat Intelligence",
    date: "February 15, 2025",
    time: "11:00 AM IST",
    duration: "90 minutes",
    topics: ["Threat Hunting", "SOC", "Detection Engineering"],
    type: "upcoming",
    registrationUrl: "/contact?event=threat-hunting-2025"
  },
  {
    id: "cloud-security-aws",
    title: "Securing AWS Workloads: Best Practices",
    description: "Deep dive into AWS security controls, configuration best practices, and common misconfigurations that lead to breaches.",
    speaker: "Priya Patel",
    speakerTitle: "Cloud Security Architect",
    date: "February 22, 2025",
    time: "3:00 PM IST",
    duration: "60 minutes",
    topics: ["AWS", "Cloud Security", "Configuration"],
    type: "upcoming",
    registrationUrl: "/contact?event=cloud-security-aws"
  },
  {
    id: "incident-response-playbook",
    title: "Building Effective Incident Response Playbooks",
    description: "How to create, test, and maintain incident response playbooks that actually work under pressure. Includes templates and examples.",
    speaker: "Rahul Verma",
    speakerTitle: "Incident Response Lead",
    date: "March 5, 2025",
    time: "11:00 AM IST",
    duration: "75 minutes",
    topics: ["Incident Response", "Playbooks", "SOC"],
    type: "upcoming",
    registrationUrl: "/contact?event=ir-playbook"
  },
  {
    id: "ransomware-defense",
    title: "Ransomware Defense: Prevention to Recovery",
    description: "Comprehensive look at ransomware prevention, detection, and recovery strategies. Includes lessons learned from real incidents.",
    speaker: "Vikram Singh",
    speakerTitle: "Security Operations Manager",
    date: "January 18, 2025",
    time: "Recorded",
    duration: "80 minutes",
    topics: ["Ransomware", "Incident Response", "Prevention"],
    type: "on-demand",
    watchUrl: "/contact?watch=ransomware-defense",
    attendees: 1250
  },
  {
    id: "soc-automation",
    title: "SOC Automation: From Manual to Automated Response",
    description: "Learn how to implement SOAR and automation in your security operations to improve efficiency and reduce response times.",
    speaker: "Ananya Reddy",
    speakerTitle: "Security Automation Engineer",
    date: "December 12, 2024",
    time: "Recorded",
    duration: "65 minutes",
    topics: ["SOAR", "Automation", "SOC"],
    type: "on-demand",
    watchUrl: "/contact?watch=soc-automation",
    attendees: 890
  },
  {
    id: "zero-trust-network",
    title: "Implementing Zero Trust Network Architecture",
    description: "Practical guide to implementing Zero Trust in your organization. Covers identity, network, and application pillars.",
    speaker: "Karthik Nair",
    speakerTitle: "Security Architect",
    date: "November 28, 2024",
    time: "Recorded",
    duration: "70 minutes",
    topics: ["Zero Trust", "Network Security", "Architecture"],
    type: "on-demand",
    watchUrl: "/contact?watch=zero-trust",
    attendees: 1100
  },
  {
    id: "compliance-automation",
    title: "Automating Compliance: ISO 27001 & SOC 2",
    description: "How to use automation to streamline compliance processes and maintain continuous compliance with major frameworks.",
    speaker: "Neha Gupta",
    speakerTitle: "GRC Consultant",
    date: "October 15, 2024",
    time: "Recorded",
    duration: "55 minutes",
    topics: ["Compliance", "ISO 27001", "SOC 2"],
    type: "on-demand",
    watchUrl: "/contact?watch=compliance-automation",
    attendees: 750
  },
  {
    id: "api-security",
    title: "API Security: Protecting Your Digital Assets",
    description: "Common API vulnerabilities, testing techniques, and best practices for securing APIs in modern applications.",
    speaker: "Arjun Mehta",
    speakerTitle: "Application Security Lead",
    date: "September 20, 2024",
    time: "Recorded",
    duration: "60 minutes",
    topics: ["API Security", "Application Security", "Testing"],
    type: "on-demand",
    watchUrl: "/contact?watch=api-security",
    attendees: 920
  }
];

export default function WebinarsPage() {
  const upcomingWebinars = webinars.filter(w => w.type === "upcoming");
  const onDemandWebinars = webinars.filter(w => w.type === "on-demand");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Video", text: "Learning" }}
        title="Webinars &"
        highlight="Training"
        description="Learn from our security experts through live webinars and on-demand training sessions. Practical knowledge you can apply immediately."
      />

      {/* Upcoming Webinars */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Upcoming Webinars"
            description="Register now for our upcoming live sessions."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {upcomingWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="p-6 rounded-2xl border border-primary/50 bg-primary/5"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        Live
                      </span>
                      {webinar.topics.map((topic) => (
                        <span key={topic} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{webinar.speaker}</p>
                        <p className="text-xs text-muted-foreground">{webinar.speakerTitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{webinar.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        <span>{webinar.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Link
                      href={webinar.registrationUrl || "/contact"}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* On-Demand Library */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="On-Demand Library"
            description="Watch recorded sessions at your own pace."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {onDemandWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    On-Demand
                  </span>
                  {webinar.attendees && (
                    <span className="text-xs text-muted-foreground">
                      {webinar.attendees.toLocaleString()} views
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {webinar.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{webinar.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{webinar.speaker}</p>
                    <p className="text-xs text-muted-foreground">{webinar.speakerTitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Video className="w-4 h-4" />
                    <span>{webinar.duration}</span>
                  </div>
                  <Link
                    href={webinar.watchUrl || "/contact"}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Topics */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Browse by Topic"
            description="Find webinars on specific security topics."
          />

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Threat Hunting",
              "Incident Response",
              "Cloud Security",
              "SOC Operations",
              "Compliance",
              "Zero Trust",
              "Ransomware",
              "API Security",
              "Automation",
              "GRC",
              "Penetration Testing",
              "Application Security"
            ].map((topic) => (
              <Link
                key={topic}
                href={`/webinars?topic=${encodeURIComponent(topic)}`}
                className="px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Custom Training */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Need Custom Training?</h2>
            <p className="text-muted-foreground mb-8">
              We offer customized training programs tailored to your organization&apos;s specific needs, technologies, and security challenges.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-2">Team Training</h3>
                <p className="text-sm text-muted-foreground">Private sessions for your security team</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-2">Executive Briefings</h3>
                <p className="text-sm text-muted-foreground">Security awareness for leadership</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-bold mb-2">Certification Prep</h3>
                <p className="text-sm text-muted-foreground">Prepare for security certifications</p>
              </div>
            </div>
            <Link
              href="/contact?training=custom"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Request Custom Training
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Never Miss a Webinar
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to receive notifications about upcoming webinars and new on-demand content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?subscribe=webinars"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/training"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Training Programs
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
