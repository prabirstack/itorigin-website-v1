"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { type BlogPost, BLOG_CATEGORIES, getPopularBlogs } from "@/lib/blog-data";

interface BlogDetailSidebarProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export function BlogDetailSidebar({ post, allPosts }: BlogDetailSidebarProps) {
  const [searchInput, setSearchInput] = useState("");
  const [copied, setCopied] = useState(false);
  const popularPosts = getPopularBlogs(5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/blogs?search=${encodeURIComponent(searchInput)}`;
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-8">
      {/* Search Bar */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="text-lg font-black mb-4">Search Blog</h3>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </form>
      </div>

      {/* Share Article */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-black">Share Article</h3>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <span className="font-medium">Share on Twitter</span>
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="font-medium">Share on LinkedIn</span>
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Facebook className="w-5 h-5 text-[#1877F2]" />
            <span className="font-medium">Share on Facebook</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-500">Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                <span className="font-medium">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="text-lg font-black mb-4">Categories</h3>
        <div className="space-y-2">
          {BLOG_CATEGORIES.slice(1).map((category) => {
            const count = allPosts.filter((p) => p.category === category).length;

            return (
              <Link
                key={category}
                href={`/blogs?category=${encodeURIComponent(category)}`}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent transition-colors group"
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {category}
                </span>
                <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded-full">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Most Popular */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-black">Most Popular</h3>
        </div>
        <div className="space-y-4">
          {popularPosts.map((popularPost) => (
            <Link
              key={popularPost.id}
              href={`/blogs/${popularPost.slug}`}
              className="block group"
            >
              <div className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="mb-2">
                  <span className="text-xs text-primary font-semibold">
                    {popularPost.category}
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {popularPost.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{popularPost.readTime}</span>
                  <span>•</span>
                  <span>
                    {new Date(popularPost.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="p-6 rounded-2xl border border-primary bg-primary/5">
        <h3 className="text-lg font-black mb-2">Stay Updated</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest security insights delivered to your inbox.
        </p>
        <Link
          href="/contact"
          className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Subscribe to Newsletter
        </Link>
      </div>
    </div>
  );
}
