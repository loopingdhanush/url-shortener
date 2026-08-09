import { describe, it, expect } from "vitest";

import app from "../../../app.js";

import {
    createAuthenticatedAgent
} from "../../helpers/api/auth.helper.js";

describe("POST /api/url", () => {

    it("rejects invalid url", async () => {

        const { agent } = await createAuthenticatedAgent(app);

        const response = await agent.post("/api/urls").send({ originalUrl: "abc" });

        expect(response.status).toBe(400);

    });

});