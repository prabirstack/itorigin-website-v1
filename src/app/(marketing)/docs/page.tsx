import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Code, Terminal, Shield, Settings, Search } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

export const metadata: Metadata = {
  title: "Documentation | IT Origin",
  description: "Comprehensive documentation for IT Origin's security platform, APIs, and services. Get started guides, integration tutorials, and reference documentation.",
  keywords: [
    "IT Origin documentation",
    "security platform docs",
    "API documentation",
    "integration guides",
    "security tutorials"
  ],
  alternates: {
    canonical: "https://itorigin.com/docs"
  }
};

interface DocCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  links: { title: string; href: string; description: string }[];
}

const docCategories: DocCategory[] = [
  {
    title: "Getting Started",
    description: "New to IT Origin? Start here to set up your account and learn the basics.",
    icon: BookOpen,
    links: [
      { title: "Quick Start Guide", href: "/docs/quickstart", description: "Get up and running in 15 minutes" },
      { title: "Platform Overview", href: "/docs/overview", description: "Understand our security platform architecture" },
      { title: "Account Setup", href: "/docs/account", description: "Configure your organization and users" },
      { title: "First Steps", href: "/docs/first-steps", description: "Essential tasks to complete after signup" }
    ]
  },
  {
    title: "Platform Guides",
    description: "In-depth guides for using our security platform features.",
    icon: Shield,
    links: [
      { title: "SOC Dashboard", href: "/docs/soc-dashboard", description: "Navigate and customize your security dashboard" },
      { title: "Alert Management", href: "/docs/alerts", description: "Configure and respond to security alerts" },
      { title: "Threat Intelligence", href: "/docs/threat-intel", description: "Leverage integrated threat feeds" },
      { title: "Reporting", href: "/docs/reports", description: "Generate and schedule security reports" }
    ]
  },
  {
    title: "Integrations",
    description: "Connect IT Origin with your existing security tools and infrastructure.",
    icon: Settings,
    links: [
      { title: "SIEM Integration", href: "/docs/integrations/siem", description: "Connect with Splunk, Elastic, and more" },
      { title: "Cloud Connectors", href: "/docs/integrations/cloud", description: "AWS, Azure, GCP log ingestion" },
      { title: "Endpoint Security", href: "/docs/integrations/endpoint", description: "EDR and antivirus integrations" },
      { title: "Ticketing Systems", href: "/docs/integrations/ticketing", description: "ServiceNow, Jira, PagerDuty" }
    ]
  },
  {
    title: "API Reference",
    description: "Build custom integrations with our REST and GraphQL APIs.",
    icon: Code,
    links: [
      { title: "API Overview", href: "/docs/api", description: "Authentication, rate limits, and basics" },
      { title: "Alerts API", href: "/docs/api/alerts", description: "Query, update, and manage alerts" },
      { title: "Assets API", href: "/docs/api/assets", description: "Asset inventory management" },
      { title: "Webhooks", href: "/docs/api/webhooks", description: "Real-time event notifications" }
    ]
  },
  {
    title: "Administration",
    description: "Manage users, roles, and organization settings.",
    icon: Terminal,
    links: [
      { title: "User Management", href: "/docs/admin/users", description: "Add users and manage permissions" },
      { title: "Role-Based Access", href: "/docs/admin/rbac", description: "Configure roles and access controls" },
      { title: "SSO Configuration", href: "/docs/admin/sso", description: "Set up SAML and OIDC authentication" },
      { title: "Audit Logs", href: "/docs/admin/audit", description: "Track user activity and changes" }
    ]
  },
  {
    title: "Troubleshooting",
    description: "Solutions for common issues and frequently asked questions.",
    icon: FileText,
    links: [
      { title: "Common Issues", href: "/docs/troubleshooting", description: "Solutions for frequent problems" },
      { title: "FAQ", href: "/docs/faq", description: "Answers to frequently asked questions" },
      { title: "Release Notes", href: "/docs/releases", description: "Latest updates and changes" },
      { title: "Support Contact", href: "/contact", description: "Get help from our support team" }
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "BookOpen", text: "Documentation" }}
        title="Learn, Build,"
        highlight="Integrate"
        description="Everything you need to get the most out of IT Origin's security platform. From quick start guides to advanced API documentation."
      />

      {/* Search Section */}
      <section className="py-8 -mt-8">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Topics */}
      <section className="py-12">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Getting Started", "API Authentication", "Log Ingestion", "Alert Configuration", "SSO Setup"].map((topic) => (
              <Link
                key={topic}
                href={`/docs/search?q=${encodeURIComponent(topic)}`}
                className="px-3 py-1 rounded-full bg-muted hover:bg-primary/10 text-sm transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Documentation Categories */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl border border-border bg-card"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                          <div>
                            <span className="font-medium text-sm group-hover:text-primary transition-colors">
                              {link.title}
                            </span>
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SDKs & Libraries */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title="SDKs & Libraries"
            description="Official client libraries for popular programming languages."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Python", icon: "🐍" },
              { name: "JavaScript", icon: "📜" },
              { name: "Go", icon: "🔷" },
              { name: "Java", icon: "☕" },
              { name: "Ruby", icon: "💎" },
              { name: ".NET", icon: "🔷" },
              { name: "PHP", icon: "🐘" },
              { name: "Rust", icon: "🦀" }
            ].map((sdk) => (
              <Link
                key={sdk.name}
                href={`/docs/sdk/${sdk.name.toLowerCase()}`}
                className="p-6 rounded-xl border border-border bg-card text-center hover:border-primary transition-colors"
              >
                <div className="text-3xl mb-2">{sdk.icon}</div>
                <span className="font-semibold">{sdk.name}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Help CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Our support team is here to help. Reach out for personalized assistance with your integration or configuration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/webinars"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Watch Tutorials
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
