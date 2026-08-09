import { describe, it, expect } from "vitest";

import app from "../../../app.js";

import {
    createAuthenticatedAgent
} from "../../helpers/api/auth.helper.js";

import {
    createTestUrl
} from "../../helpers/api/url.helper.js";

describe(

    "DELETE /api/url/:id",

    () => {

        it(

            "soft deletes url",

            async () => {

                const { agent } = await createAuthenticatedAgent(app);

                const created = await createTestUrl(agent as any);

                const id = created.body.data.id;

                const response = await agent.delete(`/api/urls/${id}`);

                expect(response.status).toBe(204);

            }

        );

    }

);