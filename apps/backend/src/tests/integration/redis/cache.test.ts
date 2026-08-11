import request from "supertest";

import {
    describe,
    expect,
    it,
    vi,
} from "vitest";

import app from "../../../app.js";

import { RedirectRepository } from "../../../modules/redirect/repository.js";

import { prisma } from "@repo/database";

import {
    createAuthenticatedAgent,
} from "../../helpers/api/auth.helper.js";

import {
    createTestUrl,
} from "../../helpers/api/url.helper.js";

import {
    getCachedUrl,
    getCacheTtl,
    deleteCachedUrl,
} from "../../helpers/redis.js";


describe("Redis URL Cache", () => {

    it(
        "stores the URL in Redis after a cache miss",
        async () => {

            const { agent } =
                await createAuthenticatedAgent(app);

            const urlResponse =
                await createTestUrl(agent as any);

            const url = urlResponse.body.data;

            /*
             * Make sure the cache starts empty.
             */

            await deleteCachedUrl(
                url.shortCode
            );

            const before =
                await getCachedUrl(
                    url.shortCode
                );

            expect(before).toBeNull();


            /*
             * First request.
             *
             * Redis:
             *
             * MISS
             *
             * PostgreSQL:
             *
             * lookup
             *
             * Redis:
             *
             * SET
             */

            const response =
                await request(app)
                    .get(
                        `/${url.shortCode}`
                    )
                    .redirects(0);


            expect(
                response.status
            ).toBe(302);


            /*
             * Redis should now contain
             * the original URL.
             */

            const cached =
                await getCachedUrl(
                    url.shortCode
                );

            expect(cached?.originalUrl).toBe(
                url.originalUrl
            );

        }
    );


    it(
        "uses Redis on the second request",
        async () => {

            const { agent } =
                await createAuthenticatedAgent(app);

            const urlResponse =
                await createTestUrl(agent as any);

            const url = urlResponse.body.data;


            await deleteCachedUrl(
                url.shortCode
            );


            /*
             * Spy on Prisma database query.
             *
             * We are NOT mocking it.
             *
             * We are only observing whether
             * PostgreSQL lookup happens.
             */

            const prismaSpy =
                vi.spyOn(
                    prisma.url,
                    "findFirst"
                );


            /*
             * First request.
             *
             * Cache MISS.
             */

            const firstResponse =
                await request(app)
                    .get(
                        `/${url.shortCode}`
                    )
                    .redirects(0);


            expect(
                firstResponse.status
            ).toBe(302);


            expect(
                prismaSpy
            ).toHaveBeenCalledTimes(1);


            /*
             * Second request.
             *
             * Should be a Redis HIT.
             */

            const secondResponse =
                await request(app)
                    .get(
                        `/${url.shortCode}`
                    )
                    .redirects(0);


            expect(
                secondResponse.status
            ).toBe(302);


            /*
             * Repository should NOT
             * have been called again.
             */

            expect(
                prismaSpy
            ).toHaveBeenCalledTimes(1);


            prismaSpy.mockRestore();

        }
    );


    it(
        "stores the URL with a TTL",
        async () => {

            const { agent } =
                await createAuthenticatedAgent(app);

            const urlResponse =
                await createTestUrl(agent as any);

            const url = urlResponse.body.data;


            await deleteCachedUrl(
                url.shortCode
            );


            await request(app)
                .get(
                    `/${url.shortCode}`
                )
                .redirects(0);


            const ttl =
                await getCacheTtl(
                    url.shortCode
                );


            /*
             * Redis TTL:
             *
             * -1 = key exists forever
             * -2 = key doesn't exist
             *
             * We expect a positive TTL
             * if your implementation uses
             * expiration.
             */

            expect(ttl).toBeGreaterThan(0);

        }
    );


    it(
        "returns the cached original URL",
        async () => {

            const { agent } =
                await createAuthenticatedAgent(app);

            const urlResponse =
                await createTestUrl(agent as any);

            const url = urlResponse.body.data;


            await deleteCachedUrl(
                url.shortCode
            );


            await request(app)
                .get(
                    `/${url.shortCode}`
                )
                .redirects(0);


            const cached =
                await getCachedUrl(
                    url.shortCode
                );


            expect(cached?.originalUrl).toBe(
                url.originalUrl
            );

        }
    );

});