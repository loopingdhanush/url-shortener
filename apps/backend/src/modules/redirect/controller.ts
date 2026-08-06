// modules/redirect/controller.ts

import type { Request, Response } from "express";

import { RedirectService } from "./service.js";
import { publishClickEvent } from "../../jobs/analytics.job.js";
import type { ClickEventJob } from "../../jobs/types.js";

const service = new RedirectService();

export async function redirect(
    req: Request,
    res: Response
) {
    const url = await service.resolveUrl(req.params.slug as string);

    const payload: ClickEventJob = {
        urlId: url.id,
        clickedAt: new Date(),
    };

    if (req.ip) {
        payload.ipAddress = req.ip;
    }

    const userAgent = req.get("user-agent");
    if (userAgent) { payload.userAgent = userAgent; }

    const referrer = req.get("referer");
    if (referrer) { payload.referrer = referrer; }

    console.log(payload)
    publishClickEvent(payload).catch((err) => {
        console.error("Failed to enqueue analytics job:", err);
    });

    return res.redirect(302, url.originalUrl);
}