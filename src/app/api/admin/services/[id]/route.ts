import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-utils";
import { updateServiceSchema } from "@/lib/validations/service";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const service = await db.query.services.findFirst({
      where: eq(services.id, id),
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ service });
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

    // Check if service exists
    const existing = await db.query.services.findFirst({
      where: eq(services.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // If slug is being updated, check for duplicates
    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const slugExists = await db.query.services.findFirst({
        where: and(
          eq(services.slug, validatedData.slug),
          ne(services.id, id)
        ),
      });

      if (slugExists) {
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

    const existing = await db.query.services.findFirst({
      where: eq(services.id, id),
    });

    if (!existing) {
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
