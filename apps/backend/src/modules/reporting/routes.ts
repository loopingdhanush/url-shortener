import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { requireAuth } from "../auth/middleware.js";

import { getReport } from "./controller.js";

const router: Router = Router();

router.use(requireAuth);

router.get("/:urlId", asyncHandler(getReport));

export default router;