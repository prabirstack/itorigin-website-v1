import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatEmailVerifications } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq, and, gt } from "drizzle-orm";
import { z } from "zod";
import { sendChatVerificationEmail } from "@/lib/email";
import {
  isBlockedEmailDomain,
  isValidEmailFormat,
  generateVerificationPin,
  getEmailDomain,
} from "@/lib/email-validation";
import { withRateLimit } from "@/lib/rate-limit";

const sendVerificationSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(request: NextRequest) {
  // Apply rate limiting (5 verification requests per minute per IP)
  const rateLimitResponse = await withRateLimit(request, "chat-verify");
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const { email, name } = sendVerificationSchema.parse(body);

    // Validate email format
    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email is from a blocked free provider
    if (isBlockedEmailDomain(email)) {
      const domain = getEmailDomain(email);
      return NextResponse.json(
        {
          error: "Personal email not allowed",
          message: `Please use your company email address. Free email providers like ${domain} are not accepted.`,
          code: "BLOCKED_DOMAIN",
        },
        { status: 400 }
      );
    }

    // Check if there's already a recent pending verification for this email (prevent spam)
    const recentVerification = await db
      .select()
      .from(chatEmailVerifications)
      .where(
        and(
          eq(chatEmailVerifications.email, email.toLowerCase()),
          eq(chatEmailVerifications.verified, false),
          gt(chatEmailVerifications.expiresAt, new Date())
        )
      )
      .limit(1);

    // If there's a recent verification less than 1 minute old, prevent resend
    if (recentVerification.length > 0) {
      const createdAt = recentVerification[0].createdAt;
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      if (createdAt > oneMinuteAgo) {
        return NextResponse.json(
          {
            error: "Please wait",
            message: "A verification code was recently sent. Please wait a minute before requesting a new one.",
            code: "RATE_LIMITED",
          },
          { status: 429 }
        );
      }
    }

    // Generate PIN and expiry (10 minutes)
    const pin = generateVerificationPin();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Create verification record
    const [verification] = await db
      .insert(chatEmailVerifications)
      .values({
        id: nanoid(),
        email: email.toLowerCase(),
        name,
        pin,
        verified: false,
        expiresAt,
      })
      .returning();

    // Send verification email
    const emailResult = await sendChatVerificationEmail(email, name, pin);

    if (!emailResult.success) {
      // Clean up the verification record if email failed
      await db
        .delete(chatEmailVerifications)
        .where(eq(chatEmailVerifications.id, verification.id));

      console.error("Chat verification email failed:", emailResult.error);

      return NextResponse.json(
        {
          error: "Failed to send email",
          message: "Could not send verification email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email",
      verificationId: verification.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Chat verification error:", error);
    return NextResponse.json(
      { error: "Failed to send verification" },
      { status: 500 }
    );
  }
}
