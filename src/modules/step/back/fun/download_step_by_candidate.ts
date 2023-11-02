'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funDownloadStepCandidate({ candidate }: { candidate: any }) {
    let result
    const cek = await prisma.step.count({
        where: {
            idCandidate: candidate
        }
    })

    const dCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate
        }
    })

    if (cek > 0) {
        result = await prisma.step.findMany({
            where: {
                idCandidate: candidate
            },
            select: {
                id: true,
                idCandidate: true,
                category: true,
                sentiment: true,
                content: true
            }
        })

        result = result.map((v: any) => ({
            ..._.omit(v, ["content", "category", "sentiment"]),
            id: v.id,
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: v.category,
            sentiment: (v.sentiment == 1) ? 'POSITIVE' : 'NEGATIVE',
            content: v.content
        }))
    } else {
        result = [{
            id: '',
            idCandidate: candidate,
            candidate: dCandidate?.name,
            category: '(SOCIAL/TECHNOLOGY/ECONOMY/POLITIC)',
            sentiment: '(POSITIVE/NEGATIVE)',
            content: '(DESKRIPSI)'
        }]
    }




    const allData = {
        title: 'STEP - ' + dCandidate?.name,
        data: result
    }

    return allData
}