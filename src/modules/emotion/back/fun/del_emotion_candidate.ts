"use server"

import { prisma } from "@/modules/_global";
import moment from "moment";

export default async function funDelJamEmotionCandidate({candidate, dateCan, timeCan}: {candidate: any, dateCan: any, timeCan: any}) {
    let y = new Date('1970-01-01 ' + timeCan)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
    const data = await prisma.candidateEmotion.deleteMany({
        where: {
            idCandidate: Number(candidate),
            dateEmotion: new Date(moment(dateCan).format("YYYY-MM-DD")),
            timeEmotion: isoDateTime
        }
    })

    return data
}