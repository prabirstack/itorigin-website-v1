import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { nanoid } from "nanoid";
import { contactFormSchema } from "@/lib/validations/lead";
import { sendContactNotificationEmail } from "@/lib/email";

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

    // Send notification email to admin
    const emailResult = await sendContactNotificationEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      message: validatedData.message,
    });

    if (!emailResult.success) {
      console.error("Failed to send contact notification:", emailResult.error);
      // Still return success as the lead was created
    }

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
