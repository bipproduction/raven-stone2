"use server"

import { prisma } from "@/modules/_global"

export default async function getBayCandidateStep({ candidate }: { candidate: any }) {

    const result = await prisma.step.findMany({
        where: {
            idCandidate: candidate,
            isActive: true,
        },
        select: {
            category: true,
            content: true
        }
    })

    const isCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate,
            isActive: true
        }
    })

    const allData = {
        Title: isCandidate?.name,
        image: isCandidate?.img,
        data: result
    }
    console.log(allData)
    return allData

}