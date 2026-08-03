import { prisma } from "@repo/database";

export class UrlRepository {

    async create(data: any) {
        return prisma.url.create({
            data
        });
    }

    async findByShortCode(
        shortCode: string
    ) {
        return prisma.url.findUnique({
            where: {
                shortCode,

                deletedAt: null
            }
        });
    }

    async findByAlias(
        customAlias: string
    ) {
        return prisma.url.findUnique({
            where: {
                customAlias,

                deletedAt: null
            }
        });
    }

    async findUserUrls(
        userId: string
    ) {
        return prisma.url.findMany({
            where: {
                userId,

                deletedAt: null
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                clickEvents: true
            }
        });
    }

    async findByIdForUser(
        id: string,
        userId: string
    ) {
        return prisma.url.findFirst({
            where: {
                id,
                userId,

                deletedAt: null
            }
        });
    }


    async update(
        id: string,
        userId: string,
        data: any
    ) {
        return prisma.url.update({
            where: {
                id,
                userId
            },
            data

        });
    }


    async softDelete(
        id: string,
        userId: string
    ) {

        return prisma.url.update({

            where: {
                id,
                userId
            },

            data: {

                deletedAt: new Date(),
                isActive: false

            }

        });

    }
}