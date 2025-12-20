import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Download, Calendar, Clock, Tag } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Whitepapers & Research | IT Origin",
  description: "Download free cybersecurity whitepapers, research reports, and industry guides from IT Origin's security experts.",
  keywords: [
    "cybersecurity whitepapers",
    "security research",
    "threat reports",
    "security guides",
    "industry reports",
    "security resources"
  ],
  alternates: {
    canonical: "https://itorigin.com/whitepapers"
  }
};

interface Whitepaper {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  readTime: string;
  publishDate: string;
  featured: boolean;
  topics: string[];
}

const whitepapers: Whitepaper[] = [
  {
    id: "state-of-soc-2025",
    title: "The State of Security Operations 2025",
    description: "Comprehensive analysis of SOC trends, challenges, and best practices based on data from 500+ organizations. Includes benchmarks for detection time, alert volume, and team efficiency.",
    category: "Industry Report",
    pages: 45,
    readTime: "30 min read",
    publishDate: "January 2025",
    featured: true,
    topics: ["SOC", "Threat Detection", "Benchmarks"]
  },
  {
    id: "ransomware-defense-guide",
    title: "The Complete Guide to Ransomware Defense",
    description: "A practical guide to preventing, detecting, and responding to ransomware attacks. Includes technical controls, process improvements, and recovery strategies.",
    category: "Security Guide",
    pages: 32,
    readTime: "25 min read",
    publishDate: "December 2024",
    featured: true,
    topics: ["Ransomware", "Incident Response", "Prevention"]
  },
  {
    id: "cloud-security-maturity",
    title: "Cloud Security Maturity Model",
    description: "Framework for assessing and improving cloud security across AWS, Azure, and GCP. Includes maturity levels, control objectives, and implementation guidance.",
    category: "Framework",
    pages: 38,
    readTime: "28 min read",
    publishDate: "November 2024",
    featured: true,
    topics: ["Cloud Security", "AWS", "Azure", "GCP"]
  },
  {
    id: "zero-trust-implementation",
    title: "Implementing Zero Trust Architecture",
    description: "Step-by-step guide to implementing Zero Trust in enterprise environments. Covers identity, network, application, and data pillars.",
    category: "Implementation Guide",
    pages: 28,
    readTime: "20 min read",
    publishDate: "October 2024",
    featured: false,
    topics: ["Zero Trust", "Identity", "Network Security"]
  },
  {
    id: "ai-ml-security",
    title: "AI & ML in Cybersecurity: Opportunities and Risks",
    description: "Analysis of how AI and machine learning are transforming security operations, along with new attack vectors targeting AI systems.",
    category: "Research",
    pages: 24,
    readTime: "18 min read",
    publishDate: "September 2024",
    featured: false,
    topics: ["AI", "Machine Learning", "Threat Detection"]
  },
  {
    id: "compliance-automation",
    title: "Automating Security Compliance",
    description: "How to use automation to streamline compliance with ISO 27001, SOC 2, PCI-DSS, and other frameworks. Reduce audit burden and maintain continuous compliance.",
    category: "Best Practices",
    pages: 22,
    readTime: "15 min read",
    publishDate: "August 2024",
    featured: false,
    topics: ["Compliance", "Automation", "GRC"]
  },
  {
    id: "threat-hunting-playbook",
    title: "Threat Hunting Playbook",
    description: "Practical techniques for proactive threat hunting. Includes hunt hypotheses, data sources, and step-by-step procedures for common threat scenarios.",
    category: "Playbook",
    pages: 35,
    readTime: "25 min read",
    publishDate: "July 2024",
    featured: false,
    topics: ["Threat Hunting", "SOC", "Detection"]
  },
  {
    id: "supply-chain-security",
    title: "Securing the Software Supply Chain",
    description: "Comprehensive guide to identifying and mitigating supply chain risks. Covers vendor assessment, SBOM, and secure development practices.",
    category: "Security Guide",
    pages: 26,
    readTime: "20 min read",
    publishDate: "June 2024",
    featured: false,
    topics: ["Supply Chain", "DevSecOps", "Risk Management"]
  }
];

export default function WhitepapersPage() {
  const featuredWhitepapers = whitepapers.filter(wp => wp.featured);
  const otherWhitepapers = whitepapers.filter(wp => !wp.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "FileText", text: "Resources" }}
        title="Whitepapers &"
        highlight="Research"
        description="In-depth research, industry reports, and practical guides from our security experts. Download free resources to enhance your security knowledge."
      />

      {/* Featured Whitepapers */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Featured Resources"
            description="Our most popular and impactful publications."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {featuredWhitepapers.map((paper) => (
              <div
                key={paper.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {paper.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{paper.pages} pages</span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {paper.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{paper.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{paper.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{paper.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/contact?download=${paper.id}`}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Free
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Whitepapers */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="All Resources"
            description="Browse our complete library of security publications."
          />

          <div className="space-y-4 max-w-4xl mx-auto">
            {otherWhitepapers.map((paper) => (
              <div
                key={paper.id}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                      {paper.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{paper.publishDate}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{paper.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{paper.pages} pages</span>
                    <span>{paper.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/contact?download=${paper.id}`}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Browse by Category"
            description="Find resources by topic area."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Industry Reports", "Security Guides", "Frameworks", "Best Practices", "Research", "Playbooks", "Compliance", "Technical"].map((category) => (
              <Link
                key={category}
                href={`/whitepapers?category=${encodeURIComponent(category)}`}
                className="p-4 rounded-xl border border-border bg-card text-center hover:border-primary transition-colors"
              >
                <span className="font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Get New Research First
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to be notified when we publish new whitepapers, reports, and security research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?subscribe=research"
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
