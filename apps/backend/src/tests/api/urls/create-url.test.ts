import { describe, it, expect } from "vitest";

import request from "supertest";

import app from "../../../app.js";

import {
    createAuthenticatedAgent
} from "../../helpers/api/auth.helper.js";

import {
    createTestUrl
} from "../../helpers/api/url.helper.js";

describe(

    "POST /api/url",

    () => {

        it(

            "creates url",

            async () => {

                const { agent } = await createAuthenticatedAgent(app);

                const response = await createTestUrl(agent as any);

                expect(response.status).toBe(201);

                expect(response.body.data.shortCode).toBeDefined();

            });

    });