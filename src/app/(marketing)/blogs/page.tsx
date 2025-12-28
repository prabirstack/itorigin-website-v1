import { Metadata } from "next";
import { BlogListingClient } from "@/components/blog/blog-listing-client";
import { BLOG_POSTS } from "@/lib/blog-data";

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

export default function BlogsPage() {
  return <BlogListingClient posts={BLOG_POSTS} />;
}
