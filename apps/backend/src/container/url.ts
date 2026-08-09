import { UrlRepository } from "../modules/url/repository.js";
import { UrlService } from "../modules/url/service.js";

const repository =
    new UrlRepository();

export const urlService =
    new UrlService(
        repository
    );