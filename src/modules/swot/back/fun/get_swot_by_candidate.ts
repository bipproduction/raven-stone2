'use server'

import { prisma } from "@/modules/_global"

export default async function funGetSwotByCandidate({ candidate }: { candidate: any }) {
    const result = await prisma.swot.findMany({
        where: {
            idCandidate: candidate
        }
    })

    const dCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate
        }
    })

    const allData = {
        title: dCandidate?.name,
        data: result
    }

    return allData
}