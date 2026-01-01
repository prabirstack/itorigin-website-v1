import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { sendNewsletterWelcomeEmail } from "@/lib/email";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Find subscriber by confirm token using standard SQL for Neon pooler compatibility
    const subscriberResult = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.confirmToken, sql`${token}`))
      .limit(1);
    const subscriber = subscriberResult[0];

    if (!subscriber) {
      // Redirect to error page
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=invalid-token", request.url)
      );
    }

    if (subscriber.confirmed) {
      // Already confirmed, redirect to success
      return NextResponse.redirect(
        new URL("/newsletter/confirmed?already=true", request.url)
      );
    }

    // Confirm the subscription
    await db
      .update(subscribers)
      .set({
        confirmed: true,
        confirmToken: null,
        subscribedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(subscribers.id, subscriber.id));

    // Send welcome email
    if (subscriber.unsubscribeToken) {
      const unsubscribeUrl = `${BASE_URL}/api/newsletter/unsubscribe/${subscriber.unsubscribeToken}`;
      await sendNewsletterWelcomeEmail(
        subscriber.email,
        unsubscribeUrl,
        subscriber.name || undefined
      );
    }

    // Redirect to success page
    return NextResponse.redirect(
      new URL("/newsletter/confirmed", request.url)
    );
  } catch (error) {
    console.error("Newsletter confirmation failed:", error);
    return NextResponse.redirect(
      new URL("/newsletter/error?reason=server-error", request.url)
    );
  }
}
