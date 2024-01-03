'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetRateFrontNew({ paslon }: { paslon: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const dataJam = await prisma.paslonPopularityNew.findFirst({
        where: {
            isActive: true,
            dateEmotion: new Date(),
            idPaslon: Number(paslon),
            timeEmotion: {
                lt: IniisoDateTime
            }
        },
        orderBy: {
            timeEmotion: 'desc'
        },
    })

    let data: any = null

    if (!_.isNull(dataJam)) {
        data = await prisma.paslonPopularityNew.findFirst({
            where: {
                isActive: true,
                idPaslon: Number(paslon),
                dateEmotion: new Date(),
                timeEmotion: dataJam.timeEmotion
            },
            select: {
                rate: true
            }
        })
    }

    return data
}