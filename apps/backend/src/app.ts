import express, { type Express } from "express";

import { securityMiddleware } from "./middleware/security.middleware.js";
import { requestLogger } from "./middleware/request.middleware.js";
import healthRoute from "./routes/health.route.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app: Express = express();

app.use(express.json());
app.use(...securityMiddleware);
app.use(requestLogger);
app.use("/api", healthRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;