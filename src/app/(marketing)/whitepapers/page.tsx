import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { FeaturedWhitepaper } from "@/components/marketing/whitepapers/featured-whitepaper";
import { WhitepaperLibrary } from "@/components/marketing/whitepapers/whitepaper-library";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Whitepapers & Research | ITOrigin",
  description:
    "Download free cybersecurity whitepapers, research reports, and industry guides from ITOrigin's security experts.",
  keywords: [
    "cybersecurity whitepapers",
    "security research",
    "threat reports",
    "security guides",
    "industry reports",
  ],
  alternates: { canonical: "https://itorigin.com/whitepapers" },
};

export const revalidate = 3600;

async function getWhitepapers() {
  try {
    return await db
      .select()
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")))
      .orderBy(desc(resources.featured), desc(resources.publishDate), desc(resources.createdAt));
  } catch (error) {
    console.error("Failed to fetch whitepapers:", error);
    return [];
  }
}

export default async function WhitepapersPage() {
  const whitepapers = await getWhitepapers();
  const featured = whitepapers.find((w) => w.featured) ?? null;
  const rest = featured ? whitepapers.filter((w) => w.id !== featured.id) : whitepapers;
  const categories = Array.from(new Set(whitepapers.map((w) => w.category).filter(Boolean)));

  return (
    <div className="min-h-screen">
      <PageHero
        badge={{ icon: "FileText", text: "Resources" }}
        title="Whitepapers &"
        highlight="Research"
        description="In-depth research, industry reports, and practical guides from our security experts. Download free resources to deepen your security expertise."
      />

      {featured && (
        <section className="py-16 md:py-24">
          <Container>
            <FeaturedWhitepaper whitepaper={featured} />
          </Container>
        </section>
      )}

      <section className={`py-16 md:py-24 ${featured ? "bg-accent/30" : ""}`}>
        <Container>
          <SectionHeader
            title="Whitepaper Library"
            description="Browse, filter, and download our complete library of security research."
          />
          {whitepapers.length === 0 ? (
            <div className="mx-auto max-w-md text-center">
              <p className="mb-6 text-muted-foreground">
                No whitepapers published yet. Check back soon, or read our latest articles.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read Our Blog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <WhitepaperLibrary whitepapers={rest} categories={categories} />
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-black md:text-5xl">Get New Research First</h2>
            <p className="mb-8 text-lg opacity-90">
              Subscribe to be notified when we publish new whitepapers, reports, and security research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?subscribe=research"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-4 font-semibold text-foreground transition-colors hover:bg-background/90"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blogs"
                className="rounded-lg border border-primary-foreground/30 px-8 py-4 font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
