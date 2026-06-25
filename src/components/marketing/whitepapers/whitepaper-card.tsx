"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/lib/animations";
import { type Resource } from "@/db/schema";

export function WhitepaperCard({ whitepaper }: { whitepaper: Resource }) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;
  const meta = [whitepaper.pages ? `${whitepaper.pages} pages` : null, whitepaper.readTime]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        href={`/whitepapers/${whitepaper.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-colors hover:border-primary/50"
      >
        <div className="relative aspect-3/2 overflow-hidden bg-muted">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={whitepaper.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
              <FileText className="h-12 w-12 text-primary/40" />
            </div>
          )}
          <div className="absolute left-4 top-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {whitepaper.category}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
            {whitepaper.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {whitepaper.shortDescription || whitepaper.description}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{meta}</span>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Read
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
