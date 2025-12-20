import { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowRight, Users, Shield, BarChart, FileText } from "lucide-react";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Partner Portal | IT Origin",
  description: "Access the IT Origin Partner Portal for resources, deal registration, training materials, and partner support.",
  alternates: {
    canonical: "https://itorigin.com/partner-portal"
  }
};

const portalFeatures = [
  {
    icon: FileText,
    title: "Sales Resources",
    description: "Access product datasheets, presentations, and sales collateral"
  },
  {
    icon: Users,
    title: "Deal Registration",
    description: "Register opportunities and track deal progress"
  },
  {
    icon: Shield,
    title: "Technical Training",
    description: "On-demand courses and certification programs"
  },
  {
    icon: BarChart,
    title: "Performance Dashboard",
    description: "View your sales metrics and commission reports"
  }
];

export default function PartnerPortalPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              Partner Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access exclusive resources, training materials, and tools designed to help you succeed as an IT Origin partner.
            </p>
          </div>

          {/* Login Card */}
          <div className="max-w-md mx-auto mb-16">
            <div className="p-8 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-6 text-center">Partner Login</h2>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="partner@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="/contact" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Not a partner yet?{" "}
                  <Link href="/partner" className="text-primary hover:underline font-medium">
                    Join our partner program
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Portal Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Portal Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portalFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-6 rounded-xl border border-border bg-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support Section */}
          <div className="text-center p-8 rounded-2xl bg-accent/30">
            <h2 className="text-xl font-bold mb-2">Need Assistance?</h2>
            <p className="text-muted-foreground mb-6">
              Our partner support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Partner Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/partner"
                className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                Partner Program Info
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
