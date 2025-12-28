import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Shield, TrendingUp, Clock, Users, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Case Studies | Cybersecurity Success Stories | IT Origin",
  description: "Explore how IT Origin has helped organizations improve their security posture, achieve compliance, and protect against cyber threats.",
  keywords: [
    "cybersecurity case studies",
    "security success stories",
    "SOC case study",
    "penetration testing results",
    "compliance success",
    "security transformation"
  ],
  openGraph: {
    title: "Case Studies | Cybersecurity Success Stories | IT Origin",
    description: "See how we've helped organizations strengthen their cybersecurity and achieve their security goals.",
    type: "website",
    url: "https://itorigin.com/case-studies",
  },
  alternates: {
    canonical: "https://itorigin.com/case-studies"
  }
};

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  services: string[];
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "fintech-soc",
    title: "24/7 SOC Implementation for Leading Fintech",
    client: "Major Fintech Company",
    industry: "Financial Services",
    challenge: "Rapid growth led to increased security threats with no dedicated security team to handle monitoring and incident response.",
    solution: "Implemented our Managed SOC service with 24/7 monitoring, custom detection rules, and integrated threat intelligence.",
    results: [
      "99.9% uptime maintained across critical systems",
      "Mean time to detect reduced from hours to minutes",
      "Zero security breaches since implementation",
      "Achieved PCI-DSS compliance"
    ],
    metrics: [
      { label: "Detection Time", value: "<3 min" },
      { label: "Incidents Handled", value: "500+/mo" },
      { label: "Cost Savings", value: "60%" }
    ],
    services: ["Managed SOC", "Threat Intelligence", "Compliance"],
    featured: true
  },
  {
    id: "healthcare-compliance",
    title: "HIPAA Compliance Transformation for Healthcare Network",
    client: "Regional Healthcare Provider",
    industry: "Healthcare",
    challenge: "Multiple security gaps identified in audit, risking patient data and regulatory penalties.",
    solution: "Comprehensive GRC program including gap assessment, policy development, control implementation, and staff training.",
    results: [
      "Achieved full HIPAA compliance within 6 months",
      "Remediated 150+ security findings",
      "Implemented security awareness training for 2,000+ staff",
      "Established ongoing compliance monitoring"
    ],
    metrics: [
      { label: "Compliance Score", value: "98%" },
      { label: "Findings Fixed", value: "150+" },
      { label: "Staff Trained", value: "2,000+" }
    ],
    services: ["GRC Consulting", "Security Audit", "Training"],
    featured: true
  },
  {
    id: "ecommerce-pentest",
    title: "Critical Vulnerability Discovery for E-commerce Platform",
    client: "Global E-commerce Retailer",
    industry: "Retail",
    challenge: "Pre-launch security validation required for new payment processing platform handling millions in transactions.",
    solution: "Comprehensive penetration testing covering web application, APIs, mobile apps, and infrastructure.",
    results: [
      "Discovered and remediated 12 critical vulnerabilities",
      "Prevented potential data breach affecting millions of customers",
      "Secured platform before holiday shopping season launch",
      "Achieved PCI-DSS certification"
    ],
    metrics: [
      { label: "Critical Vulns Found", value: "12" },
      { label: "Time to Remediate", value: "3 weeks" },
      { label: "Customer Data Protected", value: "5M+" }
    ],
    services: ["Penetration Testing", "Vulnerability Assessment", "PCI-DSS"],
    featured: true
  },
  {
    id: "manufacturing-security",
    title: "Industrial Security Program for Manufacturing Giant",
    client: "Fortune 500 Manufacturer",
    industry: "Manufacturing",
    challenge: "Legacy OT systems with minimal security controls posed risk to production and supply chain.",
    solution: "OT/IT security assessment, network segmentation, and implementation of monitoring for industrial control systems.",
    results: [
      "Secured 50+ production facilities across 3 continents",
      "Implemented network segmentation between IT and OT",
      "Deployed monitoring for industrial control systems",
      "Reduced attack surface by 75%"
    ],
    metrics: [
      { label: "Facilities Secured", value: "50+" },
      { label: "Attack Surface Reduction", value: "75%" },
      { label: "Downtime Prevented", value: "$10M+" }
    ],
    services: ["OT Security", "Network Security", "SOC"],
    featured: false
  },
  {
    id: "saas-iso27001",
    title: "ISO 27001 Certification for SaaS Startup",
    client: "B2B SaaS Platform",
    industry: "Technology",
    challenge: "Enterprise customers required ISO 27001 certification before signing contracts.",
    solution: "End-to-end ISO 27001 implementation including gap assessment, ISMS development, control implementation, and audit support.",
    results: [
      "Achieved ISO 27001 certification in 4 months",
      "Unlocked $2M+ in enterprise deals",
      "Established security-first culture",
      "Built scalable security program"
    ],
    metrics: [
      { label: "Time to Certification", value: "4 months" },
      { label: "Deals Unlocked", value: "$2M+" },
      { label: "Audit Findings", value: "0 major" }
    ],
    services: ["ISO 27001", "Security Program", "Audit Support"],
    featured: false
  },
  {
    id: "bank-red-team",
    title: "Red Team Engagement for Major Bank",
    client: "Top 20 Bank",
    industry: "Banking",
    challenge: "Board required validation of security controls through realistic adversary simulation.",
    solution: "Full-scope red team engagement simulating advanced persistent threat including social engineering and physical access attempts.",
    results: [
      "Identified gaps in physical security controls",
      "Tested incident response capabilities",
      "Validated SOC detection capabilities",
      "Provided strategic security roadmap"
    ],
    metrics: [
      { label: "Attack Vectors Tested", value: "15+" },
      { label: "Controls Validated", value: "200+" },
      { label: "SOC Detection Rate", value: "85%" }
    ],
    services: ["Red Team", "Social Engineering", "Physical Security"],
    featured: false
  }
];

