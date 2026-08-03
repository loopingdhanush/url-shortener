import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const session =
            await auth.api.getSession({
                headers: fromNodeHeaders(
                    req.headers
                )
            });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name
        };
        next();


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid session"
        });
    }
}