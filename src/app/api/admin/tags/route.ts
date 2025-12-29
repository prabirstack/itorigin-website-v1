import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tags } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { requireAuthorOrAdmin, handleAuthError } from "@/lib/auth-utils";
import { z } from "zod";

const createTagSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  slug: z.string().min(1, "Slug is required").max(50, "Slug is too long").optional(),
});

export async function GET() {
  try {
    await requireAuthorOrAdmin();

    const tagsList = await db
      .select()
      .from(tags)
      .orderBy(desc(tags.createdAt));

    return NextResponse.json({ tags: tagsList });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuthorOrAdmin();
    const body = await request.json();

    const validated = createTagSchema.parse(body);

    const slug =
      validated.slug || slugify(validated.name, { lower: true, strict: true });

    // Check if slug already exists
    const existingTag = await db.query.tags.findFirst({
      where: eq(tags.slug, slug),
    });

    if (existingTag) {
      return NextResponse.json(
        { error: "A tag with this slug already exists" },
        { status: 400 }
      );
    }

    const [newTag] = await db
      .insert(tags)
      .values({
        id: nanoid(),
        name: validated.name,
        slug,
      })
      .returning();

    return NextResponse.json({ tag: newTag }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
