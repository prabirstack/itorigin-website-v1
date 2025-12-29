import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq, desc, ilike, and, sql } from "drizzle-orm";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const confirmed = searchParams.get("confirmed");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(subscribers.email, `%${search}%`));
    }

    if (confirmed === "true") {
      conditions.push(eq(subscribers.confirmed, true));
    } else if (confirmed === "false") {
      conditions.push(eq(subscribers.confirmed, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get subscribers
    const subscribersData = await db.query.subscribers.findMany({
      where: whereClause,
      orderBy: [desc(subscribers.createdAt)],
      limit,
      offset,
    });

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(subscribers)
      .where(whereClause);
    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      subscribers: subscribersData,
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
    console.error("Failed to fetch subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
