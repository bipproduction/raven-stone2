'use server'
import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache";

export default async function funAddRatePopularity({ dataTime, dataRate }: { dataTime: any, dataRate: any }) {
    const jamFix = new Date('1970-01-01 ' + dataTime.time);
    const isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
    const cek = await prisma.paslonPopularityNew.count({
        where: {
            dateEmotion: new Date(dataTime.date),
            timeEmotion: isoDateTime,
            isActive: true
        }
    })

    if (cek > 0) {
        return false
    }

    const data = [
        {
            dateEmotion: new Date(dataTime.date),
            timeEmotion: isoDateTime,
            idPaslon: 1,
            rate: dataRate.rate1
        },
        {
            dateEmotion: new Date(dataTime.date),
            timeEmotion: isoDateTime,
            idPaslon: 2,
            rate: dataRate.rate2
        },
        {
            dateEmotion: new Date(dataTime.date),
            timeEmotion: isoDateTime,
            idPaslon: 3,
            rate: dataRate.rate3
        }
    ]

    await prisma.paslonPopularityNew.createMany({
        data: data
    })

    revalidatePath('dashboard-admin/rate-popularity?&date=' + dataTime.date)

    return true

}