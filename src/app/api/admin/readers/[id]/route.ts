import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, comments, posts } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Get user info
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Reader not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Get user's comments with post info
    const userComments = await db.query.comments.findMany({
      where: eq(comments.authorId, id),
      orderBy: [desc(comments.createdAt)],
      limit,
      offset,
      with: {
        post: {
          columns: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // Get total comment count
    const totalResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(comments)
      .where(eq(comments.authorId, id));

    const total = Number(totalResult[0]?.count || 0);

    // Get comment stats
    const statsResult = await db
      .select({
        total: sql<number>`COUNT(*)`,
        approved: sql<number>`COUNT(CASE WHEN ${comments.approved} = true THEN 1 END)`,
        pending: sql<number>`COUNT(CASE WHEN ${comments.approved} = false THEN 1 END)`,
      })
      .from(comments)
      .where(eq(comments.authorId, id));

    const stats = statsResult[0] || { total: 0, approved: 0, pending: 0 };

    return NextResponse.json({
      reader: user,
      stats: {
        totalComments: Number(stats.total),
        approvedComments: Number(stats.approved),
        pendingComments: Number(stats.pending),
      },
      comments: userComments,
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
    console.error("Error fetching reader:", error);
    return NextResponse.json(
      { error: "Failed to fetch reader" },
      { status: 500 }
    );
  }
}
