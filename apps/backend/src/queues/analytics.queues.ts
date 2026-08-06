import { Queue } from "bullmq";

import { redis } from "@repo/redis";

export const analyticsQueue =
    new Queue(
        "analytics",
        {
            connection: redis
        }
    );