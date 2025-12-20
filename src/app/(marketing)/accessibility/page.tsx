import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { CheckCircle, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility Statement | IT Origin",
  description: "IT Origin's commitment to digital accessibility. Learn about our efforts to make our website accessible to everyone.",
  alternates: {
    canonical: "https://itorigin.com/accessibility"
  }
};

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    "Semantic HTML structure for screen reader compatibility",
    "Keyboard navigation support for all interactive elements",
    "Sufficient color contrast ratios (WCAG AA compliant)",
    "Alt text for all meaningful images",
    "Descriptive link text for better context",
    "Consistent navigation across all pages",
    "Responsive design that works on all devices",
    "Focus indicators for keyboard users",
    "Skip navigation links",
    "Resizable text without loss of functionality",
    "Form labels and error messages",
    "ARIA landmarks and roles where appropriate"
  ];

  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Accessibility Statement</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to making IT Origin accessible to everyone.
            </p>
            <p className="text-muted-foreground mt-4">Last Updated: January 1, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
              <p className="text-muted-foreground mb-4">
                IT Origin is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee we provide equal access to all users.
              </p>
              <p className="text-muted-foreground">
                We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
              <p className="text-muted-foreground mb-4">
                We have implemented the following accessibility features on our website:
              </p>
              <div className="grid md:grid-cols-2 gap-3 not-prose">
                {accessibilityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Assistive Technologies</h2>
              <p className="text-muted-foreground mb-4">
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
                <li>Browser accessibility extensions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Browser Compatibility</h2>
              <p className="text-muted-foreground mb-4">
                Our website is optimized for the latest versions of the following browsers:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Apple Safari</li>
                <li>Microsoft Edge</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                For the best experience, we recommend keeping your browser updated to the latest version.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
              <p className="text-muted-foreground mb-4">
                While we strive for full accessibility, some content may have limitations:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Some older PDF documents may not be fully accessible. We are working to update these documents.</li>
                <li>Third-party content and widgets may not meet accessibility standards. We work with our partners to improve their accessibility.</li>
                <li>Some video content may not have captions yet. We are adding captions to all video content.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Continuous Improvement</h2>
              <p className="text-muted-foreground mb-4">
                We are committed to continuously improving the accessibility of our website. Our efforts include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Regular accessibility audits using automated and manual testing</li>
                <li>Training our team on accessibility best practices</li>
                <li>Incorporating accessibility into our development process</li>
                <li>Testing with users who rely on assistive technologies</li>
                <li>Monitoring and addressing accessibility issues promptly</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Feedback and Contact</h2>
              <p className="text-muted-foreground mb-4">
                We welcome your feedback on the accessibility of IT Origin&apos;s website. If you encounter accessibility barriers or have suggestions for improvement, please let us know:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg not-prose">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:accessibility@itorigin.com" className="text-primary hover:underline">
                      accessibility@itorigin.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  When contacting us, please include the URL of the page you are having trouble with and a description of the accessibility issue.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Response Time</h2>
              <p className="text-muted-foreground">
                We aim to respond to accessibility feedback within 5 business days. For critical accessibility issues that prevent access to content, we will prioritize resolution within 2 business days.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Formal Complaints</h2>
              <p className="text-muted-foreground">
                If you are not satisfied with our response to an accessibility concern, you may file a formal complaint through our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact form
                </Link>. We take all complaints seriously and will work to resolve any issues.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Information</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link href="/contact" className="text-primary hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
