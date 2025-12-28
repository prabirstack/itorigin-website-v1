import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Shield, CheckCircle, Users, Lock, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance | IT Origin",
  description: "Learn about IT Origin's commitment to GDPR compliance and how we protect the personal data of EU residents.",
  alternates: {
    canonical: "https://itorigin.com/gdpr"
  }
};

export default function GDPRCompliancePage() {
  const gdprPrinciples = [
    {
      icon: Lock,
      title: "Lawfulness, Fairness & Transparency",
      description: "We process personal data lawfully, fairly, and in a transparent manner. We always inform individuals about how their data will be used."
    },
    {
      icon: FileText,
      title: "Purpose Limitation",
      description: "We collect data for specified, explicit, and legitimate purposes and do not process it in ways incompatible with those purposes."
    },
    {
      icon: Shield,
      title: "Data Minimization",
      description: "We only collect and process personal data that is necessary for the purposes we have specified."
    },
    {
      icon: CheckCircle,
      title: "Accuracy",
      description: "We take reasonable steps to ensure personal data is accurate, up-to-date, and corrected or deleted when inaccurate."
    },
    {
      icon: Users,
      title: "Storage Limitation",
      description: "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected."
    },
    {
      icon: Globe,
      title: "Integrity & Confidentiality",
      description: "We implement appropriate security measures to protect personal data against unauthorized access, loss, or destruction."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">EU Data Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">GDPR Compliance</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to protecting your personal data in accordance with the General Data Protection Regulation.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to GDPR</h2>
              <p className="text-muted-foreground mb-4">
                IT Origin is committed to ensuring the security and protection of the personal information that we process. We provide a compliant and consistent approach to data protection that is aligned with the General Data Protection Regulation (GDPR).
              </p>
              <p className="text-muted-foreground">
                The GDPR is a regulation in EU law on data protection and privacy that applies to all organizations operating within the EU, as well as organizations outside the EU that offer goods or services to EU residents.
              </p>
            </section>

            {/* GDPR Principles Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">GDPR Principles We Follow</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                {gdprPrinciples.map((principle, index) => (
                  <div key={index} className="p-6 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                    <p className="text-muted-foreground text-sm">{principle.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
              <p className="text-muted-foreground mb-4">
                Under the GDPR, EU residents have the following rights regarding their personal data:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Access</h3>
                  <p className="text-muted-foreground">
                    You have the right to request a copy of the personal data we hold about you and information about how we process it.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Rectification</h3>
                  <p className="text-muted-foreground">
                    You have the right to request that we correct any inaccurate personal data we hold about you.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Erasure (&quot;Right to be Forgotten&quot;)</h3>
                  <p className="text-muted-foreground">
                    You have the right to request that we delete your personal data in certain circumstances.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Restrict Processing</h3>
                  <p className="text-muted-foreground">
                    You have the right to request that we restrict the processing of your personal data in certain circumstances.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Data Portability</h3>
                  <p className="text-muted-foreground">
                    You have the right to receive your personal data in a structured, commonly used, and machine-readable format.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Right to Object</h3>
                  <p className="text-muted-foreground">
                    You have the right to object to the processing of your personal data for direct marketing purposes or when processing is based on legitimate interests.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Rights Related to Automated Decision-Making</h3>
                  <p className="text-muted-foreground">
                    You have the right not to be subject to decisions based solely on automated processing that produce legal or significant effects on you.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing</h2>
              <p className="text-muted-foreground mb-4">
                We process personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Consent:</strong> You have given explicit consent for processing your personal data for a specific purpose.</li>
                <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you or to take steps before entering into a contract.</li>
                <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation.</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests, provided these are not overridden by your rights.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Data Protection Measures</h2>
              <p className="text-muted-foreground mb-4">
                As a cybersecurity company, we implement comprehensive technical and organizational measures to protect personal data, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Encryption of personal data both at rest and in transit</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and security</li>
                <li>Incident response procedures for data breaches</li>
                <li>Regular backups and disaster recovery planning</li>
                <li>Privacy by design and default in our systems</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground mb-4">
                When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>Transfers to countries with an adequacy decision from the European Commission</li>
                <li>Binding Corporate Rules for intra-group transfers</li>
                <li>Other approved transfer mechanisms under GDPR</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Data Breach Notification</h2>
              <p className="text-muted-foreground mb-4">
                In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach</li>
                <li>Notify affected individuals without undue delay when the breach is likely to result in high risk</li>
                <li>Document all breaches, including their effects and remedial actions taken</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Data Protection Officer</h2>
              <p className="text-muted-foreground mb-4">
                We have appointed a Data Protection Officer (DPO) to oversee our GDPR compliance. You can contact our DPO for any questions or concerns regarding the processing of your personal data:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-semibold mb-2">Data Protection Officer</p>
                <p className="text-muted-foreground">Email: dpo@itorigin.com</p>
                <p className="text-muted-foreground">Address: 123 Cybersecurity Avenue, Tech District, Mumbai 400001, India</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Exercising Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                To exercise any of your GDPR rights, please contact us at{" "}
                <a href="mailto:privacy@itorigin.com" className="text-primary hover:underline">
                  privacy@itorigin.com
                </a>. We will respond to your request within one month, as required by GDPR.
              </p>
              <p className="text-muted-foreground">
                You also have the right to lodge a complaint with a supervisory authority if you believe your data protection rights have been violated.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
              <Link href="/security-policy" className="text-primary hover:underline">Security Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
