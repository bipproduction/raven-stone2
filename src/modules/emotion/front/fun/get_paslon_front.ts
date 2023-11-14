'use server'

import { prisma } from "@/modules/_global"

export default async function funGetPaslonFront() {
    const data = await prisma.paslon.findMany({
        orderBy: {
            id: "asc"
        }
    })

    return data
}