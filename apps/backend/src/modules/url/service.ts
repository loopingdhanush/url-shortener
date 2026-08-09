import { UrlRepository } from "./repository.js";
import { generateShortCode } from "./generator.js";
import type { CreateUrlInput } from "./types.js";
import { ApiError } from "../../utils/ApiError.js";
import { cache, CacheKeys } from "@repo/redis";
import type { IUrlRepository } from "./interfaces/url-repository.interface.js";


export class UrlService {

    constructor(
        private readonly repository:
            IUrlRepository

    ) { }

    async createUrl(
        userId: string,
        input: CreateUrlInput
    ) {

        if (input.customAlias) {
            const existing = await this.repository.findByAlias(input.customAlias);
            if (existing) {
                throw new ApiError(
                    409,
                    "Alias already exists",
                    "ALIAS_EXISTS"
                );
            }
        }

        let shortCode = generateShortCode();

        let existingCode = await this.repository.findByShortCode(shortCode);

        while (existingCode) {
            shortCode = generateShortCode();
            existingCode = await this.repository.findByShortCode(shortCode);
        }

        return this.repository.create({
            originalUrl: input.originalUrl,
            shortCode,
            customAlias: input.customAlias,
            expiresAt: input.expiresAt,
            userId
        });
    }

    async getUserUrls(
        userId: string
    ) {
        return this.repository.findUserUrls(userId);
    }

    async getUrl(
        id: string,
        userId: string
    ) {


        const url =
            await this.repository
                .findByIdForUser(
                    id,
                    userId
                );


        if (!url) {

            throw new Error(
                "URL not found"
            );

        }


        return url;

    }

    async updateUrl(
        id: string,
        userId: string,
        data: any
    ) {
        const url = await this.repository.findByIdForUser(
            id,
            userId
        );

        if (!url) {
            throw new Error("URL not found");
        }

        const updatedUrl = await this.repository.update(
            id,
            userId,
            data
        );

        await cache.del(
            CacheKeys.url(
                url.shortCode
            )
        );

        if (url.customAlias) {
            await cache.del(
                CacheKeys.url(
                    url.customAlias
                )
            );
        }

        return updatedUrl;
    }

    async deleteUrl(
        id: string,
        userId: string
    ) {
        const url = await this.repository.findByIdForUser(
            id,
            userId
        );

        if (!url) {
            throw new Error("URL not found");
        }

        const deletedUrl = await this.repository.softDelete(
            id,
            userId
        );

        await cache.del(
            CacheKeys.url(
                url.shortCode
            )
        );

        if (url.customAlias) {
            await cache.del(
                CacheKeys.url(
                    url.customAlias
                )
            );
        }

        return deletedUrl;
    }

}
