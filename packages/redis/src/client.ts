import { createClient } from "redis";

//const redisUrl = process.env.REDIS_URL;
const redisUrl = "redis://localhost:6379";
if (!redisUrl) {

    throw new Error(
        "REDIS_URL is not defined"
    );

}

declare global {

    // eslint-disable-next-line no-var
    var redis:
        | ReturnType<typeof createClient>
        | undefined;

}

const client =
    globalThis.redis ??
    createClient({

        url: redisUrl

    });

client.on(

    "error",

    (error) => {

        console.error(
            "Redis Error:",
            error
        );

    }

);

if (!client.isOpen) {

    await client.connect();

}

if (
    process.env.NODE_ENV !== "production"
) {

    globalThis.redis = client;

}

export const redis = client;