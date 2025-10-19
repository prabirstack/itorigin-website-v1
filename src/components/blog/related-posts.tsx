"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";

interface RelatedPostsProps {
  posts: BlogPost[];
  category: string;
}

export function RelatedPosts({ posts, category }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">Related Articles</h2>
        <Link
          href={`/blogs?category=${encodeURIComponent(category)}`}
          className="text-primary font-semibold hover:underline flex items-center gap-2"
        >
          <span>View all in {category}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          });

          return (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group"
            >
              <article className="h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
                {/* Image Placeholder */}
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-accent mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
