'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"


/**
 * Fungsi untuk copy emotion candidate.
 * @param {dateFrom} dateFrom - menampilkan dateFrom.
 * @param {dateTo} dateTo - menampilkan dateTo.
 * @returns Untuk  copy emotion candidate
 */
export default async function funCopyEmotionCandidate({ dateFrom, dateTo, candidate }: { dateFrom: any, dateTo: any, candidate: any }) {


    const data = await prisma.candidateEmotion.findMany({
        where: {
            dateEmotion: dateFrom,
            idCandidate: Number(candidate)
        },
        select: {
            timeEmotion: true,
            idKabkot: true,
            idCandidate: true,
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
        ..._.omit(v, ["timeEmotion", "idKabkot", "idCandidate", "idProvinsi", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive", "confidence", "dissapproval"]),
        dateEmotion: dateTo,
        timeEmotion: v.timeEmotion,
        idKabkot: v.idKabkot,
        idCandidate: v.idCandidate,
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

    const insert = await prisma.candidateEmotion.createMany({
        data: dataTrue
    })

    return {
        success: true,
        message: 'Success'
    }

}