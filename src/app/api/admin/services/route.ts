import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { desc, sql, eq, ilike, and, asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-utils";
import { createServiceSchema } from "@/lib/validations/service";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(services.title, `%${search}%`));
    }

    if (status === "active") {
      conditions.push(eq(services.active, true));
    } else if (status === "inactive") {
      conditions.push(eq(services.active, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get services
    const servicesList = await db.query.services.findMany({
      where: whereClause,
      orderBy: [asc(services.displayOrder), desc(services.createdAt)],
      limit,
      offset,
    });

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(services)
      .where(whereClause);
    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      services: servicesList,
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
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validatedData = createServiceSchema.parse(body);

    // Check if slug already exists
    const existing = await db.query.services.findFirst({
      where: eq(services.slug, validatedData.slug),
    });

    if (existing) {
      return NextResponse.json(
        { error: "A service with this slug already exists" },
        { status: 400 }
      );
    }

    const [service] = await db
      .insert(services)
      .values({
        id: nanoid(),
        slug: validatedData.slug,
        title: validatedData.title,
        shortDescription: validatedData.shortDescription || null,
        description: validatedData.description,
        iconName: validatedData.iconName || null,
        coverImage: validatedData.coverImage || null,
        features: validatedData.features || [],
        benefits: validatedData.benefits || [],
        primaryColor: validatedData.primaryColor || null,
        secondaryColor: validatedData.secondaryColor || null,
        bgPattern: validatedData.bgPattern || null,
        active: validatedData.active ?? true,
        displayOrder: validatedData.displayOrder ?? 0,
      })
      .returning();

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
