
import { Router } from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth.js";

const router: Router = Router();

router.all("/{*path}", toNodeHandler(auth));

export default router;