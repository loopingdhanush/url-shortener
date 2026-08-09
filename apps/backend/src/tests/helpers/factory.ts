import { randomUUID } from "crypto";
import { prisma } from "@repo/database";

export async function createUser() {

    return prisma.user.create({

        data: {

            id: randomUUID(),

            name: "Dhanush",

            email:
                `test-${randomUUID()}@example.com`

        }

    });

}

export async function createUrl(userId: string) {

    return prisma.url.create({

        data: {

            originalUrl:
                "https://google.com",

            shortCode:
                crypto.randomUUID().slice(0, 6),

            userId

        }

    });

}