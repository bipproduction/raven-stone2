'use server'

import { prisma } from "@/modules/_global"

export default async function funDeleteRatePopularity({ date, time }: { date: any, time: any }) {

    const jamFix = new Date('1970-01-01 ' + time);
    const isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();

    const del = await prisma.paslonPopularityNew.updateMany({
        where: {
            isActive: true,
            dateEmotion: new Date(date),
            timeEmotion: isoDateTime
        },
        data: {
            isActive: false
        }
    })

    return true

}