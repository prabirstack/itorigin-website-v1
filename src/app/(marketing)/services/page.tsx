import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Target, FileCheck, Search, Lock, Users } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Cybersecurity Services | IT Origin",
  description: "Comprehensive cybersecurity services including Managed SOC, Offensive Security, Penetration Testing, Vulnerability Assessment, GRC Services, and Security Auditing.",
  keywords: [
    "cybersecurity services",
    "managed SOC",
    "penetration testing",
    "vulnerability assessment",
    "GRC services",
    "security audit",
    "offensive security",
    "IT Origin services"
  ],
  alternates: {
    canonical: "https://itorigin.com/services"
  }
};

const services = [
  {
    icon: Shield,
    title: "Managed SOC Services",
    description: "24/7 security operations center with advanced threat detection, real-time monitoring, and rapid incident response capabilities to protect your organization around the clock.",
    href: "/services/managed-soc-services",
    features: ["24/7 Monitoring", "Threat Detection", "Incident Response", "SIEM Management"]
  },
  {
    icon: Target,
    title: "Offensive Security",
    description: "Proactive security testing through red team operations, adversary simulation, and advanced attack techniques to identify vulnerabilities before malicious actors do.",
    href: "/services/offensive-security",
    features: ["Red Team Operations", "Adversary Simulation", "Social Engineering", "Physical Security"]
  },
  {
    icon: Search,
    title: "Penetration Testing",
    description: "Comprehensive security assessments of your web applications, networks, APIs, and cloud infrastructure by OSCP-certified ethical hackers.",
    href: "/services/penetration-testing",
    features: ["Web App Testing", "Network Testing", "API Security", "Cloud Security"]
  },
  {
    icon: Lock,
    title: "Vulnerability Assessment",
    description: "Systematic identification and prioritization of security weaknesses across your infrastructure with actionable remediation guidance.",
    href: "/services/vulnerability-assessment",
    features: ["Asset Discovery", "Risk Scoring", "Continuous Scanning", "Compliance Reporting"]
  },
  {
    icon: Users,
    title: "GRC Services",
    description: "Expert governance, risk management, and compliance consulting to help you meet regulatory requirements and implement security frameworks.",
    href: "/services/grc-services",
    features: ["ISO 27001", "SOC 2", "GDPR", "Risk Assessment"]
  },
  {
    icon: FileCheck,
    title: "Security Auditing",
    description: "Thorough security audits and assessments to evaluate your security posture, identify gaps, and ensure compliance with industry standards.",
    href: "/services/security-audit",
    features: ["Gap Analysis", "Policy Review", "Control Assessment", "Certification Support"]
  }
];

const industries = [
  "Financial Services",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Retail & E-commerce",
  "Government",
  "Energy & Utilities",
  "Education"
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "Our Services" }}
        title="Comprehensive"
        highlight="Cybersecurity Solutions"
        description="From 24/7 threat monitoring to compliance consulting, we provide end-to-end security services to protect your organization against evolving cyber threats."
      />

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Security Services"
            description="Choose from our comprehensive range of cybersecurity services designed to protect, detect, and respond to threats."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-accent rounded text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Why Choose IT Origin"
            description="Partner with a trusted cybersecurity provider that delivers measurable results."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "500+", label: "Clients Protected" },
              { value: "99.9%", label: "Client Retention" },
              { value: "24/7", label: "Support Available" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="Industries We Serve"
            description="Tailored security solutions for organizations across diverse sectors."
          />

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <div
                key={industry}
                className="px-6 py-3 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors cursor-default"
              >
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Strengthen Your Security?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get a free consultation with our security experts to discuss your organization&apos;s needs and discover the right solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
