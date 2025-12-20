import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Shield, Lock, Eye, Server, Users, AlertTriangle, FileCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Policy | IT Origin",
  description: "Learn about IT Origin's comprehensive security policies and practices that protect our clients and their data.",
  alternates: {
    canonical: "https://itorigin.com/security-policy"
  }
};

export default function SecurityPolicyPage() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3."
    },
    {
      icon: Users,
      title: "Access Control",
      description: "Role-based access control with multi-factor authentication for all systems."
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring with automated threat detection and response."
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Hardened infrastructure with regular patching and vulnerability management."
    }
  ];

  const certifications = [
    { name: "ISO 27001", description: "Information Security Management System" },
    { name: "SOC 2 Type II", description: "Service Organization Control" },
    { name: "GDPR Compliant", description: "General Data Protection Regulation" },
    { name: "HIPAA Compliant", description: "Health Insurance Portability and Accountability Act" }
  ];

  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Security Policy</h1>
            <p className="text-xl text-muted-foreground">
              Our comprehensive approach to securing your data and maintaining the highest standards of cybersecurity.
            </p>
            <p className="text-muted-foreground mt-4">Last Updated: January 1, 2025</p>
          </div>

          {/* Security Pillars */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {securityPillars.map((pillar, index) => (
              <div key={index} className="p-6 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
              <p className="text-muted-foreground mb-4">
                At IT Origin, security is not just a feature—it&apos;s the foundation of everything we do. As a cybersecurity company, we hold ourselves to the highest standards of security practices and continuously work to protect our clients&apos; data and systems.
              </p>
              <p className="text-muted-foreground">
                This Security Policy outlines our commitment to maintaining a secure environment for our services, employees, and customers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Information Security Management</h2>
              <p className="text-muted-foreground mb-4">
                We maintain a comprehensive Information Security Management System (ISMS) that includes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Documented security policies and procedures</li>
                <li>Regular risk assessments and security audits</li>
                <li>Continuous improvement based on lessons learned</li>
                <li>Management commitment and resource allocation</li>
                <li>Employee security awareness training</li>
                <li>Incident response and business continuity planning</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. Data Protection</h2>

              <h3 className="text-xl font-semibold mb-3">Encryption</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Data at Rest:</strong> AES-256 encryption for all stored data</li>
                <li><strong>Data in Transit:</strong> TLS 1.3 for all network communications</li>
                <li><strong>Key Management:</strong> Hardware Security Modules (HSMs) for cryptographic key storage</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Data Classification</h3>
              <p className="text-muted-foreground mb-4">
                We classify data based on sensitivity levels and apply appropriate security controls:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Confidential:</strong> Customer data, security reports, credentials</li>
                <li><strong>Internal:</strong> Business operations, employee information</li>
                <li><strong>Public:</strong> Marketing materials, public documentation</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Access Control</h2>
              <p className="text-muted-foreground mb-4">
                We implement strict access controls to protect systems and data:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Least Privilege:</strong> Users receive minimum access necessary for their role</li>
                <li><strong>Multi-Factor Authentication:</strong> Required for all system access</li>
                <li><strong>Regular Access Reviews:</strong> Quarterly reviews of user access rights</li>
                <li><strong>Password Policy:</strong> Strong passwords with regular rotation requirements</li>
                <li><strong>Session Management:</strong> Automatic timeout and session controls</li>
                <li><strong>Privileged Access Management:</strong> Enhanced controls for administrative access</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Network Security</h2>
              <p className="text-muted-foreground mb-4">
                Our network infrastructure is protected by multiple layers of security:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Next-generation firewalls with intrusion prevention</li>
                <li>Network segmentation and micro-segmentation</li>
                <li>DDoS protection and mitigation</li>
                <li>Web Application Firewall (WAF) for application protection</li>
                <li>VPN with strong encryption for remote access</li>
                <li>Network monitoring and anomaly detection</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Application Security</h2>
              <p className="text-muted-foreground mb-4">
                We follow secure software development practices:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Secure Software Development Lifecycle (SSDLC)</li>
                <li>Regular code reviews and static analysis</li>
                <li>Dynamic application security testing (DAST)</li>
                <li>Dependency vulnerability scanning</li>
                <li>Regular penetration testing by internal and external teams</li>
                <li>Security training for all developers</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Endpoint Security</h2>
              <p className="text-muted-foreground mb-4">
                All endpoints are protected with comprehensive security measures:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Endpoint Detection and Response (EDR) solutions</li>
                <li>Full-disk encryption on all devices</li>
                <li>Mobile Device Management (MDM) for mobile devices</li>
                <li>Automated patch management</li>
                <li>Host-based firewalls and intrusion detection</li>
                <li>USB and removable media controls</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Physical Security</h2>
              <p className="text-muted-foreground mb-4">
                Our physical facilities are protected by:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>24/7 security personnel and CCTV surveillance</li>
                <li>Biometric access controls for sensitive areas</li>
                <li>Visitor management and escort requirements</li>
                <li>Environmental controls (fire suppression, climate control)</li>
                <li>Clean desk policy</li>
                <li>Secure disposal of physical media</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. Incident Response</h2>
              <p className="text-muted-foreground mb-4">
                We maintain a comprehensive incident response program:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Documented incident response procedures</li>
                <li>24/7 Security Operations Center (SOC)</li>
                <li>Incident classification and prioritization</li>
                <li>Rapid containment and remediation capabilities</li>
                <li>Forensic investigation capabilities</li>
                <li>Post-incident analysis and lessons learned</li>
                <li>Regular incident response drills and tabletop exercises</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Business Continuity</h2>
              <p className="text-muted-foreground mb-4">
                We ensure service continuity through:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Documented Business Continuity Plan (BCP)</li>
                <li>Disaster Recovery Plan with defined RTOs and RPOs</li>
                <li>Regular backups with offsite storage</li>
                <li>Geographic redundancy for critical systems</li>
                <li>Annual business continuity testing</li>
                <li>Crisis communication procedures</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">11. Vendor Management</h2>
              <p className="text-muted-foreground mb-4">
                Third-party vendors are subject to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Security assessments before engagement</li>
                <li>Contractual security requirements</li>
                <li>Regular security reviews and audits</li>
                <li>Data processing agreements where applicable</li>
                <li>Vendor risk categorization and monitoring</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">12. Employee Security</h2>
              <p className="text-muted-foreground mb-4">
                Our employees are a critical part of our security program:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Background checks for all employees</li>
                <li>Security awareness training at onboarding and annually</li>
                <li>Phishing simulation exercises</li>
                <li>Clear acceptable use policies</li>
                <li>Confidentiality agreements</li>
                <li>Secure offboarding procedures</li>
              </ul>
            </section>

            {/* Certifications */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">13. Certifications & Compliance</h2>
              <p className="text-muted-foreground mb-4">
                We maintain the following certifications and compliance standards:
              </p>
              <div className="grid md:grid-cols-2 gap-4 not-prose">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">14. Vulnerability Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We maintain a responsible disclosure program for security researchers. If you discover a security vulnerability in our systems:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Report vulnerabilities to security@itorigin.com</li>
                <li>Provide detailed information about the vulnerability</li>
                <li>Allow reasonable time for us to address the issue</li>
                <li>Do not access or modify data belonging to others</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We commit to acknowledging reports within 48 hours and providing updates on remediation progress.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For security-related inquiries or to report a security concern:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-semibold mb-2">IT Origin Security Team</p>
                <p className="text-muted-foreground">Email: security@itorigin.com</p>
                <p className="text-muted-foreground">PGP Key: Available upon request</p>
                <p className="text-muted-foreground">Emergency: +1 (234) 567-890</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link href="/gdpr" className="text-primary hover:underline">GDPR Compliance</Link>
              <Link href="/sla" className="text-primary hover:underline">Service Level Agreement</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
