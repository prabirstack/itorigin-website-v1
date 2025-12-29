import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET() {
  try {
    await requireAdmin();
    // Get all subscribers
    const subscribersData = await db.query.subscribers.findMany({
      orderBy: [desc(subscribers.createdAt)],
    });

    // Create CSV content
    const headers = ["ID", "Email", "Name", "Confirmed", "Subscribed At", "Created At"];

    const rows = subscribersData.map((sub) => [
      sub.id,
      sub.email,
      `"${(sub.name || "").replace(/"/g, '""')}"`,
      sub.confirmed ? "Yes" : "No",
      sub.subscribedAt?.toISOString() || "",
      sub.createdAt.toISOString(),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=subscribers-${new Date().toISOString().split("T")[0]}.csv`,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to export subscribers:", error);
    return NextResponse.json(
      { error: "Failed to export subscribers" },
      { status: 500 }
    );
  }
}
