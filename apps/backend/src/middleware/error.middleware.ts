import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/ApiError.js";

export function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {

    logger.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            code: err.code,
            message: err.message

        });
    }

    return res.status(500).json({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error"
    });

}