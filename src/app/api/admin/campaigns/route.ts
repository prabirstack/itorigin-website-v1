import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { emailCampaigns } from "@/db/schema";
import { desc, sql, eq, ilike, and } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";
import { createCampaignSchema } from "@/lib/validations/campaign";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const campaignType = searchParams.get("type");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(emailCampaigns.name, `%${search}%`));
    }

    if (status && status !== "all") {
      conditions.push(eq(emailCampaigns.status, status as any));
    }

    if (campaignType && campaignType !== "all") {
      conditions.push(eq(emailCampaigns.campaignType, campaignType as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get campaigns (use standard query for Neon pooler compatibility)
    const campaigns = await db
      .select()
      .from(emailCampaigns)
      .where(whereClause)
      .orderBy(desc(emailCampaigns.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(emailCampaigns)
      .where(whereClause);
    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      campaigns,
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
    console.error("Failed to fetch campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validatedData = createCampaignSchema.parse(body);

    const [campaign] = await db
      .insert(emailCampaigns)
      .values({
        id: nanoid(),
        name: validatedData.name,
        subject: validatedData.subject,
        previewText: validatedData.previewText || null,
        htmlContent: validatedData.htmlContent,
        status: "draft",
        campaignType: validatedData.campaignType || "one-time",
        recurringDay: validatedData.recurringDay || null,
        isRecurringActive: validatedData.isRecurringActive || false,
        attachments: validatedData.attachments || [],
        socialLinks: validatedData.socialLinks || null,
      })
      .returning();

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to create campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
