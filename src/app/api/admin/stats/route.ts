import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts, leads, subscribers, comments, chatConversations } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-utils";

export async function GET() {
  try {
    await requireAdmin();

    // Get all stats in parallel
    const [
      publishedPostsCount,
      totalLeadsCount,
      confirmedSubscribersCount,
      pendingCommentsCount,
      activeChatCount,
      recentPosts,
      recentLeads,
    ] = await Promise.all([
      // Published posts count
      db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
        .where(eq(posts.status, "published")),

      // Total leads count
      db.select({ count: sql<number>`count(*)` }).from(leads),

      // Confirmed subscribers count
      db
        .select({ count: sql<number>`count(*)` })
        .from(subscribers)
        .where(eq(subscribers.confirmed, true)),

      // Pending comments count
      db
        .select({ count: sql<number>`count(*)` })
        .from(comments)
        .where(eq(comments.approved, false)),

      // Active chat conversations count
      db
        .select({ count: sql<number>`count(*)` })
        .from(chatConversations)
        .where(eq(chatConversations.status, "active")),

      // Recent posts (top 5 by views)
      db.query.posts.findMany({
        where: eq(posts.status, "published"),
        orderBy: [desc(posts.viewCount)],
        limit: 5,
        columns: {
          id: true,
          title: true,
          slug: true,
          viewCount: true,
          publishedAt: true,
        },
      }),

      // Recent leads (last 5)
      db.query.leads.findMany({
        orderBy: [desc(leads.createdAt)],
        limit: 5,
        columns: {
          id: true,
          name: true,
          email: true,
          source: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        publishedPosts: Number(publishedPostsCount[0]?.count || 0),
        totalLeads: Number(totalLeadsCount[0]?.count || 0),
        confirmedSubscribers: Number(confirmedSubscribersCount[0]?.count || 0),
        pendingComments: Number(pendingCommentsCount[0]?.count || 0),
        activeChats: Number(activeChatCount[0]?.count || 0),
      },
      recentPosts,
      recentLeads,
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
