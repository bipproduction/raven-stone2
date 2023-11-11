'use server'

import { prisma } from "@/modules/_global"

export default async function funGetSwotFront({ candidate }: { candidate: any }) {
    const data = await prisma.swot.findMany({
        where: {
            idCandidate: Number(candidate),
            isActive: true
        }
    })

    return data
}