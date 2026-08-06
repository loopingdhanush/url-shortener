import { analyticsQueue } from "../queues/analytics.queues.js";

import type {
    ClickEventJob
} from "./types.js";

export async function publishClickEvent(payload: ClickEventJob) {

    await analyticsQueue.add("click", payload, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000
        },
        removeOnComplete: 1000,
        removeOnFail: 5000
    });
}