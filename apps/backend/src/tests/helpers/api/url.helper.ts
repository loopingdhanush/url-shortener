import type { SuperAgentTest, Response } from "supertest";

export async function createTestUrl(
    agent: SuperAgentTest
): Promise<Response> {
    return await agent
        .post("/api/urls")
        .send({
            originalUrl:
                "https://google.com"
        });
}