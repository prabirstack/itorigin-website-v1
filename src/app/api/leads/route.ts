import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { nanoid } from "nanoid";
import { createLeadSchema, leadSourceSchema } from "@/lib/validations/lead";
import { sendContactNotificationEmail } from "@/lib/email";
import { z } from "zod";

const publicLeadSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: leadSourceSchema.optional().default("other"),
  resource: z.string().optional(), // For download tracking
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = publicLeadSchema.parse(body);

    // Create lead
    const [lead] = await db
      .insert(leads)
      .values({
        id: nanoid(),
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        phone: validatedData.phone || null,
        message: validatedData.message || null,
        source: validatedData.source,
        status: "new",
        notes: validatedData.resource
          ? `Downloaded: ${validatedData.resource}`
          : null,
      })
      .returning();

    // Send notification email for contact-related leads
    if (validatedData.source === "contact_form" || validatedData.message) {
      const emailResult = await sendContactNotificationEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: validatedData.message || "New lead submission",
      });

      if (!emailResult.success) {
        console.error("Failed to send notification:", emailResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Lead submission failed:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
