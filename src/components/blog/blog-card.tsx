"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { type BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      className="group"
    >
      <Link href={`/blogs/${post.slug}`}>
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
          {/* Image */}
          <div className="md:w-64 flex-shrink-0">
            <div className="relative w-full h-48 md:h-full rounded-xl overflow-hidden bg-accent">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              {post.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-auto">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-accent text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
