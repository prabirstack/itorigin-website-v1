import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  posts,
  leads,
  subscribers,
  comments,
  chatConversations,
  services,
  caseStudies,
  resources,
  resourceDownloads,
  categories,
  emailCampaigns,
} from "@/db/schema";
import { eq, sql, desc, gte } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET() {
  try {
    await requireAdmin();

    // Calculate date for "this month" stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Get all stats in parallel
    const [
      // Content stats
      publishedPostsCount,
      totalPostsCount,
      totalCategoriesCount,

      // Lead & Subscriber stats
      totalLeadsCount,
      newLeadsThisMonth,
      confirmedSubscribersCount,

      // Engagement stats
      pendingCommentsCount,
      approvedCommentsCount,
      activeChatCount,

      // Services & Case Studies
      publishedServicesCount,
      publishedCaseStudiesCount,
      featuredCaseStudiesCount,

      // Resources stats
      publishedResourcesCount,
      totalDownloadsCount,
      downloadsThisMonth,

      // Campaign stats
      totalCampaignsCount,
      sentCampaignsCount,

      // Recent data
      recentPosts,
      recentLeads,
      recentDownloads,
      topResources,
    ] = await Promise.all([
      // Published posts count
      db.select({ count: sql<number>`count(*)` }).from(posts).where(eq(posts.status, "published")),

      // Total posts count
      db.select({ count: sql<number>`count(*)` }).from(posts),

      // Categories count
      db.select({ count: sql<number>`count(*)` }).from(categories),

      // Total leads count
      db.select({ count: sql<number>`count(*)` }).from(leads),

      // New leads this month
      db.select({ count: sql<number>`count(*)` }).from(leads).where(gte(leads.createdAt, startOfMonth)),

      // Confirmed subscribers count
      db.select({ count: sql<number>`count(*)` }).from(subscribers).where(eq(subscribers.confirmed, true)),

      // Pending comments count
      db.select({ count: sql<number>`count(*)` }).from(comments).where(eq(comments.approved, false)),

      // Approved comments count
      db.select({ count: sql<number>`count(*)` }).from(comments).where(eq(comments.approved, true)),

      // Active chat conversations count
      db.select({ count: sql<number>`count(*)` }).from(chatConversations).where(eq(chatConversations.status, "active")),

      // Active services count
      db.select({ count: sql<number>`count(*)` }).from(services).where(eq(services.active, true)),

      // Published case studies count
      db.select({ count: sql<number>`count(*)` }).from(caseStudies).where(eq(caseStudies.status, "published")),

      // Featured case studies count
      db.select({ count: sql<number>`count(*)` }).from(caseStudies).where(eq(caseStudies.featured, true)),

      // Published resources count
      db.select({ count: sql<number>`count(*)` }).from(resources).where(eq(resources.status, "published")),

      // Total downloads
      db.select({ sum: sql<number>`COALESCE(SUM(download_count), 0)` }).from(resources),

      // Downloads this month
      db.select({ count: sql<number>`count(*)` }).from(resourceDownloads).where(gte(resourceDownloads.downloadedAt, startOfMonth)),

      // Total campaigns
      db.select({ count: sql<number>`count(*)` }).from(emailCampaigns),

      // Sent campaigns
      db.select({ count: sql<number>`count(*)` }).from(emailCampaigns).where(eq(emailCampaigns.status, "sent")),

      // Recent posts (top 5 by views) - use standard query for Neon pooler compatibility
      db.select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        viewCount: posts.viewCount,
        publishedAt: posts.publishedAt,
      })
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.viewCount))
        .limit(5),

      // Recent leads (last 5)
      db.select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        source: leads.source,
        createdAt: leads.createdAt,
      })
        .from(leads)
        .orderBy(desc(leads.createdAt))
        .limit(5),

      // Recent downloads (last 5) - using leftJoin for resource title
      db.select({
        id: resourceDownloads.id,
        name: resourceDownloads.name,
        email: resourceDownloads.email,
        downloadedAt: resourceDownloads.downloadedAt,
        resourceTitle: resources.title,
      })
        .from(resourceDownloads)
        .leftJoin(resources, eq(resourceDownloads.resourceId, resources.id))
        .orderBy(desc(resourceDownloads.downloadedAt))
        .limit(5),

      // Top resources by downloads
      db.select({
        id: resources.id,
        title: resources.title,
        slug: resources.slug,
        downloadCount: resources.downloadCount,
        type: resources.type,
      })
        .from(resources)
        .where(eq(resources.status, "published"))
        .orderBy(desc(resources.downloadCount))
        .limit(5),
    ]);

    return NextResponse.json({
      stats: {
        // Content
        publishedPosts: Number(publishedPostsCount[0]?.count || 0),
        totalPosts: Number(totalPostsCount[0]?.count || 0),
        categories: Number(totalCategoriesCount[0]?.count || 0),

        // Leads & Subscribers
        totalLeads: Number(totalLeadsCount[0]?.count || 0),
        newLeadsThisMonth: Number(newLeadsThisMonth[0]?.count || 0),
        confirmedSubscribers: Number(confirmedSubscribersCount[0]?.count || 0),

        // Engagement
        pendingComments: Number(pendingCommentsCount[0]?.count || 0),
        approvedComments: Number(approvedCommentsCount[0]?.count || 0),
        activeChats: Number(activeChatCount[0]?.count || 0),

        // Services & Case Studies
        activeServices: Number(publishedServicesCount[0]?.count || 0),
        publishedCaseStudies: Number(publishedCaseStudiesCount[0]?.count || 0),
        featuredCaseStudies: Number(featuredCaseStudiesCount[0]?.count || 0),

        // Resources
        publishedResources: Number(publishedResourcesCount[0]?.count || 0),
        totalDownloads: Number(totalDownloadsCount[0]?.sum || 0),
        downloadsThisMonth: Number(downloadsThisMonth[0]?.count || 0),

        // Campaigns
        totalCampaigns: Number(totalCampaignsCount[0]?.count || 0),
        sentCampaigns: Number(sentCampaignsCount[0]?.count || 0),
      },
      recentPosts,
      recentLeads,
      recentDownloads,
      topResources,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
