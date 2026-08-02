import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err);

    res.status(
        err.statusCode || 500
    )
        .json({
            success: false,
            message:
                err.message ||
                "Internal server error"
        });
}