import type { Agent, Response } from "supertest";

export async function createTestUrl(
    agent: Agent
): Promise<Response> {
    return await agent
        .post("/api/urls")
        .send({
            originalUrl: "https://github.com",
        });
}