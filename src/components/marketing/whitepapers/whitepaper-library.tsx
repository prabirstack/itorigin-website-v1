"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";
import { WhitepaperCard } from "./whitepaper-card";
import { type Resource } from "@/db/schema";

interface WhitepaperLibraryProps {
  whitepapers: Resource[];
  categories: string[];
}

const ALL = "All";

export function WhitepaperLibrary({ whitepapers, categories }: WhitepaperLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const chips = [ALL, ...categories];

  // ── CONTRIBUTION POINT (reserved for repo owner) ─────────────────────
  // Decide the listing UX:
  //  - "All" should return every whitepaper; any other chip filters by category.
  //  - Search should be case-insensitive. Decide which fields it matches —
  //    at minimum title; consider description/shortDescription and topics[].
  // Return the filtered Resource[].
  const filtered = useMemo<Resource[]>(() => {
    // TODO(owner): implement filtering by activeCategory + searchQuery
    return whitepapers;
  }, [whitepapers, activeCategory, searchQuery]);
  // ─────────────────────────────────────────────────────────────────────

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="wp-active-chip"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10",
                  activeCategory === cat
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search whitepapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <FileText className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-semibold">No whitepapers match your filters</p>
          <p className="text-sm text-muted-foreground">Try another category or search term.</p>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((wp) => (
            <WhitepaperCard key={wp.id} whitepaper={wp} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
