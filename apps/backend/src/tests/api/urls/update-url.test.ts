import { describe, it, expect } from "vitest";

import app from "../../../app.js";

import {
    createAuthenticatedAgent
} from "../../helpers/api/auth.helper.js";

import {
    createTestUrl
} from "../../helpers/api/url.helper.js";

describe(

    "PATCH /api/url/:id",

    () => {

        it(

            "updates original url",

            async () => {

                const { agent } = await createAuthenticatedAgent(app);

                const created = await createTestUrl(agent as any);

                const id = created.body.data.id;

                const response = await agent.patch(`/api/urls/${id}`).send({

                    originalUrl: "https://github.com"

                });

                expect(response.status).toBe(200);

                expect(response.body.data.originalUrl).toContain("github");

            }

        );

    }

);