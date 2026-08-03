import type { Request, Response } from "express";

import { RedirectService } from "./service.js";

const service = new RedirectService();

export async function redirect(req: Request, res: Response) {

    const slug = req.params.slug as string;

    const url = await service.resolveUrl(slug);

    return res.redirect(302, url.originalUrl);

}