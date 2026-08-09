import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../app.js";

import { createTestUser } from "../../helpers/auth.js";

describe("POST /api/auth/sign-out", () => {

    it("logs out the current user", async () => {
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

        await agent

            .post("/api/auth/sign-out");

        const session =
            await agent

                .get("/api/auth/get-session");

        expect(session.body).toBeNull();

    });

});