import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../app.js";

import { createTestUser } from "../../helpers/auth.js";

describe("POST /api/auth/sign-in/email", () => {

    it("signs in a user", async () => {
        const user = createTestUser();
        const agent = request.agent(app);
        await agent
            .post("/api/auth/sign-up/email")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            });
        const response = await agent
            .post("/api/auth/sign-in/email")
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);
        expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("rejects invalid password", async () => {
        const user = createTestUser();
        const agent = request.agent(app);

        await agent
            .post("/api/auth/sign-up/email")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            });

        const response =
            await agent
                .post("/api/auth/sign-in/email")
                .send({
                    email: user.email,
                    password: "WrongPassword"
                });
        expect(response.status).toBe(401);

    });
});