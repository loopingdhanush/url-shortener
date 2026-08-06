import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}

declare global {
    // eslint-disable-next-line no-var
    var redis: Redis | undefined;
}

export const redis =
    globalThis.redis ??
    new Redis(redisUrl, {
        maxRetriesPerRequest: null,
        enableReadyCheck: true,
        lazyConnect: false,
    });

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (error) => {
    console.error("Redis Error:", error);
});

if (process.env.NODE_ENV !== "production") {
    globalThis.redis = redis;
}