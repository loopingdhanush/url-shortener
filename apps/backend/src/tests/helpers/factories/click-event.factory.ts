import { prisma } from "@repo/database";


export async function createClickEvent(

    urlId: string,

    overrides: Partial<{

        browser: string;

        device: string;

        operatingSystem: string;

        country: string;

        referrer: string;

        ipAddress: string;

    }> = {}

) {

    return prisma.clickEvent.create({

        data: {

            urlId,

            browser:
                overrides.browser ?? "Chrome",

            device:
                overrides.device ?? "Desktop",

            operatingSystem:
                overrides.operatingSystem ?? "Windows",

            country:
                overrides.country ?? "India",

            referrer:
                overrides.referrer ?? "Google",

            ipAddress:
                overrides.ipAddress ?? "127.0.0.1"

        }

    });

}