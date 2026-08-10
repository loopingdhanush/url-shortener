import "dotenv/config";
import {
    beforeAll,
    beforeEach,
    afterAll
} from "vitest";
import { resetDatabase } from "./helpers/database.js";

beforeAll(async () => {

    process.env.NODE_ENV = "test";

});

afterAll(async () => {

});

beforeEach(async () => {

    process.env.NODE_ENV = "test";

    await resetDatabase();
    await clearRedis();
});