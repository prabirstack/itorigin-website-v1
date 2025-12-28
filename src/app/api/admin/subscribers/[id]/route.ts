import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-utils";

type Params = Promise<{ id: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Check if subscriber exists
    const existing = await db.query.subscribers.findFirst({
      where: eq(subscribers.id, id),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    await db.delete(subscribers).where(eq(subscribers.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to delete subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
