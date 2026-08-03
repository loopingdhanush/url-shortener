import { RedirectRepository } from "./repository.js";
import { ApiError } from "../../utils/ApiError.js";
export class RedirectService {

    private repository = new RedirectRepository();

    async resolveUrl(slug: string) {

        const url = await this.repository.findBySlug(slug);

        if (!url) {
            throw new ApiError(
                404,
                "URL not found",
                "URL_NOT_FOUND"
            );
        }

        if (!url.isActive) {
            throw new ApiError(
                410,
                "URL disabled",
                "URL_DISABLED"
            );
        }

        if (url.expiresAt && url.expiresAt < new Date()) {
            throw new ApiError(
                410,
                "URL expired",
                "URL_EXPIRED"
            );
        }

        return url;

    }

}