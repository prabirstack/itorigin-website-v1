import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return session;
}

export async function requireAuthorOrAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin" && session.user.role !== "author") {
    throw new Error("Forbidden");
  }
  return session;
}

// Helper to handle auth errors consistently
export function handleAuthError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }
  return null;
}
