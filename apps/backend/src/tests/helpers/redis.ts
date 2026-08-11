import { redis } from "@repo/redis";

export async function clearRedis(): Promise<void> {
    await redis.flushdb();
}

export async function getCachedUrl(
    shortCode: string
): Promise<any> {
    const data = await redis.get(`url:${shortCode}`);
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
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

export async function waitForRedisValue(
    key: string,
    timeoutMs = 5000
): Promise<string | null> {

    const start = Date.now();

    while (Date.now() - start < timeoutMs) {

        const value = await redis.get(key);

        if (value !== null) {
            return value;
        }

        await new Promise((resolve) =>
            setTimeout(resolve, 100)
        );
    }

    return null;
}