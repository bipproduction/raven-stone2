
'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funCopyPopularity({ dateFrom, dateTo }: { dateFrom: any, dateTo: any }) {


    const data = await prisma.paslonPopularity.findMany({
        where: {
            dateEmotion: dateFrom
        },
        select: {
            timeEmotion: true,
            idPaslon: true,
            rate: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            confidence: true,
            dissapproval: true,
        }
    })

    const dataTrue = data.map((v: any) => ({
        ..._.omit(v, ["timeEmotion",  "idPaslon", "rate", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive", "confidence", "dissapproval"]),
        dateEmotion: dateTo,
        timeEmotion: v.timeEmotion,
        idPaslon: v.idPaslon,
        rate: v.rate,
        negative: v.negative,
        positive: v.positive,
        supportive: v.supportive,
        uncomfortable: v.uncomfortable,
        undecided: v.undecided,
        unsupportive: v.unsupportive,
        confidence: v.confidence,
        dissapproval: v.dissapproval,
    }));

    const insert = await prisma.paslonPopularity.createMany({
        data: dataTrue
    })

    return {
        success: true,
        message: 'Success'
    }

}