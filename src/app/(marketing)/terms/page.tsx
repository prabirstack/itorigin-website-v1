import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Terms of Service | IT Origin",
  description: "Read IT Origin's Terms of Service governing your use of our cybersecurity services and website.",
  alternates: {
    canonical: "https://itorigin.com/terms"
  }
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 1, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using IT Origin&apos;s website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
              <p className="text-muted-foreground">
                These Terms of Service apply to all users of our website and services, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-4">
                IT Origin provides cybersecurity services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Managed Security Operations Center (SOC) services</li>
                <li>Penetration testing and vulnerability assessments</li>
                <li>Governance, Risk, and Compliance (GRC) consulting</li>
                <li>Security auditing and assessments</li>
                <li>Incident response and threat intelligence</li>
                <li>Security training and awareness programs</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Specific service terms, deliverables, and pricing are outlined in individual service agreements or statements of work.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access or use</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in suspicious activity.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use our services or website to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit malware, viruses, or other malicious code</li>
                <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Collect or harvest user information without consent</li>
                <li>Engage in any activity that could damage our reputation or goodwill</li>
                <li>Use our services for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality on our website and in our services, including but not limited to text, graphics, logos, icons, images, audio clips, software, and code, are the exclusive property of IT Origin or our licensors and are protected by intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any materials from our website without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Confidentiality</h2>
              <p className="text-muted-foreground mb-4">
                Both parties agree to maintain the confidentiality of any proprietary or sensitive information disclosed during the course of our engagement. This includes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Security assessment findings and reports</li>
                <li>Technical documentation and system information</li>
                <li>Business strategies and processes</li>
                <li>Customer and employee data</li>
                <li>Any information marked as confidential</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Confidentiality obligations survive the termination of any service agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                For paid services:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Payment terms are specified in individual service agreements</li>
                <li>All fees are quoted in the agreed currency and are exclusive of applicable taxes</li>
                <li>Late payments may incur interest charges as permitted by law</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>Refunds are subject to our refund policy and specific service terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, IT Origin shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Loss of profits, revenue, or data</li>
                <li>Business interruption</li>
                <li>Loss of business opportunity or goodwill</li>
                <li>Any other intangible losses</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our total liability for any claims arising from these terms or our services shall not exceed the amount paid by you for the specific service giving rise to the claim in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Our services will meet all your requirements</li>
                <li>Our services will be uninterrupted, timely, secure, or error-free</li>
                <li>Security assessments will identify all vulnerabilities</li>
                <li>Any defects will be corrected</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Cybersecurity is an evolving field, and no security solution can guarantee complete protection against all threats.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless IT Origin and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses arising out of or relating to your use of our services, your violation of these terms, or your violation of any rights of a third party.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your right to use our services will immediately cease. All provisions of these terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. Your continued use of our services after the effective date of any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-semibold mb-2">IT Origin - Legal Team</p>
                <p className="text-muted-foreground">Email: legal@itorigin.com</p>
                <p className="text-muted-foreground">Address: 123 Cybersecurity Avenue, Tech District, Mumbai 400001, India</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
              <Link href="/sla" className="text-primary hover:underline">Service Level Agreement</Link>
              <Link href="/security-policy" className="text-primary hover:underline">Security Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
