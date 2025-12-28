import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resources, resourceDownloads } from "@/db/schema";
import { eq, desc, and, like, sql } from "drizzle-orm";
import { downloadResourceSchema } from "@/lib/validations/resources";
import { leads } from "@/db/schema";

// GET - List published resources
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    // Build conditions - only show published resources
    const conditions = [eq(resources.status, "published")];

    if (type) {
      conditions.push(eq(resources.type, type as "whitepaper" | "ebook" | "guide" | "report" | "template" | "checklist" | "case-study" | "infographic" | "toolkit" | "other"));
    }

    if (category) {
      conditions.push(eq(resources.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(resources.featured, true));
    }

    if (search) {
      conditions.push(like(resources.title, `%${search}%`));
    }

    const whereClause = and(...conditions);

    // Get resources
    const resourcesList = await db
      .select()
      .from(resources)
      .where(whereClause)
      .orderBy(desc(resources.featured), desc(resources.publishDate), desc(resources.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(resources)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      resources: resourcesList,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST - Download a resource (captures lead and increments download count)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = downloadResourceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { resourceId, name, email, company } = result.data;

    // Get the resource
    const [resource] = await db
      .select()
      .from(resources)
      .where(and(
        eq(resources.id, resourceId),
        eq(resources.status, "published")
      ))
      .limit(1);

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Create or update lead
    const existingLead = await db
      .select()
      .from(leads)
      .where(eq(leads.email, email))
      .limit(1);

    let leadId: string | undefined;

    if (existingLead.length === 0) {
      const [newLead] = await db.insert(leads).values({
        name,
        email,
        company,
        source: "download",
        message: `Downloaded: ${resource.title}`,
        status: "new",
      }).returning();
      leadId = newLead.id;
    } else {
      leadId = existingLead[0].id;
      // Update the lead with latest download info
      await db.update(leads)
        .set({
          updatedAt: new Date(),
        })
        .where(eq(leads.id, leadId));
    }

    // Record the download
    await db.insert(resourceDownloads).values({
      resourceId,
      leadId,
      email,
      name,
      company,
      ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    // Increment download count
    await db.update(resources)
      .set({
        downloadCount: sql`${resources.downloadCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(resources.id, resourceId));

    return NextResponse.json({
      success: true,
      downloadUrl: resource.fileUrl,
      resource: {
        id: resource.id,
        title: resource.title,
        fileUrl: resource.fileUrl,
        fileName: resource.fileName,
      },
    });
  } catch (error) {
    console.error("Error processing download:", error);
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}
