import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { posts, postRedirects } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { BlogDetailClient } from "@/components/blog/blog-detail-client";

// Force dynamic rendering to ensure fresh data from CMS
export const dynamic = "force-dynamic";

/**
 * Check if a slug has been redirected (for SEO preservation)
 * Returns the new slug if redirect exists, null otherwise
 */
async function checkSlugRedirect(oldSlug: string): Promise<string | null> {
  const redirectEntry = await db.query.postRedirects.findFirst({
    where: eq(postRedirects.oldSlug, oldSlug),
    with: {
      post: {
        columns: { slug: true, status: true },
      },
    },
  });

  // Only redirect if the post is published
  if (redirectEntry?.post?.status === "published") {
    return redirectEntry.post.slug;
  }

  return null;
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string) {
  const post = await db.query.posts.findFirst({
    where: and(eq(posts.slug, slug), eq(posts.status, "published")),
    with: {
      author: true,
      category: true,
      postTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  if (!post) return null;

  // Increment view count
  await db
    .update(posts)
    .set({ viewCount: (post.viewCount || 0) + 1 })
    .where(eq(posts.id, post.id));

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    content: post.content,
    category: post.category?.name || "Uncategorized",
    categoryId: post.categoryId,
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
  };
}

async function getAllPosts() {
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

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | IT Origin"
    };
  }

  return {
    title: `${post.title} | IT Origin Blog`,
    description: post.excerpt,
    keywords: [...post.tags, post.category, "cybersecurity", "IT Origin"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://itorigin.com/blogs/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      publishedTime: post.publishedAt,
      authors: [post.author.name]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    },
    alternates: {
      canonical: `https://itorigin.com/blogs/${post.slug}`
    }
  };
}

export async function generateStaticParams() {
  const postsData = await db.query.posts.findMany({
    where: eq(posts.status, "published"),
    columns: { slug: true },
  });

  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPost(slug),
    getAllPosts(),
  ]);

  if (!post) {
    // Check if this is an old slug that should redirect
    const newSlug = await checkSlugRedirect(slug);
    if (newSlug) {
      // 308 Permanent Redirect (preserves SEO link equity)
      redirect(`/blogs/${newSlug}`);
    }
    notFound();
  }

  return <BlogDetailClient post={post} allPosts={allPosts} />;
}
