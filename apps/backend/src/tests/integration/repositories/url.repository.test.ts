import {

    beforeEach,

    describe,

    expect,

    it

} from "vitest";

import { UrlRepository } from "../../../modules/url/repository.js";

import { resetDatabase } from "../../helpers/database.js";

import { createUser } from "../../helpers/factories/user.factory.js";

import { createUrl } from "../../helpers/factories/url.factory.js";

describe(

    "UrlRepository",

    () => {

        const repository =
            new UrlRepository();

        beforeEach(async () => {

            await resetDatabase();

        });

        it("creates a url", async () => {

            const user =
                await createUser();

            const url =
                await repository.create({

                    originalUrl:
                        "https://github.com",

                    shortCode:
                        "github",

                    user: {

                        connect: {

                            id:
                                user.id

                        }

                    }

                });

            expect(url).toBeDefined();

            expect(

                url.shortCode

            ).toBe(

                "github"

            );

        });

        it("finds by shortcode", async () => {

            const user =
                await createUser();

            const created =
                await createUrl(

                    user.id

                );

            const found =
                await repository.findByShortCode(

                    created.shortCode

                );

            expect(found).not.toBeNull();

            expect(

                found?.id

            ).toBe(

                created.id

            );

        });

        it("returns null when shortcode does not exist", async () => {

            const url =
                await repository.findByShortCode(

                    "unknown"

                );

            expect(url).toBeNull();

        });

        it("finds owned url", async () => {

            const user =
                await createUser();

            const url =
                await createUrl(

                    user.id

                );

            const found =
                await repository.findByIdForUser(

                    url.id,

                    user.id

                );

            expect(found).not.toBeNull();

        });

        it("does not return another user's url", async () => {

            const owner =
                await createUser();

            const stranger =
                await createUser();

            const url =
                await createUrl(

                    owner.id

                );

            const found =
                await repository.findByIdForUser(

                    url.id,

                    stranger.id

                );

            expect(found).toBeNull();

        });

        it("updates original url", async () => {

            const user =
                await createUser();

            const url =
                await createUrl(

                    user.id

                );

            const updated =
                await repository.update(

                    url.id,
                    user.id,

                    {

                        originalUrl:

                            "https://github.com"

                    }

                );

            expect(

                updated.originalUrl

            ).toBe(

                "https://github.com"

            );

        });

        it("soft deletes a url", async () => {

            const user =
                await createUser();

            const url =
                await createUrl(user.id);

            await repository.softDelete(
                url.id,
                user.id

            );

            const deleted =
                await repository.findByIdForUser(
                    url.id,
                    user.id
                );

            expect(

                deleted

            ).toBeNull();

        });


    });