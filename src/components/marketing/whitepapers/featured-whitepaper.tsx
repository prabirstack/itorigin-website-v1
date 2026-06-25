"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, ArrowRight, FileStack, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadDialog } from "@/components/marketing/download-dialog";
import { fadeInUp } from "@/lib/animations";
import { type Resource } from "@/db/schema";

export function FeaturedWhitepaper({ whitepaper }: { whitepaper: Resource }) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div className="grid items-stretch gap-0 md:grid-cols-2">
        <div className="relative min-h-60 overflow-hidden bg-muted md:min-h-80">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={whitepaper.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/15 to-primary/5">
              <FileText className="h-20 w-20 text-primary/40" />
            </div>
          )}
          <div className="absolute left-5 top-5 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {whitepaper.category}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10">
          <h3 className="text-2xl font-black leading-tight md:text-3xl">
            {whitepaper.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-muted-foreground">
            {whitepaper.shortDescription || whitepaper.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            {whitepaper.pages ? (
              <span className="inline-flex items-center gap-1.5">
                <FileStack className="h-4 w-4" /> {whitepaper.pages} pages
              </span>
            ) : null}
            {whitepaper.readTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {whitepaper.readTime}
              </span>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href={`/whitepapers/${whitepaper.slug}`}>
                Read whitepaper <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <DownloadDialog
              resourceId={whitepaper.id}
              resourceTitle={whitepaper.title}
              buttonText="Download PDF"
              downloadUrl={whitepaper.fileUrl || undefined}
              useResourcesApi
              buttonClassName="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
