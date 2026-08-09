import type { Prisma } from "@repo/database";

export interface IUrlRepository {

    create(
        data: Prisma.UrlCreateInput
    ): Promise<any>;

    findByShortCode(
        shortCode: string
    ): Promise<any>;

    findByAlias(
        alias: string
    ): Promise<any>;

    findUserUrls(
        userId: string
    ): Promise<any>;

    findByIdForUser(
        id: string,
        userId: string
    ): Promise<any>;

    update(
        id: string,
        userId: string,
        data: Prisma.UrlUpdateInput
    ): Promise<any>;

    softDelete(
        id: string,
        userId: string
    ): Promise<any>;

}