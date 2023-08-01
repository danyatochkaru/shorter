import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

export default async function prismaLinks(code: string) {
    return await prisma.links.findFirst({where: {code}});
}
