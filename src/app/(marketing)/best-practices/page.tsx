import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Eye, Server, Users, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Cybersecurity Best Practices | IT Origin",
  description: "Expert cybersecurity best practices and guidelines to help protect your organization. Security tips, frameworks, and implementation guides.",
  keywords: [
    "cybersecurity best practices",
    "security guidelines",
    "security tips",
    "security checklist",
    "cyber hygiene",
    "security framework"
  ],
  alternates: {
    canonical: "https://itorigin.com/best-practices"
  }
};

interface BestPractice {
  category: string;
  icon: React.ElementType;
  practices: { title: string; description: string }[];
}

const bestPractices: BestPractice[] = [
  {
    category: "Access Control",
    icon: Lock,
    practices: [
      { title: "Implement Multi-Factor Authentication", description: "Require MFA for all user accounts, especially privileged accounts. Use hardware tokens or authenticator apps rather than SMS." },
      { title: "Follow Least Privilege Principle", description: "Grant users only the minimum access required for their role. Regularly review and revoke unnecessary permissions." },
      { title: "Use Strong Password Policies", description: "Enforce minimum 12-character passwords with complexity requirements. Consider passwordless authentication where possible." },
      { title: "Implement Single Sign-On", description: "Centralize authentication with SSO to improve security and user experience. Enables better access control and audit logging." }
    ]
  },
  {
    category: "Network Security",
    icon: Server,
    practices: [
      { title: "Segment Your Network", description: "Separate critical systems and data into isolated network segments. Limit lateral movement potential for attackers." },
      { title: "Deploy Next-Gen Firewalls", description: "Use firewalls with deep packet inspection, intrusion prevention, and application awareness. Keep rules minimal and documented." },
      { title: "Encrypt All Traffic", description: "Use TLS 1.3 for all internal and external communications. Implement certificate management and monitoring." },
      { title: "Monitor Network Traffic", description: "Deploy network detection and response (NDR) solutions. Analyze traffic patterns for anomalies and threats." }
    ]
  },
  {
    category: "Endpoint Security",
    icon: Shield,
    practices: [
      { title: "Deploy EDR Solutions", description: "Implement Endpoint Detection and Response on all endpoints. Enable behavioral analysis and automated response capabilities." },
      { title: "Keep Systems Patched", description: "Establish a patch management program with defined timelines. Prioritize critical and high-severity vulnerabilities." },
      { title: "Harden System Configurations", description: "Follow CIS benchmarks or similar hardening guides. Disable unnecessary services and features." },
      { title: "Implement Application Control", description: "Whitelist approved applications. Block execution of unauthorized software and scripts." }
    ]
  },
  {
    category: "Data Protection",
    icon: FileText,
    practices: [
      { title: "Classify Your Data", description: "Categorize data by sensitivity level. Apply appropriate controls based on classification." },
      { title: "Encrypt Sensitive Data", description: "Encrypt data at rest and in transit. Use strong encryption algorithms (AES-256, RSA-2048+)." },
      { title: "Implement DLP Controls", description: "Deploy Data Loss Prevention solutions to monitor and protect sensitive data from unauthorized exfiltration." },
      { title: "Maintain Secure Backups", description: "Follow the 3-2-1 backup rule. Test restores regularly and keep offline copies for ransomware protection." }
    ]
  },
  {
    category: "Security Monitoring",
    icon: Eye,
    practices: [
      { title: "Centralize Log Management", description: "Collect logs from all systems into a SIEM. Ensure adequate retention and enable correlation rules." },
      { title: "Enable 24/7 Monitoring", description: "Maintain continuous security monitoring through internal SOC or managed services. Ensure coverage for off-hours." },
      { title: "Develop Use Cases", description: "Create detection rules for known attack patterns. Tune alerts to minimize false positives." },
      { title: "Implement Threat Intelligence", description: "Integrate threat feeds with your security tools. Use intelligence to inform detection and response." }
    ]
  },
  {
    category: "Incident Response",
    icon: AlertTriangle,
    practices: [
      { title: "Develop IR Playbooks", description: "Create documented procedures for common incident types. Include escalation paths and communication templates." },
      { title: "Build Response Capabilities", description: "Ensure you have tools and skills for forensics, containment, and recovery. Consider retainer agreements with IR providers." },
      { title: "Practice Response Procedures", description: "Conduct regular tabletop exercises and simulations. Test your playbooks and update based on lessons learned." },
      { title: "Establish Communication Plans", description: "Define internal and external communication procedures. Prepare templates for stakeholder and regulatory notifications." }
    ]
  },
  {
    category: "Security Awareness",
    icon: Users,
    practices: [
      { title: "Train All Employees", description: "Provide regular security awareness training. Cover phishing, social engineering, and safe computing practices." },
      { title: "Conduct Phishing Simulations", description: "Test employees with simulated phishing campaigns. Use results to target additional training." },
      { title: "Promote Security Culture", description: "Encourage reporting of suspicious activity. Recognize and reward security-conscious behavior." },
      { title: "Provide Role-Based Training", description: "Deliver specialized training for developers, admins, and executives based on their specific risks and responsibilities." }
    ]
  }
];

export default function BestPracticesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Shield", text: "Best Practices" }}
        title="Cybersecurity"
        highlight="Best Practices"
        description="Expert-curated security guidelines and recommendations to help protect your organization from cyber threats. Practical advice you can implement today."
      />

      {/* Quick Tips */}
      <section className="py-12 -mt-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="font-bold mb-4">Top 5 Quick Wins</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  "Enable MFA everywhere",
                  "Patch critical systems",
                  "Backup regularly",
                  "Train your team",
                  "Monitor 24/7"
                ].map((tip, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2 font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Best Practices by Category */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Security Best Practices by Category"
            description="Comprehensive guidelines organized by security domain."
          />

          <div className="space-y-12">
            {bestPractices.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="p-8 rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black">{category.category}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.practices.map((practice, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold mb-1">{practice.title}</h4>
                            <p className="text-sm text-muted-foreground">{practice.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Security Checklist */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Need a Security Checklist?</h2>
            <p className="text-muted-foreground mb-8">
              Download our comprehensive security assessment checklist to evaluate your organization&apos;s security posture.
            </p>
            <Link
              href="/contact?request=checklist"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Download Free Checklist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Related Resources */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Related Resources"
            description="Additional materials to strengthen your security posture."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/whitepapers"
              className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors group"
            >
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Whitepapers</h3>
              <p className="text-sm text-muted-foreground">In-depth research and analysis on security topics.</p>
            </Link>
            <Link
              href="/webinars"
              className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors group"
            >
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Webinars</h3>
              <p className="text-sm text-muted-foreground">Live and on-demand security training sessions.</p>
            </Link>
            <Link
              href="/blogs"
              className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors group"
            >
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Blog</h3>
              <p className="text-sm text-muted-foreground">Latest insights and security news from our experts.</p>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Need Help Implementing Best Practices?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our security experts can help you assess your current posture and implement these best practices tailored to your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/grc-services"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View GRC Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
