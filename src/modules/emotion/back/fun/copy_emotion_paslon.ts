'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funCopyEmotionPaslon({ dateFrom, dateTo }: { dateFrom: any, dateTo: any }) {


    const data = await prisma.paslonEmotion.findMany({
        where: {
            dateEmotion: dateFrom
        },
        select: {
            timeEmotion: true,
            idKabkot: true,
            idPaslon: true,
            idProvinsi: true,
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
        ..._.omit(v, ["timeEmotion", "idKabkot", "idPaslon", "idProvinsi", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive", "confidence", "dissapproval"]),
        dateEmotion: dateTo,
        timeEmotion: v.timeEmotion,
        idKabkot: v.idKabkot,
        idPaslon: v.idPaslon,
        idProvinsi: v.idProvinsi,
        negative: v.negative,
        positive: v.positive,
        supportive: v.supportive,
        uncomfortable: v.uncomfortable,
        undecided: v.undecided,
        unsupportive: v.unsupportive,
        confidence: v.confidence,
        dissapproval: v.dissapproval,
    }));

    const insert = await prisma.paslonEmotion.createMany({
        data: dataTrue
    })

    return {
        success: true,
        message: 'Success'
    }

}