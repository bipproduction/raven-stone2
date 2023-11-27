"use server"

import { prisma } from "@/modules/_global"

export default async function funGetOneSwot({id}: {id: any}) {
    const data = await prisma.swot.findUnique({
        where: {
            isActive: true,
            id: Number(id)
        },
        select: {
            id: true,
            idCandidate: true,
            category: true,
            content: true
        }
    })
    return data
}