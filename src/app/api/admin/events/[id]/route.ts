import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events, eventRegistrations } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { updateEventSchema } from "@/lib/validations/event";
import { requireAdmin } from "@/lib/auth-utils";

type RouteContext = { params: Promise<{ id: string }> };

// GET - Get single event with registrations
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Get registration count
    const [{ count: registrationCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(eventRegistrations)
      .where(eq(eventRegistrations.eventId, id));

    // Get attended count
    const [{ count: attendedCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(eventRegistrations)
      .where(eq(eventRegistrations.eventId, id));

    return NextResponse.json({
      event,
      stats: {
        registrations: registrationCount,
        attended: attendedCount,
      },
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PATCH - Update event
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await req.json();

    // Check if event exists
    const [existingEvent] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    const result = updateEventSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug uniqueness if changed
    if (data.slug && data.slug !== existingEvent.slug) {
      const slugConflict = await db
        .select({ id: events.id })
        .from(events)
        .where(eq(events.slug, data.slug))
        .limit(1);

      if (slugConflict.length > 0) {
        return NextResponse.json(
          { error: "An event with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Determine if we need to set publishedAt
    const shouldSetPublishedAt =
      data.status === "upcoming" && existingEvent.status === "draft";

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription || null;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.startDate !== undefined) updateData.startDate = data.startDate;
    if (data.endDate !== undefined) updateData.endDate = data.endDate || null;
    if (data.timezone !== undefined) updateData.timezone = data.timezone;
    if (data.duration !== undefined) updateData.duration = data.duration || null;
    if (data.isVirtual !== undefined) updateData.isVirtual = data.isVirtual;
    if (data.location !== undefined) updateData.location = data.location || null;
    if (data.meetingUrl !== undefined) updateData.meetingUrl = data.meetingUrl || null;
    if (data.meetingId !== undefined) updateData.meetingId = data.meetingId || null;
    if (data.meetingPassword !== undefined) updateData.meetingPassword = data.meetingPassword || null;
    if (data.coverImage !== undefined) updateData.coverImage = data.coverImage || null;
    if (data.thumbnailImage !== undefined) updateData.thumbnailImage = data.thumbnailImage || null;
    if (data.recordingUrl !== undefined) updateData.recordingUrl = data.recordingUrl || null;
    if (data.speakers !== undefined) updateData.speakers = data.speakers;
    if (data.requiresRegistration !== undefined) updateData.requiresRegistration = data.requiresRegistration;
    if (data.maxAttendees !== undefined) updateData.maxAttendees = data.maxAttendees || null;
    if (data.registrationDeadline !== undefined) updateData.registrationDeadline = data.registrationDeadline || null;
    if (data.agenda !== undefined) updateData.agenda = data.agenda;
    if (data.topics !== undefined) updateData.topics = data.topics;
    if (data.targetAudience !== undefined) updateData.targetAudience = data.targetAudience || null;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.displayOrder !== undefined) updateData.displayOrder = data.displayOrder;
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle || null;
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription || null;

    if (shouldSetPublishedAt) {
      updateData.publishedAt = new Date();
    }

    // Update the event
    const [updatedEvent] = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [existingEvent] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Delete event (registrations will cascade due to FK)
    await db.delete(events).where(eq(events.id, id));

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
