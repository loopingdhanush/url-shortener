import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
    connectionString,
});

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma =
    globalThis.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}