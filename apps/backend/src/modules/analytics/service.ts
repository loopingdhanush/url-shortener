import { UAParser } from "ua-parser-js";
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
        console.log("User Agent:", event.userAgent);

        const parser = new UAParser(event.userAgent);

        const result = parser.getResult();

        console.log("UA Result:", JSON.stringify(result, null, 2));

        return this.repository.create({
            urlId: event.urlId,

            browser: result.browser.name,

            operatingSystem: result.os.name,

            device: result.device.type ?? "desktop",

            referrer: event.referrer,

            ipAddress: event.ipAddress,

            createdAt: new Date(event.clickedAt)
        });
    }

}