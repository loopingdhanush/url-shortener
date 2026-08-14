import { Router } from "express";
import {
    createUrl,
    getUrls,
    getUrl,
    updateUrl,
    deleteUrl
} from "./controller.js";
import { requireAuth } from "../auth/middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import { rateLimit } from "../../middleware/rate-limit.js";
import { rateLimitConfig } from "../../config/rate-limit.js";

const router: Router = Router();
router.use(requireAuth);
router.post("/",
    rateLimit({
        keyPrefix: "create-url",
        limit: rateLimitConfig.createUrl.maxRequests,
        windowSeconds: rateLimitConfig.createUrl.windowSeconds,
    }), asyncHandler(createUrl));
router.get("/", asyncHandler(getUrls));
router.get("/:id", asyncHandler(getUrl));
router.patch("/:id", asyncHandler(updateUrl));
router.delete("/:id", asyncHandler(deleteUrl));

export default router;