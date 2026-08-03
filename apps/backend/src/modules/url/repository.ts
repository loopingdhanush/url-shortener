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
                shortCode
            }
        });
    }

    async findByAlias(
        customAlias: string
    ) {
        return prisma.url.findUnique({
            where: {
                customAlias
            }
        });
    }

    async findUserUrls(
        userId: string
    ) {
        return prisma.url.findMany({
            where: {
                userId
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
                userId
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

    async delete(
        id: string,
        userId: string
    ) {

        return prisma.url.deleteMany({
            where: {
                id,
                userId
            }
        });
    }
}