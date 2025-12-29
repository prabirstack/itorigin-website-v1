import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, desc, and, like, sql, or, gte } from "drizzle-orm";
import { createEventSchema, eventQuerySchema } from "@/lib/validations/event";
import { requireAdmin } from "@/lib/auth-utils";
import { nanoid } from "nanoid";

// GET - List all events (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const queryResult = eventQuerySchema.safeParse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || undefined,
      status: searchParams.get("status") || undefined,
      featured: searchParams.get("featured") || undefined,
      upcoming: searchParams.get("upcoming") || undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", issues: queryResult.error.issues },
        { status: 400 }
      );
    }

    const { page, limit, search, type, status, featured, upcoming } = queryResult.data;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (type) {
      conditions.push(eq(events.type, type));
    }

    if (status) {
      conditions.push(eq(events.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(events.featured, featured));
    }

    if (upcoming) {
      conditions.push(gte(events.startDate, new Date()));
    }

    if (search) {
      conditions.push(
        or(
          like(events.title, `%${search}%`),
          like(events.description, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get events with pagination
    const eventsList = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(desc(events.startDate))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(events)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get status counts for dashboard
    const statusCounts = await db
      .select({
        status: events.status,
        count: sql<number>`count(*)::int`,
      })
      .from(events)
      .groupBy(events.status);

    // Get type counts
    const typeCounts = await db
      .select({
        type: events.type,
        count: sql<number>`count(*)::int`,
      })
      .from(events)
      .groupBy(events.type);

    return NextResponse.json({
      events: eventsList,
      statusCounts: statusCounts.reduce(
        (acc, { status, count }) => ({ ...acc, [status]: count }),
        { draft: 0, upcoming: 0, live: 0, completed: 0, cancelled: 0 }
      ),
      typeCounts: typeCounts.reduce(
        (acc, { type, count }) => ({ ...acc, [type]: count }),
        { webinar: 0, workshop: 0, conference: 0, meetup: 0, training: 0 }
      ),
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST - Create a new event
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = createEventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if slug is unique
    const existingEvent = await db
      .select({ id: events.id })
      .from(events)
      .where(eq(events.slug, data.slug))
      .limit(1);

    if (existingEvent.length > 0) {
      return NextResponse.json(
        { error: "An event with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the event
    const [newEvent] = await db
      .insert(events)
      .values({
        id: nanoid(),
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription || null,
        type: data.type,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate || null,
        timezone: data.timezone,
        duration: data.duration || null,
        isVirtual: data.isVirtual,
        location: data.location || null,
        meetingUrl: data.meetingUrl || null,
        meetingId: data.meetingId || null,
        meetingPassword: data.meetingPassword || null,
        coverImage: data.coverImage || null,
        thumbnailImage: data.thumbnailImage || null,
        recordingUrl: data.recordingUrl || null,
        speakers: data.speakers,
        requiresRegistration: data.requiresRegistration,
        maxAttendees: data.maxAttendees || null,
        registrationDeadline: data.registrationDeadline || null,
        agenda: data.agenda,
        topics: data.topics,
        targetAudience: data.targetAudience || null,
        featured: data.featured,
        displayOrder: data.displayOrder,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        publishedAt: data.status === "upcoming" ? new Date() : null,
      })
      .returning();

    return NextResponse.json({ event: newEvent }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
