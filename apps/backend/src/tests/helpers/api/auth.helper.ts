import crypto from "node:crypto";

import request from "supertest";

import type { Express } from "express";

export async function createAuthenticatedAgent(
    app: Express
) {

    const agent =
        request.agent(app);

    const user = {

        name: "Test User",

        email:
            `user-${crypto.randomUUID()}@example.com`,

        password:
            "Password@123"

    };

    const response =
        await agent
            .post("/api/auth/sign-up/email")
            .send(user);

    if (response.status !== 200) {

        throw new Error(
            `Signup failed: ${response.text}`
        );

    }

    return {
        agent,
        user
    };

}