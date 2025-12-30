import { Metadata } from "next";
import { BlogListingClient } from "@/components/blog/blog-listing-client";
import { db } from "@/db";
import { posts, categories } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";

// Force dynamic rendering to ensure fresh data from CMS
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cybersecurity Blog | Latest Security Insights & Best Practices | IT Origin",
  description: "Stay informed with IT Origin's cybersecurity blog. Expert insights on threat intelligence, penetration testing, compliance, cloud security, and security operations.",
  keywords: [
    "cybersecurity blog",
    "security insights",
    "threat intelligence",
    "penetration testing blog",
    "security best practices",
    "compliance updates",
    "cloud security blog",
    "security operations",
    "incident response"
  ],
  openGraph: {
    title: "Cybersecurity Blog | Latest Security Insights & Best Practices | IT Origin",
    description: "Expert insights on threat intelligence, penetration testing, compliance, and security operations.",
    type: "website",
    url: "https://itorigin.com/blogs",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Cybersecurity Blog"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Blog | Latest Security Insights & Best Practices",
    description: "Expert insights on threat intelligence, penetration testing, compliance, and security operations.",
    images: ["/images/og-blog.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/blogs"
  }
};

async function getBlogPosts() {
  const postsData = await db.query.posts.findMany({
    where: eq(posts.status, "published"),
    with: {
      author: true,
      category: true,
      postTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(posts.publishedAt)],
  });

  return postsData.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    content: post.content,
    category: post.category?.name || "Uncategorized",
    author: {
      name: post.author?.name || "IT Origin Team",
      avatar: post.author?.image || "/images/authors/default-avatar.jpg",
      role: post.author?.role === "admin" ? "Security Expert" : "Contributor",
    },
    publishedAt: post.publishedAt?.toISOString().split("T")[0] || "",
    readTime: `${post.readingTime || 5} min read`,
    image: post.coverImage || "/images/blog/default-cover.jpg",
    tags: post.postTags.map((pt) => pt.tag.name),
    featured: post.viewCount ? post.viewCount > 500 : false,
  }));
}

async function getCategories() {
  const categoriesData = await db.query.categories.findMany({
    orderBy: [asc(categories.name)],
  });
  return ["All Posts", ...categoriesData.map((c) => c.name)];
}

export default async function BlogsPage() {
  const [blogPosts, blogCategories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  return <BlogListingClient posts={blogPosts} categories={blogCategories} />;
}
