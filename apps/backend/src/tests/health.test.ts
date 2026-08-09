import request from "supertest";

import app from "../app.js";

describe(
    "Health",
    () => {
        it(
            "returns 200",
            async () => {
                const response = await request(app).get("/api/health");
                expect(response.status).toBe(200);
            }
        );
    }
);