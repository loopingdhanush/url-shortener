import { redis } from "@repo/redis";

async function main() {

    await redis.set(
        "hello",
        "world"
    );

    const value =
        await redis.get(
            "hello"
        );

    console.log(value);

}

main();