import { ApiError } from "../../utils/ApiError.js";

import { ReportingRepository } from "./repository.js";

import type { UrlReport } from "./types.js";

export class ReportingService {
    constructor(
        private readonly repository =
            new ReportingRepository()

    ) { }

    async getReport(
        urlId: string,
        userId: string
    ): Promise<UrlReport> {

        const url =
            await this.repository.verifyOwnership(
                urlId,
                userId
            );

        if (!url) {
            throw new ApiError(
                404,
                "URL not found",
                "URL_NOT_FOUND"
            );
        }

        const [
            totalClicks,
            dailyClicks,
            browsers,
            countries,
            devices,
            referrers
        ] = await Promise.all([
            this.repository.countClicks(urlId),
            this.repository.dailyClicks(urlId),
            this.repository.topBrowsers(urlId),
            this.repository.topCountries(urlId),
            this.repository.topDevices(urlId),
            this.repository.topReferrers(urlId)
        ]);

        return {
            summary: {
                totalClicks
            },
            charts: {
                dailyClicks
            },

            breakdown: {
                browsers,
                countries,
                devices,
                referrers
            }

        };

    }

}