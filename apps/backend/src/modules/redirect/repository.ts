import { prisma } from "@repo/database";
import type { RedirectTarget } from "./types.js";

export class RedirectRepository {

    async findBySlug(
        slug: string
    ): Promise<RedirectTarget | null> {

        return prisma.url.findFirst({

            where: {

                deletedAt: null,

                OR: [

                    {
                        shortCode: slug
                    },

                    {
                        customAlias: slug
                    }

                ]

            },

            select: {

                id: true,

                originalUrl: true,

                isActive: true,

                expiresAt: true

            }

        });

    }

}