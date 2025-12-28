import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers, leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { subscribeSchema } from "@/lib/validations/lead";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = subscribeSchema.parse(body);

    // Check if already subscribed
    const existingSubscriber = await db.query.subscribers.findFirst({
      where: eq(subscribers.email, validatedData.email),
    });

    if (existingSubscriber) {
      if (existingSubscriber.confirmed) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed to our newsletter!",
          alreadySubscribed: true,
        });
      }

      // Resend confirmation (in a real app, you'd send an email here)
      return NextResponse.json({
        success: true,
        message: "Please check your email to confirm your subscription.",
        pendingConfirmation: true,
      });
    }

    // Create new subscriber
    const confirmToken = nanoid(32);
    const unsubscribeToken = nanoid(32);

    await db.insert(subscribers).values({
      id: nanoid(),
      email: validatedData.email,
      name: validatedData.name || null,
      confirmed: false,
      confirmToken,
      unsubscribeToken,
    });

    // Also create a lead for tracking
    await db.insert(leads).values({
      id: nanoid(),
      email: validatedData.email,
      name: validatedData.name || "Newsletter Subscriber",
      source: "newsletter",
      status: "new",
      message: "Subscribed to newsletter",
    });

    // In a real app, you would send a confirmation email here
    // For now, we'll auto-confirm for development
    // TODO: Implement email sending with Resend in Phase 6

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Please check your email to confirm.",
      // For development, include the confirm token
      ...(process.env.NODE_ENV === "development" && { confirmToken }),
    });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid email address", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
