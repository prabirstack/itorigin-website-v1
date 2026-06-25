import Link from "next/link";
import { ArrowLeft, FileStack, Clock, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContentProse } from "@/components/common/content-prose";
import { WhitepaperToc } from "./whitepaper-toc";
import { addHeadingIds } from "@/lib/whitepaper-toc";
import { DownloadDialog } from "@/components/marketing/download-dialog";
import { WhitepaperCard } from "./whitepaper-card";
import { type Resource } from "@/db/schema";

interface WhitepaperDetailProps {
  whitepaper: Resource;
  related: Resource[];
}

export function WhitepaperDetail({ whitepaper, related }: WhitepaperDetailProps) {
  const cover = whitepaper.coverImageUrl || whitepaper.thumbnailUrl;
  const published = whitepaper.publishDate
    ? new Date(whitepaper.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const topics = (whitepaper.topics ?? []) as string[];
  const { html: contentHtml, headings } = whitepaper.content
    ? addHeadingIds(whitepaper.content)
    : { html: "", headings: [] };

  return (
    <div className="min-h-screen">
      <section className="border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/whitepapers"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Whitepapers
          </Link>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left: TOC (derived from content) */}
          {headings.length > 0 && (
            <div className="hidden lg:col-span-3 lg:block">
              <WhitepaperToc headings={headings} />
            </div>
          )}

          {/* Center: article */}
          <div className={headings.length > 0 ? "lg:col-span-6" : "lg:col-span-9"}>
            <Badge variant="secondary" className="mb-5">{whitepaper.category}</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">{whitepaper.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground">
              {published && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {published}
                </span>
              )}
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

            {cover && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover} alt={whitepaper.title} className="h-auto w-full object-cover" />
              </div>
            )}

            <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
              {whitepaper.shortDescription || whitepaper.description}
            </p>

            {whitepaper.content ? (
              <div className="mt-8">
                <ContentProse html={contentHtml} />
              </div>
            ) : null}

            {topics.length > 0 && (
              <>
                <Separator className="my-10" />
                <div className="flex flex-wrap gap-3">
                  {topics.map((t) => (
                    <span key={t} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: sticky download card */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Download this whitepaper</h3>
                <p className="mt-1 mb-5 text-sm text-muted-foreground">
                  Get the full PDF{whitepaper.pages ? ` (${whitepaper.pages} pages)` : ""} delivered to your inbox.
                </p>
                <DownloadDialog
                  resourceId={whitepaper.id}
                  resourceTitle={whitepaper.title}
                  buttonText="Download Free PDF"
                  downloadUrl={whitepaper.fileUrl || undefined}
                  useResourcesApi
                />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-black">Related whitepapers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((wp) => (
                <WhitepaperCard key={wp.id} whitepaper={wp} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
