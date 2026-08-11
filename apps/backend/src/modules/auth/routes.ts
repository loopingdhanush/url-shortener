// src/modules/auth/routes.ts

import { Router } from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth.js";

import { rateLimit } from "../../middleware/rate-limit.js";

import {
    rateLimitConfig
} from "../../config/rate-limit.js";

const router: Router = Router();

router.all(
    "/{*path}",

    rateLimit(
        {
            keyPrefix:
                rateLimitConfig.auth.keyPrefix,

            windowSeconds:
                rateLimitConfig.auth.windowSeconds,

            limit:
                rateLimitConfig.auth.maxRequests,
        }
    ),

    toNodeHandler(auth)
);


export default router;