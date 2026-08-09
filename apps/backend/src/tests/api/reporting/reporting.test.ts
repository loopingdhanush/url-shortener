import request from "supertest";

import {
    describe,
    it,
    expect
} from "vitest";

import app from "../../../app.js";

import {
    prisma
} from "@repo/database";

import {
    createAuthenticatedAgent
} from "../../helpers/api/auth.helper.js";

import {
    createTestUrl
} from "../../helpers/api/url.helper.js";

import {
    createClickEvent
} from "../../helpers/factories/click-event.factory.js";

describe(
    "GET /api/reporting/:urlId",
    () => {


        it(
            "returns url analytics",
            async () => {


                const agent =
                    await createAuthenticatedAgent(app);



                const url =
                    await createTestUrl(agent);



                await createClickEvent(
                    url.id
                );



                await createClickEvent(

                    url.id,

                    {

                        browser: "Firefox",

                        country: "USA"

                    }

                );



                const response =
                    await agent

                        .get(
                            `/api/reporting/${url.id}`
                        );



                expect(
                    response.status
                )
                    .toBe(200);



                expect(
                    response.body.data.summary.totalClicks
                )
                    .toBe(2);



            });


    });