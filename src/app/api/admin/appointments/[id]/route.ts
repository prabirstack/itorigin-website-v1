import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateAppointmentSchema } from "@/lib/validations/appointment";
import { requireAdmin } from "@/lib/auth-utils";

type RouteContext = { params: Promise<{ id: string }> };

// GET - Get single appointment
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

// PATCH - Update appointment
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await req.json();

    // Check if appointment exists
    const [existingAppointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!existingAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const result = updateAppointmentSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description || null;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.status !== undefined) {
      updateData.status = data.status;
      // Set timestamps based on status changes
      if (data.status === "confirmed" && existingAppointment.status !== "confirmed") {
        updateData.confirmedAt = new Date();
      }
      if (data.status === "completed" && existingAppointment.status !== "completed") {
        updateData.completedAt = new Date();
      }
      if (data.status === "cancelled" && existingAppointment.status !== "cancelled") {
        updateData.cancelledAt = new Date();
      }
      if (data.status === "rescheduled") {
        updateData.rescheduledCount = (existingAppointment.rescheduledCount || 0) + 1;
        updateData.originalScheduledAt = existingAppointment.originalScheduledAt || existingAppointment.scheduledAt;
      }
    }
    if (data.scheduledAt !== undefined) updateData.scheduledAt = data.scheduledAt;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.timezone !== undefined) updateData.timezone = data.timezone;
    if (data.clientName !== undefined) updateData.clientName = data.clientName;
    if (data.clientEmail !== undefined) updateData.clientEmail = data.clientEmail;
    if (data.clientPhone !== undefined) updateData.clientPhone = data.clientPhone || null;
    if (data.clientCompany !== undefined) updateData.clientCompany = data.clientCompany || null;
    if (data.clientJobTitle !== undefined) updateData.clientJobTitle = data.clientJobTitle || null;
    if (data.isVirtual !== undefined) updateData.isVirtual = data.isVirtual;
    if (data.meetingUrl !== undefined) updateData.meetingUrl = data.meetingUrl || null;
    if (data.meetingId !== undefined) updateData.meetingId = data.meetingId || null;
    if (data.location !== undefined) updateData.location = data.location || null;
    if (data.assignedTo !== undefined) updateData.assignedTo = data.assignedTo || null;
    if (data.assignedEmail !== undefined) updateData.assignedEmail = data.assignedEmail || null;
    if (data.serviceInterest !== undefined) updateData.serviceInterest = data.serviceInterest || null;
    if (data.leadSource !== undefined) updateData.leadSource = data.leadSource || null;
    if (data.clientNotes !== undefined) updateData.clientNotes = data.clientNotes || null;
    if (data.internalNotes !== undefined) updateData.internalNotes = data.internalNotes || null;
    if (data.meetingNotes !== undefined) updateData.meetingNotes = data.meetingNotes || null;
    if (data.cancelReason !== undefined) updateData.cancelReason = data.cancelReason || null;

    // Update the appointment
    const [updatedAppointment] = await db
      .update(appointments)
      .set(updateData)
      .where(eq(appointments.id, id))
      .returning();

    return NextResponse.json({ appointment: updatedAppointment });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete appointment
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [existingAppointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (!existingAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    await db.delete(appointments).where(eq(appointments.id, id));

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
