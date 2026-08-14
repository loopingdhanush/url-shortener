import type {
    Request,
    Response,
    NextFunction,
} from "express";

import {
    checkRateLimit,
} from "../services/rate-limit.service.js";

import type {
    RateLimitOptions,
} from "../services/rate-limit.service.js";

export function rateLimit(
    options: Omit<RateLimitOptions, "key">
) {

    return async function rateLimitMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {
            const identifier =
                req.user?.id ??
                req.ip ??
                "unknown";

            const key =
                `rate-limit:${options.keyPrefix}:${identifier}`;

            const result =
                await checkRateLimit({
                    ...options,
                    key,
                });

            res.setHeader(
                "X-RateLimit-Limit",
                result.limit
            );

            res.setHeader(
                "X-RateLimit-Remaining",
                result.remaining
            );

            if (!result.allowed) {

                res.setHeader(
                    "Retry-After",
                    result.retryAfter
                );

                return res.status(429).json({
                    success: false,
                    error: {
                        code: "RATE_LIMIT_EXCEEDED",
                        message: "Too many requests",
                        retryAfter: result.retryAfter,
                    },
                });
            }
            next();

        } catch (error) {
            next(error);
        }
    };
}