import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

export async function GET() {
  try {
    await requireAdmin();
    // Get all leads (use standard query for Neon pooler compatibility)
    const leadsData = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Email",
      "Company",
      "Phone",
      "Message",
      "Status",
      "Source",
      "Notes",
      "Created At",
    ];

    const rows = leadsData.map((lead) => [
      lead.id,
      `"${(lead.name || "").replace(/"/g, '""')}"`,
      lead.email,
      `"${(lead.company || "").replace(/"/g, '""')}"`,
      lead.phone || "",
      `"${(lead.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      lead.status,
      lead.source,
      `"${(lead.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      lead.createdAt.toISOString(),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=leads-${new Date().toISOString().split("T")[0]}.csv`,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to export leads:", error);
    return NextResponse.json(
      { error: "Failed to export leads" },
      { status: 500 }
    );
  }
}
