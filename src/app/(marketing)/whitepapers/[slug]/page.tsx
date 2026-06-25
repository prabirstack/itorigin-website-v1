import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";
import { WhitepaperDetail } from "@/components/marketing/whitepapers/whitepaper-detail";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getWhitepaper(slug: string) {
  const [wp] = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.slug, slug),
        eq(resources.type, "whitepaper"),
        eq(resources.status, "published"),
      ),
    )
    .limit(1);

  if (!wp) return null;

  await db
    .update(resources)
    .set({ viewCount: (wp.viewCount ?? 0) + 1 })
    .where(eq(resources.id, wp.id));

  return wp;
}

async function getRelated(category: string, excludeId: string) {
  return db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.type, "whitepaper"),
        eq(resources.status, "published"),
        eq(resources.category, category),
        ne(resources.id, excludeId),
      ),
    )
    .orderBy(desc(resources.publishDate))
    .limit(3);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wp = await getWhitepaper(slug);
  if (!wp) return { title: "Whitepaper Not Found | ITOrigin" };

  const description = wp.metaDescription || wp.shortDescription || wp.description;
  return {
    title: wp.metaTitle || `${wp.title} | ITOrigin Whitepapers`,
    description,
    openGraph: {
      title: wp.title,
      description,
      type: "article",
      url: `https://itorigin.com/whitepapers/${wp.slug}`,
      images: wp.coverImageUrl ? [{ url: wp.coverImageUrl }] : undefined,
    },
    alternates: { canonical: `https://itorigin.com/whitepapers/${wp.slug}` },
  };
}

export async function generateStaticParams() {
  try {
    const rows = await db
      .select({ slug: resources.slug })
      .from(resources)
      .where(and(eq(resources.type, "whitepaper"), eq(resources.status, "published")));
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export default async function WhitepaperDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const whitepaper = await getWhitepaper(slug);
  if (!whitepaper) notFound();

  const related = await getRelated(whitepaper.category, whitepaper.id);
  return <WhitepaperDetail whitepaper={whitepaper} related={related} />;
}
