"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"


/**
 * Fungsi untuk get all jam emotion candidate.
 * @param {dateCan} dateCan - menampilkan dateCan.
 * @param {candidate} candidate - menampilkan candidate.
 * @returns Untuk  get all jam emotion candidate
 */
export default async function funGetAllJamEmotionCandidate({candidate, dateCan}: {candidate: any, dateCan: any}) {
    const data = await prisma.candidateEmotion.findMany({
        where: {
            isActive: true,
            idCandidate: Number(candidate),
            dateEmotion: new Date(moment(dateCan).format("YYYY-MM-DD"))
        },
        select: {
            timeEmotion: true
        }
    })

    const dataJam = _.map(_.groupBy(data, "timeEmotion"), (v: any) => ({
        timeEmotion: moment.utc(v[0].timeEmotion).format('HH:mm')
    }))

    return dataJam
}