import { redis } from "./client.js";

export class Cache {

    async get<T>(
        key: string
    ): Promise<T | null> {

        const value =
            await redis.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;

    }

    async set<T>(
        key: string,
        value: T,
        ttl?: number
    ) {

        await redis.set(

            key,

            JSON.stringify(value),

            ttl
                ? {
                    EX: ttl
                }
                : undefined

        );

    }

    async del(
        key: string
    ) {
        await redis.del(key);
    }

    async exists(
        key: string
    ) {
        return (
            await redis.exists(key)
        ) === 1;
    }

}

export const cache =
    new Cache();