import { prisma } from "@repo/database";

export async function createUrl(

    userId: string,

    overrides: Partial<{

        originalUrl: string;

        shortCode: string;

        customAlias: string | null;

        isActive: boolean;

    }> = {}

) {

    return prisma.url.create({

        data: {

            originalUrl:
                overrides.originalUrl ??
                "https://google.com",

            shortCode:
                overrides.shortCode ??
                crypto.randomUUID().slice(0, 6),

            customAlias:
                overrides.customAlias,

            isActive:
                overrides.isActive ?? true,

            user: {

                connect: {

                    id: userId

                }

            }

        }

    });

}