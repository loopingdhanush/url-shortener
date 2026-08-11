import { describe, it, expect } from "vitest";
import app from "../../../app.js";
import { createAuthenticatedAgent } from "../../helpers/api/auth.helper.js";
import { createTestUrl } from "../../helpers/api/url.helper.js";
import { createClickEvent } from "../../helpers/factories/click-event.factory.js";

describe("GET /api/reporting/:urlId", () => {
    it("returns url analytics", async () => {
        const { agent } = await createAuthenticatedAgent(app);
        const createdUrl = await createTestUrl(agent as any);
        const urlId = createdUrl.body.data.id;

        await createClickEvent(urlId);
        await createClickEvent(urlId, {
            browser: "Firefox",
            country: "USA"
        });

        const response = await agent.get(`/api/reporting/${urlId}`);

        expect(response.status).toBe(200);
        expect(response.body.data.summary.totalClicks).toBe(2);
    });

    it("groups browsers", async () => {
        const { agent } = await createAuthenticatedAgent(app);
        const createdUrl = await createTestUrl(agent as any);
        const urlId = createdUrl.body.data.id;

        await createClickEvent(urlId, { browser: "Chrome" });
        await createClickEvent(urlId, { browser: "Chrome" });
        await createClickEvent(urlId, { browser: "Safari" });

        const response = await agent.get(`/api/reporting/${urlId}`);

        const browsers = response.body.data.breakdown.browsers;
        const chrome = browsers.find((item: any) => item.label === "Chrome");

        expect(chrome.count).toBe(2);
    });

    it("prevents another user accessing analytics", async () => {
        const { agent: userA } = await createAuthenticatedAgent(app);
        const createdUrl = await createTestUrl(userA as any);
        const urlId = createdUrl.body.data.id;

        const { agent: userB } = await createAuthenticatedAgent(app);

        const response = await userB.get(`/api/reporting/${urlId}`);

        expect(response.status).toBe(404);
    });

    it("returns zero clicks", async () => {
        const { agent } = await createAuthenticatedAgent(app);
        const createdUrl = await createTestUrl(agent as any);
        const urlId = createdUrl.body.data.id;

        const response = await agent.get(`/api/reporting/${urlId}`);

        expect(response.body.data.summary.totalClicks).toBe(0);
    });
});  