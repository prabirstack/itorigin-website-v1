import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogDetailClient } from "@/components/blog/blog-detail-client";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

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
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} allPosts={BLOG_POSTS} />;
}
