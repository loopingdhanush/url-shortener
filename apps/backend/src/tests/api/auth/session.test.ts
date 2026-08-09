import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../app.js";

import { createTestUser } from "../../helpers/auth.js";

describe("GET /api/auth/get-session", () => {

    it("returns current session", async () => {
        const user = createTestUser();
        const agent =
            request.agent(app);

        await agent

            .post("/api/auth/sign-up/email")

            .send({

                name: user.name,

                email: user.email,

                password: user.password

            });

        const response =
            await agent

                .get("/api/auth/get-session");

        expect(response.status).toBe(200);

        expect(

            response.body.user.email

        ).toBe(user.email);

    });

    it("returns null session", async () => {

        const response =
            await request(app)

                .get("/api/auth/get-session");

        expect(response.status).toBe(200);

        expect(response.body).toBeNull();

    });

});