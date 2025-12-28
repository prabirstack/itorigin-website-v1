import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Clock, Shield, Zap, CheckCircle, AlertTriangle, HeadphonesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Level Agreement (SLA) | IT Origin",
  description: "IT Origin's Service Level Agreement outlines our commitment to service availability, response times, and support standards.",
  alternates: {
    canonical: "https://itorigin.com/sla"
  }
};

export default function SLAPage() {
  const supportTiers = [
    {
      tier: "Critical (P1)",
      description: "Complete service outage or security breach affecting production systems",
      responseTime: "15 minutes",
      resolutionTarget: "4 hours",
      availability: "24/7/365"
    },
    {
      tier: "High (P2)",
      description: "Major functionality impaired or significant security vulnerability",
      responseTime: "1 hour",
      resolutionTarget: "8 hours",
      availability: "24/7/365"
    },
    {
      tier: "Medium (P3)",
      description: "Partial functionality impaired with workaround available",
      responseTime: "4 hours",
      resolutionTarget: "24 hours",
      availability: "Business Hours"
    },
    {
      tier: "Low (P4)",
      description: "Minor issues, questions, or feature requests",
      responseTime: "8 hours",
      resolutionTarget: "72 hours",
      availability: "Business Hours"
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
              <span className="text-sm font-medium text-primary">Service Commitment</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Service Level Agreement</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to delivering reliable, high-quality cybersecurity services with guaranteed performance standards.
            </p>
            <p className="text-muted-foreground mt-4">Effective Date: January 1, 2025</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Platform Uptime</div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary mb-2">&lt;15min</div>
              <div className="text-sm text-muted-foreground">Critical Response Time</div>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">SOC Monitoring</div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                IT Origin guarantees the following uptime commitments for our managed security services:
              </p>

              <div className="overflow-x-auto not-prose">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Service</th>
                      <th className="border border-border p-3 text-left">Uptime Guarantee</th>
                      <th className="border border-border p-3 text-left">Maximum Downtime/Month</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-border p-3">SOC Platform</td>
                      <td className="border border-border p-3">99.9%</td>
                      <td className="border border-border p-3">43 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Threat Detection</td>
                      <td className="border border-border p-3">99.9%</td>
                      <td className="border border-border p-3">43 minutes</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Customer Portal</td>
                      <td className="border border-border p-3">99.5%</td>
                      <td className="border border-border p-3">3.6 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">API Services</td>
                      <td className="border border-border p-3">99.9%</td>
                      <td className="border border-border p-3">43 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-muted-foreground mt-4">
                Uptime is measured on a monthly basis and excludes scheduled maintenance windows.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Support Response Times</h2>
              <p className="text-muted-foreground mb-4">
                Our support team is committed to responding to and resolving issues based on their priority level:
              </p>

              <div className="space-y-4 not-prose">
                {supportTiers.map((tier, index) => (
                  <div key={index} className="p-6 bg-muted/50 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{tier.tier}</h3>
                        <p className="text-muted-foreground text-sm">{tier.description}</p>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Response:</span>
                          <span className="font-semibold ml-2">{tier.responseTime}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Resolution:</span>
                          <span className="font-semibold ml-2">{tier.resolutionTarget}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Coverage:</span>
                          <span className="font-semibold ml-2">{tier.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. SOC Service Commitments</h2>
              <p className="text-muted-foreground mb-4">
                Our Security Operations Center provides the following service commitments:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>24/7/365 Monitoring:</strong> Continuous monitoring of your security infrastructure</li>
                <li><strong>Threat Detection:</strong> Average detection time of less than 3 minutes for critical threats</li>
                <li><strong>Alert Triage:</strong> All alerts triaged within 15 minutes of detection</li>
                <li><strong>Incident Escalation:</strong> Critical incidents escalated within 15 minutes</li>
                <li><strong>Monthly Reporting:</strong> Comprehensive security reports delivered by the 5th of each month</li>
                <li><strong>Quarterly Reviews:</strong> Security posture review meetings with your team</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Scheduled Maintenance</h2>
              <p className="text-muted-foreground mb-4">
                We perform scheduled maintenance to ensure optimal performance and security of our services:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Maintenance windows are scheduled during low-traffic periods (typically Sunday 2:00 AM - 6:00 AM IST)</li>
                <li>Customers will be notified at least 72 hours in advance for planned maintenance</li>
                <li>Emergency maintenance may be performed with shorter notice in case of critical security updates</li>
                <li>Scheduled maintenance is excluded from uptime calculations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Service Credits</h2>
              <p className="text-muted-foreground mb-4">
                If we fail to meet the uptime guarantee, customers are entitled to service credits:
              </p>

              <div className="overflow-x-auto not-prose">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Monthly Uptime</th>
                      <th className="border border-border p-3 text-left">Service Credit</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-border p-3">99.0% - 99.9%</td>
                      <td className="border border-border p-3">10% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">95.0% - 99.0%</td>
                      <td className="border border-border p-3">25% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">90.0% - 95.0%</td>
                      <td className="border border-border p-3">50% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Below 90.0%</td>
                      <td className="border border-border p-3">100% of monthly fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-muted-foreground mt-4">
                To receive a service credit, customers must submit a request within 30 days of the incident.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Exclusions</h2>
              <p className="text-muted-foreground mb-4">
                The following are excluded from SLA calculations and service credits:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Scheduled maintenance windows</li>
                <li>Force majeure events (natural disasters, war, government actions)</li>
                <li>Issues caused by customer actions or third-party services</li>
                <li>DDoS attacks or other malicious activities targeting customer infrastructure</li>
                <li>Customer failure to implement recommended security configurations</li>
                <li>Issues with customer&apos;s internet connectivity or hardware</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Incident Communication</h2>
              <p className="text-muted-foreground mb-4">
                During service incidents, we commit to transparent communication:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Initial incident notification within 15 minutes of detection</li>
                <li>Status updates every 30 minutes during critical incidents</li>
                <li>Post-incident reports within 5 business days for P1/P2 incidents</li>
                <li>Status page updates in real-time at status.itorigin.com</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Customer Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                To ensure we can deliver on our SLA commitments, customers agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide timely access to systems and information as required</li>
                <li>Maintain accurate and up-to-date contact information</li>
                <li>Respond to security alerts and recommendations in a timely manner</li>
                <li>Implement security configurations as recommended</li>
                <li>Report issues through proper support channels</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. SLA Modifications</h2>
              <p className="text-muted-foreground">
                IT Origin reserves the right to modify this SLA with 30 days&apos; notice. Changes will not apply retroactively and will not affect service credits already earned. Current customers will be notified of any changes via email.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For SLA-related inquiries or to submit a service credit request:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="font-semibold mb-2">IT Origin Support</p>
                <p className="text-muted-foreground">Email: support@itorigin.com</p>
                <p className="text-muted-foreground">Emergency: +1 (234) 567-890</p>
                <p className="text-muted-foreground">Status Page: status.itorigin.com</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link href="/security-policy" className="text-primary hover:underline">Security Policy</Link>
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
