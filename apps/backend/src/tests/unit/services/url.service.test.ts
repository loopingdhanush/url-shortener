import { describe, it, expect, beforeEach, vi } from "vitest";

import { UrlService } from "../../../modules/url/service.js";

import { createMockUrlRepository } from "../../helpers/fake-url-repository.js";

describe("UrlService", () => {
    let repository: ReturnType<typeof createMockUrlRepository>;
    let service: UrlService;
    beforeEach(() => {
        repository = createMockUrlRepository();
        service =
            new UrlService(repository);
    });

    it("creates a short url", async () => {

        (repository.findByAlias as any).mockResolvedValue(null);

        (repository.create as any).mockResolvedValue({

            id: "1",

            originalUrl: "https://google.com",

            shortCode: "abc123"

        });

        const result =
            await service.createUrl(

                "user-id",

                {

                    originalUrl:
                        "https://google.com"

                }

            );

        expect(result.shortCode)
            .toBe("abc123");

        expect(repository.create)
            .toHaveBeenCalledOnce();

    });

    it("throws when alias already exists", async () => {

        (repository.findByAlias as any).mockResolvedValue({

            id: "123"

        });

        await expect(

            service.createUrl(

                "user-id",

                {

                    originalUrl:
                        "https://google.com",

                    customAlias:
                        "google"

                }

            )

        ).rejects.toThrow();

    });

    it("should propagate repository errors", async () => {

        (repository.findByAlias as any).mockResolvedValue(null);

        (repository.create as any).mockRejectedValue(

            new Error("DB Error")

        );

        await expect(

            service.createUrl(

                "user-1",

                {

                    originalUrl: "https://google.com"

                }

            )

        ).rejects.toThrow("DB Error");

    });

});
