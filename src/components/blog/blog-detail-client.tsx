"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ThumbsUp, MessageCircle } from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";
import { BlogDetailSidebar } from "@/components/blog/blog-detail-sidebar";
import { BlogComments } from "@/components/blog/blog-comments";
import { RelatedPosts } from "@/components/blog/related-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { NewsletterForm } from "@/components/blog/newsletter-form";

interface BlogDetailClientProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export function BlogDetailClient({ post, allPosts }: BlogDetailClientProps) {
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Get related posts from the same category
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Table of Contents - Left Sidebar (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-3">
              <TableOfContents />
            </div>

            {/* Article Content */}
            <div className="lg:col-span-6">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-accent mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                {post.featured && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Featured Article
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Placeholder content - would be replaced with actual markdown/rich text */}
                <h2 id="introduction" className="text-3xl font-black mt-8 mb-4">Introduction</h2>
                <p>
                  In today's rapidly evolving threat landscape, organizations face unprecedented challenges
                  in protecting their digital assets. This comprehensive guide explores the latest strategies,
                  tools, and best practices that security professionals are using to stay ahead of cyber threats.
                </p>

                <h2 id="key-takeaways" className="text-3xl font-black mt-8 mb-4">Key Takeaways</h2>
                <ul className="space-y-2">
                  <li>Understanding modern threat vectors and attack patterns</li>
                  <li>Implementing defense-in-depth security strategies</li>
                  <li>Leveraging automation and AI for threat detection</li>
                  <li>Building a security-aware organizational culture</li>
                </ul>

                <h2 id="best-practices" className="text-3xl font-black mt-8 mb-4">Best Practices</h2>
                <p>
                  Security teams must adopt a proactive approach that combines technical controls,
                  process improvements, and continuous monitoring. Here are the essential practices
                  that every organization should implement.
                </p>

                <h3 id="continuous-monitoring" className="text-2xl font-bold mt-6 mb-3">1. Continuous Monitoring</h3>
                <p>
                  Implement 24/7 security monitoring with advanced SIEM platforms and threat intelligence
                  feeds to detect and respond to threats in real-time.
                </p>

                <h3 id="security-assessments" className="text-2xl font-bold mt-6 mb-3">2. Regular Security Assessments</h3>
                <p>
                  Conduct periodic penetration testing and vulnerability assessments to identify
                  weaknesses before attackers can exploit them.
                </p>

                <h2 id="conclusion" className="text-3xl font-black mt-8 mb-4">Conclusion</h2>
                <p>
                  By implementing these strategies and maintaining a strong security posture,
                  organizations can significantly reduce their risk exposure and protect their
                  critical assets from evolving cyber threats.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-accent rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Like and Comment Stats */}
              <div className="flex items-center gap-6 p-6 rounded-2xl border border-border bg-card mb-8">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    hasLiked
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-accent"
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{likes} Likes</span>
                </button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-5 h-5" />
                  <span>12 Comments</span>
                </div>
              </div>

              {/* Author Bio */}
              <div className="p-8 rounded-2xl border border-border bg-card mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">About {post.author.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.author.role} at IT Origin with extensive experience in cybersecurity,
                      threat detection, and security operations. Passionate about sharing knowledge
                      and helping organizations improve their security posture.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="text-primary hover:underline text-sm font-semibold"
                      >
                        More articles by {post.author.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="my-12">
                <NewsletterForm />
              </div>

              {/* Comments Section */}
              <BlogComments />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} category={post.category} />
              )}
            </div>

            {/* Sticky Sidebar - Right */}
            <div className="lg:col-span-3">
              <BlogDetailSidebar post={post} allPosts={allPosts} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
