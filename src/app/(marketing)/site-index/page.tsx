import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Site Index | IT Origin",
  description: "Navigate IT Origin's website with our comprehensive site index. Find all pages, services, and resources easily.",
  alternates: {
    canonical: "https://itorigin.com/site-index"
  }
};

interface SitemapSection {
  title: string;
  links: { name: string; href: string }[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "Platform", href: "/platform" },
      { name: "Partner", href: "/partner" },
      { name: "Training", href: "/training" },
      { name: "Blog", href: "/blogs" },
      { name: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { name: "Managed SOC Services", href: "/services/managed-soc-services" },
      { name: "Offensive Security", href: "/services/offensive-security" },
      { name: "GRC Services", href: "/services/grc-services" },
      { name: "Penetration Testing", href: "/services/penetration-testing" },
      { name: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
      { name: "Security Audit", href: "/services/security-audit" }
    ]
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about/story" },
      { name: "Our Team", href: "/about/team" },
      { name: "Our Values", href: "/about/values" },
      { name: "Careers", href: "/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "News & Events", href: "/news" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Security Center", href: "/security" },
      { name: "Best Practices", href: "/best-practices" },
      { name: "Whitepapers", href: "/whitepapers" },
      { name: "Webinars", href: "/webinars" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "Service Level Agreement", href: "/sla" },
      { name: "Security Policy", href: "/security-policy" }
    ]
  },
  {
    title: "Accessibility & Meta",
    links: [
      { name: "Accessibility Statement", href: "/accessibility" },
      { name: "Site Index", href: "/site-index" }
    ]
  }
];

export default function SiteIndexPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Site Index</h1>
            <p className="text-muted-foreground text-lg">
              Find all pages on the IT Origin website organized by category.
            </p>
          </div>

          {/* Sitemap Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section) => (
              <div key={section.title} className="p-6 rounded-2xl border border-border bg-card">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* XML Sitemap Link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              For search engines, see our{" "}
              <a href="/sitemap.xml" className="text-primary hover:underline">
                XML Sitemap
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
