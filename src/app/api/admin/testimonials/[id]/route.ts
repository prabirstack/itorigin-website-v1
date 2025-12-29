import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTestimonialSchema } from "@/lib/validations/testimonial";
import { requireAdmin } from "@/lib/auth-utils";

type RouteContext = { params: Promise<{ id: string }> };

// GET - Get single testimonial
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [testimonial] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ testimonial });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

// PATCH - Update testimonial
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await req.json();

    // Check if testimonial exists
    const [existingTestimonial] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existingTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    const result = updateTestimonialSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Determine if we need to set publishedAt or verifiedAt
    const shouldSetPublishedAt =
      data.status === "approved" && existingTestimonial.status !== "approved";
    const shouldSetVerifiedAt =
      data.verified === true && !existingTestimonial.verified;

    // Build update object dynamically
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.authorName !== undefined) updateData.authorName = data.authorName;
    if (data.authorRole !== undefined) updateData.authorRole = data.authorRole;
    if (data.authorCompany !== undefined) updateData.authorCompany = data.authorCompany;
    if (data.authorImage !== undefined) updateData.authorImage = data.authorImage || null;
    if (data.authorEmail !== undefined) updateData.authorEmail = data.authorEmail || null;
    if (data.authorLinkedin !== undefined) updateData.authorLinkedin = data.authorLinkedin || null;
    if (data.quote !== undefined) updateData.quote = data.quote;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.industry !== undefined) updateData.industry = data.industry || null;
    if (data.serviceUsed !== undefined) updateData.serviceUsed = data.serviceUsed || null;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.displayOrder !== undefined) updateData.displayOrder = data.displayOrder;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.verified !== undefined) updateData.verified = data.verified;
    if (data.source !== undefined) updateData.source = data.source || null;
    if (data.externalUrl !== undefined) updateData.externalUrl = data.externalUrl || null;

    if (shouldSetPublishedAt) {
      updateData.publishedAt = new Date();
    }
    if (shouldSetVerifiedAt) {
      updateData.verifiedAt = new Date();
    }

    // Update the testimonial
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();

    return NextResponse.json({ testimonial: updatedTestimonial });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimonial
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [existingTestimonial] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existingTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
