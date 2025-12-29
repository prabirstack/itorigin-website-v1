import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq, desc, and, like, sql, or, gte, lte } from "drizzle-orm";
import { createAppointmentSchema, appointmentQuerySchema } from "@/lib/validations/appointment";
import { requireAdmin } from "@/lib/auth-utils";
import { nanoid } from "nanoid";

// GET - List all appointments (admin)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const queryResult = appointmentQuerySchema.safeParse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || undefined,
      status: searchParams.get("status") || undefined,
      upcoming: searchParams.get("upcoming") || undefined,
      assignedTo: searchParams.get("assignedTo") || undefined,
      dateFrom: searchParams.get("dateFrom") || undefined,
      dateTo: searchParams.get("dateTo") || undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", issues: queryResult.error.issues },
        { status: 400 }
      );
    }

    const { page, limit, search, type, status, upcoming, assignedTo, dateFrom, dateTo } = queryResult.data;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (type) {
      conditions.push(eq(appointments.type, type));
    }

    if (status) {
      conditions.push(eq(appointments.status, status));
    }

    if (upcoming) {
      conditions.push(gte(appointments.scheduledAt, new Date()));
    }

    if (assignedTo) {
      conditions.push(eq(appointments.assignedTo, assignedTo));
    }

    if (dateFrom) {
      conditions.push(gte(appointments.scheduledAt, new Date(dateFrom)));
    }

    if (dateTo) {
      conditions.push(lte(appointments.scheduledAt, new Date(dateTo)));
    }

    if (search) {
      conditions.push(
        or(
          like(appointments.clientName, `%${search}%`),
          like(appointments.clientEmail, `%${search}%`),
          like(appointments.clientCompany, `%${search}%`),
          like(appointments.title, `%${search}%`)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get appointments with pagination
    const appointmentsList = await db
      .select()
      .from(appointments)
      .where(whereClause)
      .orderBy(desc(appointments.scheduledAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(appointments)
      .where(whereClause);

    const totalPages = Math.ceil(count / limit);

    // Get status counts for dashboard
    const statusCounts = await db
      .select({
        status: appointments.status,
        count: sql<number>`count(*)::int`,
      })
      .from(appointments)
      .groupBy(appointments.status);

    // Get type counts
    const typeCounts = await db
      .select({
        type: appointments.type,
        count: sql<number>`count(*)::int`,
      })
      .from(appointments)
      .groupBy(appointments.type);

    // Get today's appointments count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [{ count: todayCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(appointments)
      .where(
        and(
          gte(appointments.scheduledAt, today),
          lte(appointments.scheduledAt, tomorrow)
        )
      );

    return NextResponse.json({
      appointments: appointmentsList,
      statusCounts: statusCounts.reduce(
        (acc, { status, count }) => ({ ...acc, [status]: count }),
        { pending: 0, confirmed: 0, completed: 0, cancelled: 0, no_show: 0, rescheduled: 0 }
      ),
      typeCounts: typeCounts.reduce(
        (acc, { type, count }) => ({ ...acc, [type]: count }),
        { consultation: 0, demo: 0, discovery: 0, follow_up: 0, support: 0, training: 0 }
      ),
      todayCount,
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
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// POST - Create a new appointment
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = createAppointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Create the appointment
    const [newAppointment] = await db
      .insert(appointments)
      .values({
        id: nanoid(),
        title: data.title,
        description: data.description || null,
        type: data.type,
        status: data.status,
        scheduledAt: data.scheduledAt,
        duration: data.duration,
        timezone: data.timezone,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone || null,
        clientCompany: data.clientCompany || null,
        clientJobTitle: data.clientJobTitle || null,
        isVirtual: data.isVirtual,
        meetingUrl: data.meetingUrl || null,
        meetingId: data.meetingId || null,
        location: data.location || null,
        assignedTo: data.assignedTo || null,
        assignedEmail: data.assignedEmail || null,
        serviceInterest: data.serviceInterest || null,
        leadSource: data.leadSource || null,
        clientNotes: data.clientNotes || null,
        internalNotes: data.internalNotes || null,
        confirmedAt: data.status === "confirmed" ? new Date() : null,
      })
      .returning();

    return NextResponse.json({ appointment: newAppointment }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
