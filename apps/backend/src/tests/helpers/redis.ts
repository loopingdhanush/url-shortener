import { redis } from "@repo/redis";

export async function clearRedis(): Promise<void> {
    await redis.flushDb();
}

export async function getCachedUrl(
    shortCode: string
): Promise<string | null> {
    return redis.get(`url:${shortCode}`);
}

export async function getCacheTtl(
    shortCode: string
): Promise<number> {
    return redis.ttl(`url:${shortCode}`);
}

export async function deleteCachedUrl(
    shortCode: string
): Promise<void> {
    await redis.del(`url:${shortCode}`);
}