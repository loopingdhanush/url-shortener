import { prisma } from "@repo/database";
import type { RedirectTarget } from "./types.js";
import { logger } from "../../config/logger.js";
import {
    cache,
    CacheKeys,
    CACHE_TTL
} from "@repo/redis";
export class RedirectRepository {

    async findBySlug(
        slug: string
    ): Promise<RedirectTarget | null> {

        const key = CacheKeys.url(slug);

        const cached = await cache.get<RedirectTarget>(key);

        if (cached) {
            logger.debug({ slug }, "Cache hit");
            return cached
        }

        logger.debug({ slug }, "Cache miss");

        const url = await prisma.url.findFirst({

            where: {
                deletedAt: null,

                OR: [
                    { shortCode: slug },
                    { customAlias: slug }
                ]
            },

            select: {
                id: true,
                originalUrl: true,
                isActive: true,
                expiresAt: true
            }

        });

        if (url) {
            await cache.set(
                key,
                url,
                CACHE_TTL.URL
            );
        }

        return url;
    }

}