import { prisma } from "@repo/database";

import type { Prisma } from "@repo/database";

export class AnalyticsRepository {

    async create(
        data: Prisma.ClickEventUncheckedCreateInput
    ) {

        return prisma.clickEvent.create({

            data

        });

    }

}