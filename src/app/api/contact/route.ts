import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { nanoid } from "nanoid";
import { contactFormSchema } from "@/lib/validations/lead";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Create lead from contact form
    const [lead] = await db
      .insert(leads)
      .values({
        id: nanoid(),
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        phone: validatedData.phone || null,
        message: validatedData.message,
        source: "contact_form",
        status: "new",
        notes: validatedData.service
          ? `Interested in: ${validatedData.service}`
          : null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We'll get back to you shortly.",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
