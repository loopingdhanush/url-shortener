import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}

declare global {
    // eslint-disable-next-line no-var
    var redis: Redis | undefined;
}


const createRedisClient = () => {

    const client = new Redis(redisUrl, {

        maxRetriesPerRequest: null,

        enableReadyCheck: true,

        // Important:
        // Don't connect immediately during tests
        lazyConnect:
            process.env.NODE_ENV === "test"

    });


    if (process.env.NODE_ENV !== "test") {

        client.on("connect", () => {
            console.log("Redis connected");
        });


        client.on("error", (error) => {
            console.error(
                "Redis Error:",
                error
            );
        });

    }


    return client;

};



export const redis =
    globalThis.redis ??
    createRedisClient();



if (process.env.NODE_ENV !== "production") {

    globalThis.redis = redis;

}