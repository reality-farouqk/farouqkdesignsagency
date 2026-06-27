import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

type MemoryEntry = { count: number; resetAt: number };

const memoryStore = new Map<string, MemoryEntry>();

let upstashLimiter: Ratelimit | null | undefined;

function getRedisConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;
  return { url, token };
}

function getUpstashLimiter(): Ratelimit | null {
  if (upstashLimiter !== undefined) return upstashLimiter;

  const config = getRedisConfig();

  if (!config) {
    upstashLimiter = null;
    return null;
  }

  upstashLimiter = new Ratelimit({
    redis: new Redis(config),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT, "1 h"),
    prefix: "contact-form",
  });

  return upstashLimiter;
}

function checkMemoryRateLimit(key: string): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { success: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: RATE_LIMIT - entry.count };
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function checkContactRateLimit(req: NextRequest): Promise<{
  success: boolean;
  remaining: number;
  reset?: number;
}> {
  const ip = getClientIp(req);
  const limiter = getUpstashLimiter();

  if (limiter) {
    const result = await limiter.limit(ip);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  }

  const result = checkMemoryRateLimit(ip);
  return result;
}
