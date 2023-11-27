"use server"

import { prisma } from "@/modules/_global"

export default async function funGetOneStep({id}: {id: any}) {
    const data = await prisma.step.findUnique({
        where: {
            isActive: true,
            id: Number(id)
        },
        select: {
            id: true,
            idCandidate: true,
            category: true,
            sentiment: true,
            content: true
        }
    })

    return data
}