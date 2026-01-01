import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    // Use standard SQL query for Neon pooler compatibility
    const categoriesData = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.name));

    // Return category names with "All Posts" at the beginning
    const categoryNames = ["All Posts", ...categoriesData.map((c) => c.name)];

    return NextResponse.json({
      categories: categoryNames,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
