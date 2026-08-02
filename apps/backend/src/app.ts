import express, { type Express } from "express";

import { securityMiddleware } from "./middleware/security.middleware.js";
import { requestLogger } from "./middleware/request.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import healthRoute from "./routes/health.route.js";
import authRoutes from "./modules/auth/routes.js";

const app: Express = express();

//Middlewares
app.use(express.json());
app.use(...securityMiddleware);

//Logger
app.use(requestLogger);

//Routes
app.use("/api", healthRoute);
app.use("/api/auth", authRoutes);

//Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;