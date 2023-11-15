'use server'

import { prisma } from "@/modules/_global"

export default async function funGetAllPaslonFront() {
    const data = await prisma.paslon.findMany({
        orderBy: {
            id: "asc"
        }
    })

    return data
}