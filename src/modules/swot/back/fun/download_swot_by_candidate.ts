'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funDownloadSwotByCandidate({ candidate }: { candidate: any }) {
    let result
    const cek = await prisma.swot.count({
        where: {
            idCandidate: candidate,
            isActive: true
        }
    })

    const dCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate
        }
    })

    if (cek > 0) {
        result = await prisma.swot.findMany({
            where: {
                idCandidate: candidate,
                isActive: true
            },
            select: {
                id: true,
                idCandidate: true,
                category: true,
                content: true
            }
        })

        result = result.map((v: any) => ({
            ..._.omit(v, ["content", "category", "sentiment"]),
            id: v.id,
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: v.category,
            content: v.content
        }))
    } else {
        result = [{
            id: '',
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: '(STRENGTH/WEAKNESS/OPPORTUNITY/THREAT)',
            content: '(DESKRIPSI)'
        }]
    }




    const allData = {
        title: 'SWOT - ' + dCandidate?.name,
        data: result
    }

    return allData
}