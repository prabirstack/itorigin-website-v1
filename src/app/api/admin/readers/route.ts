import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, comments, posts } from "@/db/schema";
import { eq, sql, desc, count } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Get users who have commented, with their comment counts
    const readersWithCounts = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        createdAt: users.createdAt,
        commentCount: count(comments.id),
        approvedComments: sql<number>`COUNT(CASE WHEN ${comments.approved} = true THEN 1 END)`,
        pendingComments: sql<number>`COUNT(CASE WHEN ${comments.approved} = false THEN 1 END)`,
      })
      .from(users)
      .innerJoin(comments, eq(comments.authorId, users.id))
      .groupBy(users.id)
      .orderBy(desc(sql`COUNT(${comments.id})`))
      .limit(limit)
      .offset(offset);

    // Get total count of users with comments
    const totalResult = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${comments.authorId})` })
      .from(comments)
      .where(sql`${comments.authorId} IS NOT NULL`);

    const total = Number(totalResult[0]?.count || 0);

    return NextResponse.json({
      readers: readersWithCounts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Error fetching readers:", error);
    return NextResponse.json(
      { error: "Failed to fetch readers" },
      { status: 500 }
    );
  }
}
