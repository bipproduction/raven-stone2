import { Title } from '@mantine/core';
"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash";

export default async function getBayCandidateStep({ candidate }: { candidate: any }) {

    const result = await prisma.step.findMany({
        where: {
            idCandidate: candidate,
            isActive: true,
        },
        select: {
            category: true,
            content: true,
            sentiment: true
        }
    })

    const isCandidate = await prisma.candidate.findUnique({
        where: {
            id: candidate,
            isActive: true
        }
    })
    const dataOmit = result.map((item) => ({
        ..._.omit(item, ["positive"], ["negative"]),
        category: item.category,
        content: item.content,
        sentiment: item.sentiment,
        Title: isCandidate?.name,
        Image: isCandidate?.img,
    }))

    // const allData = {
    //     // Title: isCandidate?.name,
    //     // image: isCandidate?.img,
    //     data: dataOmit
    // }
    console.log(dataOmit)
    return dataOmit

}