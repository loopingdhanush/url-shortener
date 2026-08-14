import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { redirect } from "./controller.js";

import { rateLimit } from "../../middleware/rate-limit.js";
import { rateLimitConfig } from "../../config/rate-limit.js";

const router: Router = Router();

router.get("/:slug", rateLimit({
    keyPrefix: "redirect",
    limit: rateLimitConfig.redirect.maxRequests,
    windowSeconds: rateLimitConfig.redirect.windowSeconds,
}), asyncHandler(redirect));

export default router;
