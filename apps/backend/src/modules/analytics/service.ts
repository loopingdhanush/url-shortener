import { AnalyticsRepository } from "./repository.js";
import type { AnalyticsEvent } from "./types.js";

export class AnalyticsService {

    constructor(
        private readonly repository =
            new AnalyticsRepository()
    ) { }

    async recordClick(
        event: AnalyticsEvent
    ) {
        return this.repository.create({
            urlId: event.urlId,
            browser: event.browser ?? null,
            operatingSystem: event.operatingSystem ?? null,
            device: event.device,
            referrer: event.referrer ?? null,
            ipAddress: event.ipAddress ?? null,
            createdAt: new Date(event.clickedAt)
        });
    }
}