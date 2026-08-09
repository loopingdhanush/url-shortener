import type { Request, Response } from "express";
import { createUrlSchema } from "./validator.js";
import { urlService } from "../../container/url.js";
const service = urlService;

export async function createUrl(
    req: Request,
    res: Response
) {
    const validated = createUrlSchema.parse(req.body);

    const url = await service.createUrl(req.user!.id, validated);

    res.status(201).json({
        success: true,
        data: {
            id: url.id,
            shortCode: url.shortCode,
            shortUrl: `http://localhost:5000/${url.shortCode}`,
            originalUrl: url.originalUrl
        }
    });
}

export async function getUrls(
    req: Request,
    res: Response
) {

    const urls =
        await service.getUserUrls(
            req.user!.id
        );


    res.json({
        success: true,
        data: urls
    });

}

export async function getUrl(
    req: Request,
    res: Response
) {
    const { id } = req.params;

    const url =
        await service.getUrl(
            id as string,
            req.user!.id
        );

    res.json({
        success: true,
        data: url
    });
}

export async function updateUrl(
    req: Request,
    res: Response
) {
    const url =
        await service.updateUrl(
            req.params.id as string,
            req.user!.id,
            req.body
        );

    res.json({
        success: true,
        data: url
    });
}

export async function deleteUrl(
    req: Request,
    res: Response
) {

    await service.deleteUrl(
        req.params.id as string,
        req.user!.id
    );

    return res
        .status(204)
        .send();

}