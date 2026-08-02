import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";


export const securityMiddleware = [

    helmet(),
    cors({
        origin: true,
        credentials: true
    }),
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: {
            error: "Too many requests"
        }

    })

];