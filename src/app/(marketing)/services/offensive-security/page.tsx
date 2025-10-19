import { Metadata } from "next";
import Link from "next/link";
import { Search, AlertTriangle, Code, Database, Shield, Target, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCard } from "@/components/services/pricing-card";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "Offensive Security Services | Penetration Testing & Red Team | IT Origin",
  description: "Identify vulnerabilities before attackers do with IT Origin's offensive security services. Expert penetration testing, vulnerability assessments, and red team operations by certified ethical hackers.",
  keywords: [
    "offensive security",
    "penetration testing",
    "ethical hacking",
    "vulnerability assessment",
    "red team operations",
    "security testing",
    "pen testing services",
    "application security testing",
    "network penetration testing",
    "web app security",
    "OSCP certified"
  ],
  openGraph: {
    title: "Offensive Security Services | Penetration Testing & Red Team | IT Origin",
    description: "Identify vulnerabilities before attackers do. Expert penetration testing and red team operations by certified ethical hackers.",
    type: "website",
    url: "https://itorigin.com/services/offensive-security",
    images: [
      {
        url: "/images/og-offensive-security.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Offensive Security Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Offensive Security Services | Penetration Testing & Red Team",
    description: "Identify vulnerabilities before attackers do with expert penetration testing services.",
    images: ["/images/og-offensive-security.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/services/offensive-security"
  }
};

export default function OffensiveSecurityPage() {
  const stats = [
    { label: "Vulnerabilities Found", value: "5,000+", icon: "Search" as const },
    { label: "Critical Issues Identified", value: "800+", icon: "AlertTriangle" as const },
    { label: "Applications Tested", value: "250+", icon: "Code" as const },
    { label: "Networks Assessed", value: "150+", icon: "Database" as const },
  ];

  const serviceFeatures = [
    {
      title: "Penetration Testing",
      features: [
        "Web application penetration testing (OWASP Top 10)",
        "Mobile application security testing (iOS & Android)",
        "Network infrastructure penetration testing",
        "API security testing and validation",
        "Wireless network security assessment",
        "Cloud infrastructure security testing (AWS, Azure, GCP)"
      ]
    },
    {
      title: "Vulnerability Assessment",
      features: [
        "Comprehensive vulnerability scanning",
        "Configuration review and hardening",
        "Patch management assessment",
        "Security baseline validation",
        "Third-party component analysis",
        "Vulnerability prioritization and remediation guidance"
      ]
    },
    {
      title: "Red Team Operations",
      features: [
        "Advanced persistent threat (APT) simulation",
        "Social engineering and phishing campaigns",
        "Physical security testing",
        "Purple team exercises",
        "Adversary emulation scenarios",
        "Security awareness training validation"
      ]
    }
  ];

  const benefits = [
    {
      icon: "Search" as const,
      title: "Find Vulnerabilities First",
      description: "Discover security weaknesses before malicious actors can exploit them, reducing your attack surface."
    },
    {
      icon: "Shield" as const,
      title: "Certified Experts",
      description: "Our team holds OSCP, CEH, GPEN, and other industry-leading security certifications."
    },
    {
      icon: "Target" as const,
      title: "Real-World Attack Scenarios",
      description: "We simulate actual attack techniques used by cybercriminals to test your defenses."
    },
    {
      icon: "FileText" as const,
      title: "Detailed Reporting",
      description: "Comprehensive reports with executive summaries, technical details, and actionable remediation steps."
    },
    {
      icon: "Code" as const,
      title: "Latest Testing Tools",
      description: "We use cutting-edge security testing tools and custom exploits to thoroughly assess your systems."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Compliance Support",
      description: "Meet regulatory requirements for penetration testing (PCI-DSS, HIPAA, ISO 27001)."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Scoping & Planning",
      description: "We work with your team to define testing scope, objectives, and rules of engagement. Identify critical systems, set testing windows, and establish communication protocols to ensure minimal business disruption."
    },
    {
      step: 2,
      title: "Reconnaissance & Discovery",
      description: "Gather intelligence about your systems using both passive and active techniques. Map attack surface, identify potential entry points, and document the technology stack to plan targeted testing strategies."
    },
    {
      step: 3,
      title: "Exploitation & Testing",
      description: "Attempt to exploit identified vulnerabilities using manual testing and automated tools. Test authentication mechanisms, injection flaws, business logic errors, and privilege escalation paths to determine real-world impact."
    },
    {
      step: 4,
      title: "Reporting & Remediation",
      description: "Deliver comprehensive reports with findings, risk ratings, proof-of-concept exploits, and detailed remediation guidance. Provide retesting services to verify that security issues have been properly addressed."
    }
  ];

  const pricingPlans = [
    {
      name: "Web Application Test",
      description: "Single web application assessment",
      price: "$4,999",
      features: [
        "OWASP Top 10 coverage",
        "Manual + automated testing",
        "Up to 3 user roles tested",
        "Authentication testing",
        "Business logic review",
        "Detailed vulnerability report",
        "1 round of retesting included"
      ]
    },
    {
      name: "Comprehensive Assessment",
      description: "Full infrastructure and application testing",
      price: "$12,999",
      features: [
        "Everything in Web Application Test",
        "Network penetration testing",
        "Up to 5 applications tested",
        "API security testing",
        "Wireless assessment",
        "Social engineering test",
        "Executive presentation",
        "Unlimited retesting for 30 days"
      ],
      highlighted: true
    },
    {
      name: "Red Team Engagement",
      description: "Advanced adversary simulation",
      price: "Custom",
      features: [
        "Full adversary emulation",
        "Multi-vector attack simulation",
        "Physical security testing",
        "Custom attack scenarios",
        "Dedicated red team",
        "Real-time purple team collaboration",
        "Strategic recommendations",
        "Ongoing support and retesting"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Target", text: "Offensive Security" }}
        title="Think Like an Attacker"
        highlight="Defend Like a Pro"
        description="Proactively identify and fix security vulnerabilities before malicious actors can exploit them. Our certified ethical hackers use the same techniques as real attackers to test your defenses and strengthen your security posture."
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Schedule Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Service Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Comprehensive Security Testing"
            description="Our offensive security services cover all aspects of your digital infrastructure to ensure complete protection."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <ServiceFeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Our Offensive Security Services"
            description="Partner with experienced security professionals who understand both attack and defense."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testing Methodology Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Testing Methodology"
            description="A proven approach that delivers actionable insights and measurable security improvements."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Compliance & Standards
            </h2>
            <p className="text-lg text-muted-foreground">
              Our testing methodology aligns with industry standards and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "PCI-DSS", description: "Payment Card Industry compliance testing" },
              { name: "OWASP", description: "Top 10 vulnerabilities assessment" },
              { name: "NIST", description: "Cybersecurity Framework alignment" },
              { name: "ISO 27001", description: "Information security standards" }
            ].map((standard, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-border bg-card text-center"
              >
                <div className="text-2xl font-black text-primary mb-2">
                  {standard.name}
                </div>
                <p className="text-sm text-muted-foreground">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Transparent Pricing"
            description="Choose the testing scope that matches your security needs and budget."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All engagements include a detailed report, remediation guidance, and post-test consultation.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Need a custom testing scope? Contact us for a quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Test Your Defenses?"
        description="Schedule a penetration test today and discover vulnerabilities before attackers do."
        buttons={[
          { text: "Get Started", href: "/contact" },
          { text: "View GRC Services", href: "/services/grc-services", variant: "secondary" }
        ]}
      />
    </div>
  );
}
