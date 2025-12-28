import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Construction, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Documentation | Coming Soon | IT Origin",
  description: "This documentation page is coming soon. Check back later for comprehensive guides and tutorials.",
};

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocSubPage({ params }: DocPageProps) {
  const { slug } = await params;
  const pagePath = slug.join("/");

  // Format the page title from the slug
  const pageTitle = slug[slug.length - 1]
    ?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Documentation";

  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
              <Construction className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/docs" className="hover:text-primary transition-colors">
              Documentation
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{pageTitle}</span>
          </div>

          {/* Content */}
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            {pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            This documentation page is currently under development. We&apos;re working hard to bring you comprehensive guides and tutorials.
          </p>

          {/* Info Box */}
          <div className="p-6 rounded-xl border border-border bg-card text-left mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Need Help Now?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  While we prepare this documentation, our support team is available to answer your questions directly.
                </p>
                <Link
                  href="/contact"
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  Contact Support
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Path Info */}
          <p className="mt-8 text-xs text-muted-foreground">
            Requested path: <code className="px-2 py-1 bg-muted rounded">/docs/{pagePath}</code>
          </p>
        </div>
      </Container>
    </div>
  );
}

// Generate static params for known doc paths to avoid build errors
export function generateStaticParams() {
  return [
    { slug: ["quickstart"] },
    { slug: ["overview"] },
    { slug: ["account"] },
    { slug: ["first-steps"] },
    { slug: ["soc-dashboard"] },
    { slug: ["alerts"] },
    { slug: ["threat-intel"] },
    { slug: ["reports"] },
    { slug: ["integrations", "siem"] },
    { slug: ["integrations", "cloud"] },
    { slug: ["integrations", "endpoint"] },
    { slug: ["integrations", "ticketing"] },
    { slug: ["api"] },
    { slug: ["api", "alerts"] },
    { slug: ["api", "assets"] },
    { slug: ["api", "webhooks"] },
    { slug: ["admin", "users"] },
    { slug: ["admin", "rbac"] },
    { slug: ["admin", "sso"] },
    { slug: ["admin", "audit"] },
    { slug: ["troubleshooting"] },
    { slug: ["faq"] },
    { slug: ["releases"] },
    { slug: ["search"] },
    { slug: ["sdk", "python"] },
    { slug: ["sdk", "javascript"] },
    { slug: ["sdk", "go"] },
    { slug: ["sdk", "java"] },
    { slug: ["sdk", "ruby"] },
    { slug: ["sdk", ".net"] },
    { slug: ["sdk", "php"] },
    { slug: ["sdk", "rust"] },
  ];
}
