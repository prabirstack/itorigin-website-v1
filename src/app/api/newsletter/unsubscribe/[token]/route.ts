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

    // Find subscriber by unsubscribe token
    const subscriber = await db.query.subscribers.findFirst({
      where: eq(subscribers.unsubscribeToken, token),
    });

    if (!subscriber) {
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=invalid-token", request.url)
      );
    }

    // Delete the subscriber
    await db.delete(subscribers).where(eq(subscribers.id, subscriber.id));

    // Redirect to unsubscribed page
    return NextResponse.redirect(
      new URL("/newsletter/unsubscribed", request.url)
    );
  } catch (error) {
    console.error("Unsubscribe failed:", error);
    return NextResponse.redirect(
      new URL("/newsletter/error?reason=server-error", request.url)
    );
  }
}
