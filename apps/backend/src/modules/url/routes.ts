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

const router: Router = Router();
router.use(requireAuth);
router.post("/", asyncHandler(createUrl));
router.get("/", asyncHandler(getUrls));
router.get("/:id", asyncHandler(getUrl));
router.patch("/:id", asyncHandler(updateUrl));
router.delete("/:id", asyncHandler(deleteUrl));

export default router;