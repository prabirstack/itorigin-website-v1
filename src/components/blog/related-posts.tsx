"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { type BlogPost } from "@/lib/blog-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface RelatedPostsProps {
  posts: BlogPost[];
  category: string;
}

export function RelatedPosts({ posts, category }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black">Related Articles</h2>
          </div>
          <Link
            href={`/blogs?category=${encodeURIComponent(category)}`}
            className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            <span className="hidden sm:inline">View all in {category}</span>
            <span className="sm:hidden">View all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Related Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts.map((post, index) => {
            const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            });

            return (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                custom={index * 0.1}
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="h-full flex flex-col p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    {/* Image Placeholder */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      {/* Category */}
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-black text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
