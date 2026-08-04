import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { redirect } from "./controller.js";

const router: Router = Router();

router.get("/:slug", asyncHandler(redirect));

export default router;
