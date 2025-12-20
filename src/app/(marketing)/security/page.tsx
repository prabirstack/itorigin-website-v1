import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Eye, Server, FileCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Security Center | Trust & Security | IT Origin",
  description: "Learn about IT Origin's security practices, certifications, and commitment to protecting your data. View our compliance status and security documentation.",
  keywords: [
    "IT Origin security",
    "security certifications",
    "data protection",
    "compliance",
    "trust center",
    "security practices"
  ],
  alternates: {
    canonical: "https://itorigin.com/security"
  }
};

const certifications = [
  {
    name: "ISO 27001:2022",
    description: "Information Security Management System",
    status: "Certified",
    date: "Valid through December 2026"
  },
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control",
    status: "Certified",
    date: "Audit completed October 2024"
  },
  {
    name: "GDPR",
    description: "General Data Protection Regulation",
    status: "Compliant",
    date: "Continuously maintained"
  },
  {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    status: "Compliant",
    date: "BAA available upon request"
  },
  {
    name: "PCI-DSS",
    description: "Payment Card Industry Data Security Standard",
    status: "Compliant",
    date: "Level 1 Service Provider"
  },
  {
    name: "CSA STAR",
    description: "Cloud Security Alliance STAR Registry",
    status: "Registered",
    date: "Level 1 Self-Assessment"
  }
];

const securityPractices = [
  {
    icon: Lock,
    title: "Encryption",
    items: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for all data in transit",
      "Hardware Security Modules for key management",
      "Customer-managed encryption keys (BYOK) available"
    ]
  },
  {
    icon: Eye,
    title: "Access Control",
    items: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication enforced",
      "Single Sign-On (SSO) with SAML/OIDC",
      "Least privilege access principles"
    ]
  },
  {
    icon: Shield,
    title: "Infrastructure Security",
    items: [
      "SOC 2 certified cloud providers",
      "Network segmentation and isolation",
      "Regular vulnerability scanning",
      "Automated patch management"
    ]
  },
  {
    icon: Server,
    title: "Data Protection",
    items: [
      "Geographic data residency options",
      "Automated daily backups",
      "Point-in-time recovery",
      "Data retention controls"
    ]
  }
];

export default function SecurityCenterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "Security Center" }}
        title="Trust &"
        highlight="Security"
        description="Security is at the core of everything we do. Learn about our comprehensive security practices, certifications, and commitment to protecting your data."
      />

      {/* Status Banner */}
      <section className="py-8 -mt-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-400">All Systems Operational</p>
                  <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
                </div>
              </div>
              <Link
                href="https://status.itorigin.com"
                className="text-primary hover:underline text-sm font-medium"
              >
                View Status Page →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Certifications & Compliance"
            description="Third-party validated security controls and regulatory compliance."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
                    {cert.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{cert.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{cert.description}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Request compliance documentation →
            </Link>
          </div>
        </Container>
      </section>

      {/* Security Practices */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Security Practices"
            description="How we protect your data and maintain the security of our platform."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {securityPractices.map((practice) => {
              const Icon = practice.icon;
              return (
                <div key={practice.title} className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{practice.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {practice.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Vulnerability Disclosure */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">Responsible Disclosure</h2>
            <p className="text-muted-foreground mb-8">
              We appreciate the security research community&apos;s efforts in helping us maintain the security of our platform. If you discover a vulnerability, please report it responsibly.
            </p>
            <div className="p-6 rounded-xl border border-border bg-card text-left">
              <h3 className="font-bold mb-4">Report a Vulnerability</h3>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• Email: security@itorigin.com</li>
                <li>• PGP Key: Available upon request</li>
                <li>• Response time: Within 48 hours</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                We commit to working with researchers to understand and resolve issues quickly, and we will not pursue legal action against good-faith security research.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Security Documentation */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Security Documentation"
            description="Resources for security teams and compliance officers."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Security Whitepaper", description: "Detailed overview of our security architecture and practices", href: "/whitepapers" },
              { title: "Security Policy", description: "Our comprehensive security policy document", href: "/security-policy" },
              { title: "Privacy Policy", description: "How we collect, use, and protect your data", href: "/privacy" },
              { title: "Terms of Service", description: "Legal terms governing use of our services", href: "/terms" },
              { title: "SLA", description: "Service level commitments and guarantees", href: "/sla" },
              { title: "GDPR Info", description: "GDPR compliance and data protection rights", href: "/gdpr" }
            ].map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors group"
              >
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Have Security Questions?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our security team is available to answer questions about our security practices, provide compliance documentation, or discuss your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Security Team
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/security-policy"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Security Policy
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
