import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateCaseStudySchema } from "@/lib/validations/case-study";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";

type RouteContext = { params: Promise<{ id: string }> };

// GET - Get single case study
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [caseStudy] = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.id, id))
      .limit(1);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ caseStudy });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error fetching case study:", error);
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

// PATCH - Update case study
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await req.json();

    // Check if case study exists
    const [existingCaseStudy] = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.id, id))
      .limit(1);

    if (!existingCaseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    const result = updateCaseStudySchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug uniqueness if changed
    if (data.slug && data.slug !== existingCaseStudy.slug) {
      const slugConflict = await db
        .select({ id: caseStudies.id })
        .from(caseStudies)
        .where(eq(caseStudies.slug, data.slug))
        .limit(1);

      if (slugConflict.length > 0) {
        return NextResponse.json(
          { error: "A case study with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Determine if we need to set publishedAt
    const shouldSetPublishedAt = data.status === "published" && existingCaseStudy.status !== "published";

    // Update the case study
    const [updatedCaseStudy] = await db
      .update(caseStudies)
      .set({
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.client && { client: data.client }),
        ...(data.industry && { industry: data.industry }),
        ...(data.challenge && { challenge: data.challenge }),
        ...(data.solution && { solution: data.solution }),
        ...(data.results !== undefined && { results: data.results }),
        ...(data.metrics !== undefined && { metrics: data.metrics }),
        ...(data.services !== undefined && { services: data.services }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.status && { status: data.status }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage || null }),
        ...(data.logo !== undefined && { logo: data.logo || null }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
        ...(shouldSetPublishedAt && { publishedAt: new Date() }),
        updatedAt: new Date(),
      })
      .where(eq(caseStudies.id, id))
      .returning();

    return NextResponse.json({ caseStudy: updatedCaseStudy });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

// DELETE - Delete case study
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    const [existingCaseStudy] = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.id, id))
      .limit(1);

    if (!existingCaseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    await db.delete(caseStudies).where(eq(caseStudies.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
