import "dotenv/config";
import { Worker } from "bullmq";
import { redis } from "@repo/redis";
import { AnalyticsService } from "../modules/analytics/service.js";

console.log("Analytics worker started");

new Worker(
    "analytics",
    async (job) => {
        console.log("Worker received job:", job.data);

        const service = new AnalyticsService();
        await service.recordClick(job.data);
    },
    {
        connection: redis,
        concurrency: 25,
    }
);