import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Create Redis client if environment variables are set
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limiters for different use cases
export const rateLimiters = {
  // General API rate limit: 60 requests per minute
  api: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, "1 m"),
        analytics: true,
        prefix: "ratelimit:api",
      })
    : null,

  // Auth rate limit: 5 attempts per minute (for login/signup)
  auth: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
        prefix: "ratelimit:auth",
      })
    : null,

  // Contact form: 3 submissions per hour
  contact: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        analytics: true,
        prefix: "ratelimit:contact",
      })
    : null,

  // Newsletter: 3 subscriptions per hour
  newsletter: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        analytics: true,
        prefix: "ratelimit:newsletter",
      })
    : null,

  // Chat: 30 messages per minute
  chat: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        analytics: true,
        prefix: "ratelimit:chat",
      })
    : null,
};

export type RateLimitType = keyof typeof rateLimiters;

export async function rateLimit(
  request: NextRequest,
  type: RateLimitType = "api"
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const limiter = rateLimiters[type];

  // If Redis is not configured, allow all requests
  if (!limiter) {
    return { success: true };
  }

  // Get identifier (IP address or user ID if authenticated)
  const ip = request.headers.get("x-forwarded-for") ??
             request.headers.get("x-real-ip") ??
             "127.0.0.1";
  const identifier = ip.split(",")[0].trim();

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier);
    return { success, limit, remaining, reset };
  } catch (error) {
    console.error("Rate limit error:", error);
    // On error, allow the request
    return { success: true };
  }
}

export function rateLimitResponse(reset?: number): NextResponse {
  return NextResponse.json(
    {
      error: "Too many requests",
      message: "Please try again later",
      retryAfter: reset ? Math.ceil((reset - Date.now()) / 1000) : 60,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(reset ? Math.ceil((reset - Date.now()) / 1000) : 60),
      },
    }
  );
}

// Helper function to apply rate limiting in API routes
export async function withRateLimit(
  request: NextRequest,
  type: RateLimitType = "api"
): Promise<NextResponse | null> {
  const { success, reset } = await rateLimit(request, type);

  if (!success) {
    return rateLimitResponse(reset);
  }

  return null;
}
