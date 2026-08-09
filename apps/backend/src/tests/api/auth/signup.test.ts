import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../../app.js";
import { prisma } from "@repo/database";
import { createTestUser } from "../../helpers/auth.js";

describe("POST /api/auth/sign-up/email", () => {
    it("creates a new user", async () => {
        const user = createTestUser();
        const response = await request(app)
            .post("/api/auth/sign-up/email")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);
        const createdUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        expect(createdUser).not.toBeNull();
    });

    it("rejects duplicate email", async () => {
        const user = createTestUser();
        await request(app)
            .post("/api/auth/sign-up/email")
            .send({
                name: user.name,
                email: user.email,
                password: user.password
            });

        const response =
            await request(app)
                .post("/api/auth/sign-up/email")
                .send({
                    name: user.name,
                    email: user.email,
                    password: user.password
                });
        expect(response.status).toBe(422);

        expect(response.body).toMatchObject({
            message: expect.any(String)
        });

    });
});