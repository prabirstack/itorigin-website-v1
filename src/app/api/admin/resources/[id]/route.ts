import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resources, resourceDownloads } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { updateResourceSchema } from "@/lib/validations/resources";
import { requireAdmin } from "@/lib/auth-utils";

type RouteContext = { params: Promise<{ id: string }> };

// GET - Get single resource with downloads
export async function GET(req: NextRequest, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id))
      .limit(1);

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Get recent downloads
    const recentDownloads = await db
      .select()
      .from(resourceDownloads)
      .where(eq(resourceDownloads.resourceId, id))
      .orderBy(desc(resourceDownloads.downloadedAt))
      .limit(10);

    // Get download stats
    const [downloadStats] = await db
      .select({
        totalDownloads: sql<number>`count(*)::int`,
        uniqueEmails: sql<number>`count(distinct ${resourceDownloads.email})::int`,
      })
      .from(resourceDownloads)
      .where(eq(resourceDownloads.resourceId, id));

    return NextResponse.json({
      resource,
      downloads: {
        recent: recentDownloads,
        stats: downloadStats,
      },
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}

// PATCH - Update resource
export async function PATCH(req: NextRequest, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await req.json();

    // Check if resource exists
    const [existingResource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id))
      .limit(1);

    if (!existingResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const result = updateResourceSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug uniqueness if changed
    if (data.slug && data.slug !== existingResource.slug) {
      const slugConflict = await db
        .select({ id: resources.id })
        .from(resources)
        .where(eq(resources.slug, data.slug))
        .limit(1);

      if (slugConflict.length > 0) {
        return NextResponse.json(
          { error: "A resource with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update the resource
    const [updatedResource] = await db
      .update(resources)
      .set({
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.description && { description: data.description }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.type && { type: data.type }),
        ...(data.category && { category: data.category }),
        ...(data.status && { status: data.status }),
        ...(data.fileUrl !== undefined && { fileUrl: data.fileUrl || null }),
        ...(data.fileName !== undefined && { fileName: data.fileName }),
        ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
        ...(data.fileType !== undefined && { fileType: data.fileType }),
        ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl || null }),
        ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl || null }),
        ...(data.pages !== undefined && { pages: data.pages }),
        ...(data.readTime !== undefined && { readTime: data.readTime }),
        ...(data.topics !== undefined && { topics: data.topics }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.publishDate !== undefined && { publishDate: data.publishDate ? new Date(data.publishDate) : null }),
        updatedAt: new Date(),
      })
      .where(eq(resources.id, id))
      .returning();

    return NextResponse.json({ resource: updatedResource });
  } catch (error) {
    console.error("Error updating resource:", error);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

// DELETE - Delete resource
export async function DELETE(req: NextRequest, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await context.params;

    const [existingResource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id))
      .limit(1);

    if (!existingResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Delete the resource (cascade will delete downloads)
    await db.delete(resources).where(eq(resources.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
