import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { subscribers, leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { subscribeSchema } from "@/lib/validations/lead";
import { sendNewsletterConfirmEmail } from "@/lib/email";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in";

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

      // Resend confirmation email
      if (existingSubscriber.confirmToken) {
        const confirmUrl = `${BASE_URL}/api/newsletter/confirm/${existingSubscriber.confirmToken}`;
        await sendNewsletterConfirmEmail(
          validatedData.email,
          confirmUrl,
          existingSubscriber.name || undefined
        );
      }

      return NextResponse.json({
        success: true,
        message: "We've resent the confirmation email. Please check your inbox.",
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

    // Revalidate admin pages
    revalidatePath("/admin/subscribers");
    revalidatePath("/admin/leads");

    // Send confirmation email
    const confirmUrl = `${BASE_URL}/api/newsletter/confirm/${confirmToken}`;
    const emailResult = await sendNewsletterConfirmEmail(
      validatedData.email,
      confirmUrl,
      validatedData.name || undefined
    );

    if (!emailResult.success) {
      console.error("Failed to send confirmation email:", emailResult.error);
      // Still return success as the subscription was created
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Please check your email to confirm.",
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
