import { prisma } from "@repo/database";

export async function resetDatabase() {

    await prisma.clickEvent.deleteMany();

    await prisma.url.deleteMany();

    await prisma.session.deleteMany();

    await prisma.account.deleteMany();

    await prisma.verification.deleteMany();

    await prisma.user.deleteMany();

}