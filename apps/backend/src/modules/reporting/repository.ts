import { prisma } from "@repo/database";

import type {
    CountResult,
    DailyClick
} from "./types.js";

export class ReportingRepository {

    async verifyOwnership(
        urlId: string,
        userId: string
    ) {

        return prisma.url.findFirst({

            where: {

                id: urlId,

                userId,

                deletedAt: null

            },

            select: {

                id: true

            }

        });

    }

    async countClicks(
        urlId: string
    ) {

        return prisma.clickEvent.count({

            where: {

                urlId

            }

        });

    }

    async topBrowsers(
        urlId: string
    ): Promise<CountResult[]> {

        const rows =
            await prisma.clickEvent.groupBy({

                by: [
                    "browser"
                ],

                where: {
                    urlId
                },

                _count: {
                    browser: true
                },

                orderBy: {

                    _count: {

                        browser: "desc"

                    }

                }

            });

        return rows.map((row: { browser: string | null; _count: { browser: number } }) => ({

            label:
                row.browser,

            count:
                row._count.browser

        }));

    }

    async topCountries(
        urlId: string
    ): Promise<CountResult[]> {

        const rows =
            await prisma.clickEvent.groupBy({

                by: [
                    "country"
                ],

                where: {

                    urlId

                },

                _count: {

                    country: true

                },

                orderBy: {

                    _count: {

                        country: "desc"

                    }

                }

            });

        return rows.map((row: { country: string | null; _count: { country: number } }) => ({

            label:
                row.country,

            count:
                row._count.country

        }));

    }

    async topDevices(
        urlId: string
    ): Promise<CountResult[]> {

        const rows =
            await prisma.clickEvent.groupBy({

                by: [
                    "device"
                ],

                where: {

                    urlId

                },

                _count: {

                    device: true

                },

                orderBy: {

                    _count: {

                        device: "desc"

                    }

                }

            });

        return rows.map((row: { device: string | null; _count: { device: number } }) => ({

            label:
                row.device,

            count:
                row._count.device

        }));

    }

    async topReferrers(
        urlId: string
    ): Promise<CountResult[]> {

        const rows =
            await prisma.clickEvent.groupBy({

                by: [
                    "referrer"
                ],

                where: {

                    urlId

                },

                _count: {

                    referrer: true

                },

                orderBy: {

                    _count: {

                        referrer: "desc"

                    }

                }

            });

        return rows.map((row: { referrer: string | null; _count: { referrer: number } }) => ({

            label:
                row.referrer,

            count:
                row._count.referrer

        }));

    }

    async dailyClicks(
        urlId: string
    ): Promise<DailyClick[]> {

        const rows =
            await prisma.$queryRaw<
                {
                    date: Date;
                    clicks: bigint;
                }[]
            >`

            SELECT

                DATE("createdAt") AS date,

                COUNT(*) AS clicks

            FROM "ClickEvent"

            WHERE "urlId" = ${urlId}

            GROUP BY DATE("createdAt")

            ORDER BY DATE("createdAt")

        `;

        return rows.map((row: { date: Date; clicks: bigint }) => ({

            date:
                row.date
                    .toISOString()
                    .split("T")[0],

            clicks:
                Number(row.clicks)

        }));

    }

}