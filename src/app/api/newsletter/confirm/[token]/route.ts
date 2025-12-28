import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Find subscriber by confirm token
    const subscriber = await db.query.subscribers.findFirst({
      where: eq(subscribers.confirmToken, token),
    });

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
