import { Router } from "express";
import {
    createUrl,
    getUrls,
    getUrl,
    updateUrl,
    deleteUrl
} from "./controller.js";
import { requireAuth } from "../auth/middleware.js";

const router: Router = Router();
router.use(requireAuth);
router.post("/", createUrl);
router.get("/", getUrls);
router.get("/:id", getUrl);
router.patch("/:id", updateUrl);
router.delete("/:id", deleteUrl);

export default router;