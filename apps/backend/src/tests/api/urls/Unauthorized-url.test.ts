import { describe, it, expect } from "vitest";

import request from "supertest";

import app from "../../../app.js";

describe(

    "POST /api/url",

    () => {

        it(

            "returns 401 when unauthenticated",

            async () => {

                const response =
                    await request(app)
                        .post("/api/urls")
                        .send({

                            originalUrl:
                                "https://google.com"

                        });

                expect(
                    response.status
                ).toBe(401);

            }

        );

    }

);