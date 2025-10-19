"use client";

import { useState, useMemo } from "react";
import { PageHero } from "@/components/about/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogCategoryFilter } from "@/components/blog/blog-category-filter";
import { type BlogPost, BLOG_CATEGORIES } from "@/lib/blog-data";

interface BlogListingClientProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 10;

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "FileText", text: "Blog" }}
        title="Security Insights"
        highlight="& Best Practices"
        description="Stay ahead of cyber threats with expert insights, in-depth analyses, and practical guidance from our security professionals."
      />

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <BlogCategoryFilter
            categories={BLOG_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Blog Grid with Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {currentPosts.length} of {filteredPosts.length} posts
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {/* Blog Cards */}
              {currentPosts.length > 0 ? (
                <div className="space-y-8">
                  {currentPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">
                    No blog posts found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All Posts");
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                posts={posts}
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
