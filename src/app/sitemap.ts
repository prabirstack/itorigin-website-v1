import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://itorigin.com";

  // Static pages
  const staticPages = [
    "",
    "/services",
    "/services/managed-soc-services",
    "/services/offensive-security",
    "/services/grc-services",
    "/services/penetration-testing",
    "/services/vulnerability-assessment",
    "/services/security-audit",
    "/platform",
    "/partner",
    "/partner-portal",
    "/training",
    "/blogs",
    "/about",
    "/about/story",
    "/about/team",
    "/about/values",
    "/careers",
    "/case-studies",
    "/news",
    "/docs",
    "/security",
    "/best-practices",
    "/whitepapers",
    "/webinars",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/gdpr",
    "/sla",
    "/security-policy",
    "/sitemap",
    "/accessibility",
  ];

  const staticSitemapEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.9 : 0.8,
  }));

  // Dynamic blog pages (unchanged)
  const blogSitemapEntries = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic whitepaper detail pages
  let whitepaperSitemapEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await db
      .select({ slug: resources.slug, updatedAt: resources.updatedAt })
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")));
    whitepaperSitemapEntries = rows.map((r) => ({
      url: `${baseUrl}/whitepapers/${r.slug}`,
      lastModified: r.updatedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("sitemap: failed to load whitepapers", error);
  }

  return [...staticSitemapEntries, ...blogSitemapEntries, ...whitepaperSitemapEntries];
}
