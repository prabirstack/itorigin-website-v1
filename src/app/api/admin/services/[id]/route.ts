import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";
import { updateServiceSchema } from "@/lib/validations/service";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Use standard query for Neon pooler compatibility
    const serviceResult = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);

    if (serviceResult.length === 0) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ service: serviceResult[0] });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to fetch service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const body = await request.json();
    const validatedData = updateServiceSchema.parse(body);

    // Check if service exists (use standard query for Neon pooler compatibility)
    const existingResult = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);

    if (existingResult.length === 0) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    const existing = existingResult[0];

    // If slug is being updated, check for duplicates
    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const slugExistsResult = await db
        .select({ id: services.id })
        .from(services)
        .where(and(
          eq(services.slug, validatedData.slug),
          ne(services.id, id)
        ))
        .limit(1);

      if (slugExistsResult.length > 0) {
        return NextResponse.json(
          { error: "A service with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const [service] = await db
      .update(services)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(services.id, id))
      .returning();

    return NextResponse.json({ service });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to update service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Use standard query for Neon pooler compatibility
    const existingResult = await db
      .select({ id: services.id })
      .from(services)
      .where(eq(services.id, id))
      .limit(1);

    if (existingResult.length === 0) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    await db.delete(services).where(eq(services.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to delete service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
