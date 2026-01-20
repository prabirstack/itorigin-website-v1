import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatEmailVerifications } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { z } from "zod";
import { withRateLimit } from "@/lib/rate-limit";

const confirmVerificationSchema = z.object({
  verificationId: z.string().min(1, "Verification ID is required"),
  pin: z.string().length(6, "PIN must be 6 digits"),
});

export async function POST(request: NextRequest) {
  // Apply rate limiting (10 attempts per minute per IP)
  const rateLimitResponse = await withRateLimit(request, "chat-verify-confirm");
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const { verificationId, pin } = confirmVerificationSchema.parse(body);

    // Find the verification record
    const verificationResult = await db
      .select()
      .from(chatEmailVerifications)
      .where(eq(chatEmailVerifications.id, verificationId))
      .limit(1);

    if (verificationResult.length === 0) {
      return NextResponse.json(
        {
          error: "Verification not found",
          message: "Invalid verification request. Please start over.",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    const verification = verificationResult[0];

    // Check if already verified
    if (verification.verified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified",
        email: verification.email,
        name: verification.name,
      });
    }

    // Check if expired
    if (new Date() > verification.expiresAt) {
      return NextResponse.json(
        {
          error: "Code expired",
          message: "Verification code has expired. Please request a new one.",
          code: "EXPIRED",
        },
        { status: 400 }
      );
    }

    // Check PIN
    if (verification.pin !== pin) {
      return NextResponse.json(
        {
          error: "Invalid code",
          message: "The verification code you entered is incorrect.",
          code: "INVALID_PIN",
        },
        { status: 400 }
      );
    }

    // Mark as verified
    await db
      .update(chatEmailVerifications)
      .set({ verified: true })
      .where(eq(chatEmailVerifications.id, verificationId));

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      email: verification.email,
      name: verification.name,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Chat verification confirm error:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
