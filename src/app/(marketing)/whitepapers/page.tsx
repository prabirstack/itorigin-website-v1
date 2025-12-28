import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Calendar, Clock, Tag } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { DownloadDialog } from "@/components/marketing/download-dialog";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Whitepapers & Research | IT Origin",
  description: "Download free cybersecurity whitepapers, research reports, and industry guides from IT Origin's security experts.",
  keywords: [
    "cybersecurity whitepapers",
    "security research",
    "threat reports",
    "security guides",
    "industry reports",
    "security resources"
  ],
  alternates: {
    canonical: "https://itorigin.com/whitepapers"
  }
};

// Revalidate every hour
export const revalidate = 3600;

async function getResources() {
  try {
    const allResources = await db
      .select()
      .from(resources)
      .where(eq(resources.status, "published"))
      .orderBy(desc(resources.featured), desc(resources.publishDate), desc(resources.createdAt));

    return allResources;
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

export default async function WhitepapersPage() {
  const allResources = await getResources();
  const featuredResources = allResources.filter(r => r.featured);
  const otherResources = allResources.filter(r => !r.featured);

  // Get unique categories
  const categoriesSet = new Set(allResources.map(r => r.category));
  const categories = Array.from(categoriesSet).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "FileText", text: "Resources" }}
        title="Whitepapers &"
        highlight="Research"
        description="In-depth research, industry reports, and practical guides from our security experts. Download free resources to enhance your security knowledge."
      />

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-20 md:py-32">
          <Container>
            <SectionHeader
              title="Featured Resources"
              description="Our most popular and impactful publications."
            />

            <div className="grid md:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {resource.category}
                    </span>
                    {resource.pages && (
                      <span className="text-sm text-muted-foreground">{resource.pages} pages</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.shortDescription || resource.description}</p>

                  {resource.topics && (resource.topics as string[]).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(resource.topics as string[]).map((topic) => (
                        <span key={topic} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    {resource.publishDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    )}
                    {resource.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.readTime}</span>
                      </div>
                    )}
                  </div>

                  <DownloadDialog
                    resourceId={resource.id}
                    resourceTitle={resource.title}
                    buttonText="Download Free"
                    downloadUrl={resource.fileUrl || undefined}
                    useResourcesApi={true}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Resources */}
      <section className={`py-20 md:py-32 ${featuredResources.length > 0 ? 'bg-accent/30' : ''}`}>
        <Container>
          <SectionHeader
            title={featuredResources.length > 0 ? "All Resources" : "Our Resources"}
            description="Browse our complete library of security publications."
          />

          {allResources.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No resources available yet</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for whitepapers, guides, and research reports.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Read Our Blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {otherResources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                        {resource.category}
                      </span>
                      {resource.publishDate && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{resource.shortDescription || resource.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {resource.pages && <span>{resource.pages} pages</span>}
                      {resource.readTime && <span>{resource.readTime}</span>}
                    </div>
                  </div>
                  <DownloadDialog
                    resourceId={resource.id}
                    resourceTitle={resource.title}
                    buttonText="Download"
                    buttonClassName="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                    downloadUrl={resource.fileUrl || undefined}
                    useResourcesApi={true}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 md:py-32">
          <Container>
            <SectionHeader
              title="Browse by Category"
              description="Find resources by topic area."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/whitepapers?category=${encodeURIComponent(category)}`}
                  className="p-4 rounded-xl border border-border bg-card text-center hover:border-primary transition-colors"
                >
                  <span className="font-medium">{category}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Get New Research First
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to be notified when we publish new whitepapers, reports, and security research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?subscribe=research"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blogs"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
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
