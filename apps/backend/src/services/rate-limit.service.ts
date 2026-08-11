import { redis } from "@repo/redis";

export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    retryAfter: number;
}

export interface RateLimitOptions {
    key: string;
    keyPrefix: string;
    limit: number;
    windowSeconds: number;
}

export async function checkRateLimit(
    options: RateLimitOptions
): Promise<RateLimitResult> {

    const {
        key,
        limit,
        windowSeconds,
    } = options;

    const count =
        await redis.incr(key);

    if (count === 1) {

        await redis.expire(
            key,
            windowSeconds
        );

    }

    const ttl =
        await redis.ttl(key);

    const remaining =
        Math.max(
            0,
            limit - count
        );

    return {
        allowed: count <= limit,
        limit,
        remaining,
        retryAfter: Math.max(0, ttl),
    };
}