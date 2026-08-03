import { UrlRepository } from "./repository.js";
import { generateShortCode } from "./generator.js";
import type { CreateUrlInput } from "./types.js";

export class UrlService {

    private repository = new UrlRepository();

    async createUrl(
        userId: string,
        input: CreateUrlInput
    ) {

        if (input.customAlias) {
            const existing = await this.repository.findByAlias(input.customAlias);
            if (existing) {
                throw new Error("Alias already exists");
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
        return this.repository.update(
            id,
            userId,
            data
        );
    }

    async deleteUrl(
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



        return this.repository.delete(id, userId);
    }


}
