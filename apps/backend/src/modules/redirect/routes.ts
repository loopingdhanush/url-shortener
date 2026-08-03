import { Router } from "express";

import { redirect } from "./controller.js";

const router: Router = Router();

router.get("/:slug", redirect);

export default router;