import { prisma } from "@repo/database";
import { randomUUID } from "crypto";

export async function createUser(
    overrides: Partial<{
        name: string;
        email: string;
    }> = {}
) {

    return prisma.user.create({

        data: {
            id: randomUUID(),
            name:
                overrides.name ??
                "Test User",

            email:
                overrides.email ??
                `user-${crypto.randomUUID()}@example.com`

        }

    });

}