export default function CaseStudiesPage() {
  const featuredCaseStudies = caseStudies.filter(cs => cs.featured);
  const otherCaseStudies = caseStudies.filter(cs => !cs.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Award", text: "Client Success" }}
        title="Real Results for"
        highlight="Real Challenges"
        description="Explore how we've helped organizations across industries strengthen their security posture, achieve compliance, and protect against evolving cyber threats."
      />

      {/* Stats */}
      <section className="py-12 -mt-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Industries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">$50M+</div>
              <div className="text-sm text-muted-foreground">Breaches Prevented</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Featured Case Studies"
            description="In-depth looks at how we've solved complex security challenges."
          />

          <div className="space-y-12">
            {featuredCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className="p-8 rounded-2xl border border-border bg-card"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {study.industry}
                  </span>
                  {study.services.map((service) => (
                    <span key={service} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                      {service}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black mb-2">{study.title}</h3>
                <p className="text-muted-foreground mb-6">{study.client}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Challenge
                    </h4>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Solution
                    </h4>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-black text-primary">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Results */}
                <div>
                  <h4 className="font-semibold mb-3">Key Results</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* More Case Studies */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="More Success Stories"
            description="Additional examples of how we've helped organizations achieve their security goals."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCaseStudies.map((study) => (
              <div
                key={study.id}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {study.industry}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{study.challenge}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {study.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-lg font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {study.services.map((service) => (
                    <span key={service} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Industries We Serve"
            description="Deep expertise across sectors with unique security requirements."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Financial Services",
              "Healthcare",
              "Technology",
              "Manufacturing",
              "Retail",
              "Government",
              "Energy",
              "Education",
              "Legal",
              "Telecommunications",
              "Insurance",
              "Non-Profit"
            ].map((industry) => (
              <div
                key={industry}
                className="p-4 rounded-lg border border-border bg-card text-center hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Let&apos;s discuss how we can help you achieve your security and compliance goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/managed-soc-services"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
