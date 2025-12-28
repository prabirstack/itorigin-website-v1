import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { BenefitCard } from "@/components/services/benefit-card";

export const metadata: Metadata = {
  title: "Careers at IT Origin | Join Our Cybersecurity Team",
  description: "Join IT Origin's team of cybersecurity experts. Explore exciting career opportunities in security operations, penetration testing, GRC, and more.",
  keywords: [
    "cybersecurity jobs",
    "security analyst jobs",
    "penetration tester jobs",
    "SOC analyst careers",
    "cybersecurity careers",
    "IT security jobs",
    "infosec careers"
  ],
  openGraph: {
    title: "Careers at IT Origin | Join Our Cybersecurity Team",
    description: "Build your career in cybersecurity. Join our team of experts protecting organizations worldwide.",
    type: "website",
    url: "https://itorigin.com/careers",
  },
  alternates: {
    canonical: "https://itorigin.com/careers"
  }
};

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

const jobListings: JobListing[] = [
  {
    id: "soc-analyst-sr",
    title: "Senior SOC Analyst",
    department: "Security Operations",
    location: "Mumbai, India (Hybrid)",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead threat detection and incident response activities in our 24/7 Security Operations Center."
  },
  {
    id: "pen-tester",
    title: "Penetration Tester",
    department: "Offensive Security",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Conduct web application, network, and infrastructure penetration testing for enterprise clients."
  },
  {
    id: "grc-consultant",
    title: "GRC Consultant",
    department: "Governance, Risk & Compliance",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "4+ years",
    description: "Help clients achieve and maintain compliance with ISO 27001, SOC 2, and other frameworks."
  },
  {
    id: "threat-intel-analyst",
    title: "Threat Intelligence Analyst",
    department: "Security Operations",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Research and analyze emerging threats, produce intelligence reports, and support SOC operations."
  },
  {
    id: "security-engineer",
    title: "Security Engineer",
    department: "Engineering",
    location: "Mumbai, India (Hybrid)",
    type: "Full-time",
    experience: "4+ years",
    description: "Design and implement security solutions, automation, and tooling for our security platform."
  },
  {
    id: "soc-analyst-jr",
    title: "Junior SOC Analyst",
    department: "Security Operations",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "0-2 years",
    description: "Entry-level role for aspiring security analysts. Training and mentorship provided."
  }
];

const benefits = [
  {
    icon: "TrendingUp" as const,
    title: "Career Growth",
    description: "Clear career paths with opportunities to advance into senior and leadership roles."
  },
  {
    icon: "BookOpen" as const,
    title: "Learning & Development",
    description: "Certification sponsorship, training programs, and conference attendance support."
  },
  {
    icon: "Heart" as const,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs."
  },
  {
    icon: "Home" as const,
    title: "Flexible Work",
    description: "Remote and hybrid work options with flexible hours to maintain work-life balance."
  },
  {
    icon: "Users" as const,
    title: "Great Team",
    description: "Work alongside passionate security professionals in a collaborative environment."
  },
  {
    icon: "Gift" as const,
    title: "Competitive Package",
    description: "Market-leading compensation with performance bonuses and stock options."
  }
];

const values = [
  {
    title: "Security First",
    description: "We practice what we preach. Security is embedded in everything we do."
  },
  {
    title: "Continuous Learning",
    description: "The threat landscape evolves constantly. We stay ahead through continuous learning."
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teamwork and knowledge sharing."
  },
  {
    title: "Customer Focus",
    description: "Our clients' security is our top priority. We go above and beyond to protect them."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Users", text: "Join Our Team" }}
        title="Build Your Career in"
        highlight="Cybersecurity"
        description="Join a team of passionate security professionals protecting organizations worldwide. We're always looking for talented individuals who share our mission to make the digital world safer."
      />

      {/* Stats */}
      <section className="py-12 -mt-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Employee Rating</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Open Positions"
            description="Explore our current job openings and find your next opportunity."
          />

          <div className="space-y-4 max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{job.experience}</span>
                    <Link
                      href={`/contact?job=${job.id}`}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      Apply
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Don&apos;t see a role that fits?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Send us your resume
              </Link>
              {" "}and we&apos;ll keep you in mind for future opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Why Work at IT Origin"
            description="We invest in our team's growth, well-being, and success."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Our Values"
            description="The principles that guide how we work and what we stand for."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border bg-card text-center">
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hiring Process */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Our Hiring Process</h2>
              <p className="text-lg text-muted-foreground">
                A transparent process designed to find the best match for both of us.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { step: 1, title: "Application Review", description: "Our team reviews your application and resume. We'll get back to you within 5 business days." },
                { step: 2, title: "Initial Call", description: "A 30-minute call with our recruiting team to discuss your background, experience, and career goals." },
                { step: 3, title: "Technical Assessment", description: "A role-specific assessment to evaluate your technical skills. May include a take-home project or live exercise." },
                { step: 4, title: "Team Interviews", description: "Meet with the hiring manager and potential teammates to discuss the role in depth and assess cultural fit." },
                { step: 5, title: "Offer", description: "If it's a match, we'll extend an offer and work with you to finalize the details." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Take the next step in your cybersecurity career. We&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/team"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
