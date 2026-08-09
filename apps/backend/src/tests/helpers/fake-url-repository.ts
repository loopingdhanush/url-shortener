import { vi, type Mock } from "vitest";

import type { IUrlRepository }
    from "../../modules/url/interfaces/url-repository.interface.js";

export function createMockUrlRepository(): IUrlRepository {
    return {

        create: vi.fn(),

        findByShortCode: vi.fn(),

        findByAlias: vi.fn(),

        findUserUrls: vi.fn(),

        findByIdForUser: vi.fn(),

        update: vi.fn(),

        softDelete: vi.fn(),

    }
};