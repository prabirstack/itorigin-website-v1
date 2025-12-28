import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Privacy Policy | IT Origin",
  description: "Learn how IT Origin collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  alternates: {
    canonical: "https://itorigin.com/privacy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 1, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                IT Origin (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our cybersecurity services.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3">Personal Data</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personally identifiable information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Register for our services or create an account</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Request a consultation or demo</li>
                <li>Contact us through our website or email</li>
                <li>Participate in surveys, promotions, or other activities</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold mb-3">Automatically Collected Data</h3>
              <p className="text-muted-foreground mb-4">
                When you access our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages viewed and time spent on our website</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage trends and preferences</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations and enforce our policies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting our business.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or in response to valid legal requests.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, or that of our users or others.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                As a cybersecurity company, we take data security seriously. We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encryption of sensitive data at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Access:</strong> Request access to your personal data we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@itorigin.com" className="text-primary hover:underline">
                  privacy@itorigin.com
                </a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to collect and track information about your browsing activities. For more information about our use of cookies, please see our{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-semibold mb-2">IT Origin - Privacy Team</p>
                <p className="text-muted-foreground">Email: privacy@itorigin.com</p>
                <p className="text-muted-foreground">Address: 123 Cybersecurity Avenue, Tech District, Mumbai 400001, India</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
              <Link href="/gdpr" className="text-primary hover:underline">GDPR Compliance</Link>
              <Link href="/security-policy" className="text-primary hover:underline">Security Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
