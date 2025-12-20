import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Cookie Policy | IT Origin",
  description: "Learn about how IT Origin uses cookies and similar technologies on our website.",
  alternates: {
    canonical: "https://itorigin.com/cookies"
  }
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: January 1, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners.
              </p>
              <p className="text-muted-foreground">
                Cookies help us understand how you use our website, remember your preferences, and improve your browsing experience.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Session management cookies</li>
                    <li>Security cookies</li>
                    <li>Load balancing cookies</li>
                  </ul>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Performance Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve how our website works.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Analytics cookies (e.g., Google Analytics)</li>
                    <li>Error monitoring cookies</li>
                    <li>Performance tracking cookies</li>
                  </ul>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Functionality Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Language preference cookies</li>
                    <li>Theme preference cookies (dark/light mode)</li>
                    <li>User interface customization cookies</li>
                  </ul>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Marketing Cookies</h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are used to track visitors across websites to display relevant advertisements. They may be set by our advertising partners.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Advertising cookies</li>
                    <li>Social media cookies</li>
                    <li>Retargeting cookies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Cookie Name</th>
                      <th className="border border-border p-3 text-left">Purpose</th>
                      <th className="border border-border p-3 text-left">Duration</th>
                      <th className="border border-border p-3 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-border p-3">_session</td>
                      <td className="border border-border p-3">User session management</td>
                      <td className="border border-border p-3">Session</td>
                      <td className="border border-border p-3">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">theme</td>
                      <td className="border border-border p-3">Stores theme preference</td>
                      <td className="border border-border p-3">1 year</td>
                      <td className="border border-border p-3">Functionality</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">_ga</td>
                      <td className="border border-border p-3">Google Analytics - distinguishes users</td>
                      <td className="border border-border p-3">2 years</td>
                      <td className="border border-border p-3">Performance</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">_gid</td>
                      <td className="border border-border p-3">Google Analytics - distinguishes users</td>
                      <td className="border border-border p-3">24 hours</td>
                      <td className="border border-border p-3">Performance</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">cookie_consent</td>
                      <td className="border border-border p-3">Stores cookie consent preference</td>
                      <td className="border border-border p-3">1 year</td>
                      <td className="border border-border p-3">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of our website, deliver advertisements, and enable social media sharing.
              </p>
              <p className="text-muted-foreground">
                Third-party services that may set cookies include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mt-4 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>LinkedIn:</strong> For social media integration and advertising</li>
                <li><strong>HubSpot:</strong> For marketing automation and lead tracking</li>
                <li><strong>Intercom/Chat services:</strong> For customer support chat functionality</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in the following ways:
              </p>

              <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
              <p className="text-muted-foreground mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &quot;options&quot; or &quot;preferences&quot; menu of your browser.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internet Explorer</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Opt-Out Tools</h3>
              <p className="text-muted-foreground">
                You can also opt out of certain third-party cookies by visiting:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-Out</a></li>
                <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a></li>
                <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a></li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-muted-foreground">
                Please note that if you choose to disable cookies, some features of our website may not function properly. Essential cookies cannot be disabled as they are required for the website to work correctly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies, please contact us:
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
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link href="/gdpr" className="text-primary hover:underline">GDPR Compliance</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
