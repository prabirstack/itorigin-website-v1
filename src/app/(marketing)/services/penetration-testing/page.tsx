import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { ServiceFeatureCard } from "@/components/services/service-feature-card";
import { BenefitCard } from "@/components/services/benefit-card";
import { ProcessStep } from "@/components/services/process-step";
import { PricingCard } from "@/components/services/pricing-card";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "Penetration Testing Services | Ethical Hacking | IT Origin",
  description: "Professional penetration testing services to identify vulnerabilities in your web applications, networks, APIs, and cloud infrastructure. OSCP-certified ethical hackers.",
  keywords: [
    "penetration testing",
    "pen testing",
    "ethical hacking",
    "web application testing",
    "network penetration testing",
    "API security testing",
    "mobile app security",
    "cloud security testing",
    "OSCP certified",
    "security assessment"
  ],
  openGraph: {
    title: "Penetration Testing Services | Ethical Hacking | IT Origin",
    description: "Professional penetration testing by OSCP-certified ethical hackers. Identify vulnerabilities before attackers do.",
    type: "website",
    url: "https://itorigin.com/services/penetration-testing",
  },
  alternates: {
    canonical: "https://itorigin.com/services/penetration-testing"
  }
};

export default function PenetrationTestingPage() {
  const stats = [
    { label: "Penetration Tests Completed", value: "500+", icon: "Target" as const },
    { label: "Critical Vulnerabilities Found", value: "2,500+", icon: "AlertTriangle" as const },
    { label: "Client Satisfaction Rate", value: "99%", icon: "Star" as const },
    { label: "Certified Testers", value: "25+", icon: "Award" as const },
  ];

  const serviceFeatures = [
    {
      title: "Web Application Testing",
      features: [
        "OWASP Top 10 vulnerability assessment",
        "Authentication & session management testing",
        "Input validation and injection testing",
        "Business logic vulnerability analysis",
        "API endpoint security testing",
        "Single Page Application (SPA) testing"
      ]
    },
    {
      title: "Network Penetration Testing",
      features: [
        "External network perimeter testing",
        "Internal network assessment",
        "Firewall and IDS/IPS bypass testing",
        "Active Directory security assessment",
        "Wireless network penetration testing",
        "Network segmentation validation"
      ]
    },
    {
      title: "Cloud & Mobile Testing",
      features: [
        "AWS, Azure, GCP security assessment",
        "Cloud configuration review",
        "iOS application security testing",
        "Android application security testing",
        "Container and Kubernetes testing",
        "Serverless security assessment"
      ]
    }
  ];

  const benefits = [
    {
      icon: "Target" as const,
      title: "Real-World Attack Simulation",
      description: "We use the same techniques and tools as malicious hackers to find vulnerabilities in your systems."
    },
    {
      icon: "Award" as const,
      title: "Certified Professionals",
      description: "Our team holds OSCP, OSCE, GPEN, CEH, and other industry-recognized certifications."
    },
    {
      icon: "FileText" as const,
      title: "Actionable Reports",
      description: "Detailed reports with risk ratings, proof-of-concept exploits, and step-by-step remediation guidance."
    },
    {
      icon: "Shield" as const,
      title: "Safe Testing Methodology",
      description: "Careful testing approach that minimizes risk of service disruption to your business operations."
    },
    {
      icon: "RefreshCcw" as const,
      title: "Free Retesting",
      description: "Verify your fixes with complimentary retesting to ensure vulnerabilities are properly remediated."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Compliance Ready",
      description: "Reports suitable for PCI-DSS, SOC 2, HIPAA, ISO 27001, and other compliance requirements."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Pre-Engagement",
      description: "Define scope, objectives, and testing methodology. Sign NDA and rules of engagement. Coordinate testing windows and emergency contacts to ensure safe, effective testing."
    },
    {
      step: 2,
      title: "Information Gathering",
      description: "Collect intelligence about target systems using OSINT techniques. Map the attack surface, identify technologies, and develop a testing strategy tailored to your environment."
    },
    {
      step: 3,
      title: "Vulnerability Discovery",
      description: "Identify security weaknesses using both automated scanning and manual testing techniques. Focus on finding vulnerabilities that automated tools typically miss."
    },
    {
      step: 4,
      title: "Exploitation",
      description: "Safely exploit discovered vulnerabilities to determine real-world impact. Document proof-of-concept and assess the potential damage an attacker could cause."
    },
    {
      step: 5,
      title: "Reporting & Remediation",
      description: "Deliver comprehensive report with findings, risk ratings, and remediation priorities. Present results to technical and executive stakeholders with actionable recommendations."
    }
  ];

  const pricingPlans = [
    {
      name: "Essential",
      description: "Single application or network segment",
      price: "$3,999",
      features: [
        "1 web application or network segment",
        "OWASP Top 10 coverage",
        "Automated + manual testing",
        "Executive summary report",
        "Technical findings report",
        "Remediation guidance",
        "1 free retest"
      ]
    },
    {
      name: "Professional",
      description: "Comprehensive security assessment",
      price: "$8,999",
      features: [
        "Up to 3 applications",
        "Network perimeter testing",
        "API security testing",
        "Authentication deep-dive",
        "Business logic testing",
        "Detailed remediation plan",
        "Unlimited retests for 30 days",
        "Findings presentation"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "Full-scope engagement",
      price: "Custom",
      features: [
        "Unlimited applications",
        "Internal + external testing",
        "Cloud infrastructure testing",
        "Mobile application testing",
        "Social engineering (optional)",
        "Dedicated security consultant",
        "Ongoing support",
        "Quarterly assessments"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Target", text: "Penetration Testing" }}
        title="Find Vulnerabilities"
        highlight="Before Hackers Do"
        description="Our certified ethical hackers simulate real-world attacks to identify security weaknesses in your applications, networks, and infrastructure. Get actionable insights to strengthen your defenses."
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
              Request a Quote
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
            title="Comprehensive Testing Services"
            description="We test all aspects of your digital infrastructure to ensure complete security coverage."
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
            title="Why Choose IT Origin for Pen Testing"
            description="Partner with experienced security professionals who deliver real value."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Testing Process"
            description="A structured approach that ensures thorough testing and actionable results."
          />

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <ProcessStep key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Transparent Pricing"
            description="Choose the package that fits your security needs and budget."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All packages include detailed reporting and remediation guidance.
            </p>
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Need a custom scope? Contact us for a personalized quote
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Secure Your Systems?"
        description="Get a comprehensive penetration test and discover vulnerabilities before attackers exploit them."
        buttons={[
          { text: "Schedule a Test", href: "/contact" },
          { text: "View All Services", href: "/services/offensive-security", variant: "secondary" }
        ]}
      />
    </div>
  );
}
