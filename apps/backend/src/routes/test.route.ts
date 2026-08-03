import { Router } from "express";

import { requireAuth } from "../modules/auth/middleware.js";

const router: Router = Router();

router.get(
    "/protected",
    requireAuth,
    (req, res) => {
        res.json({
            message: "You are authenticated",
            user: req.user
        });
    });
export default router;