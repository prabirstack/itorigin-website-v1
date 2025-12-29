import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get session token from cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  // If protected route and no session, redirect to sign-in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If auth route and has session, redirect to admin
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only run middleware on admin and auth routes
    "/admin/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
