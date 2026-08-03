import { prisma } from "@repo/database";

export class RedirectRepository {

    async findBySlug(slug: string) {

        return prisma.url.findFirst({
            where: {
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