'use server'

import { prisma } from "@/modules/_global"
import moment from "moment"


/**
 * Fungsi untuk get Jokowi Effect by date.
 * @param {data} data - menampilkan data.
 * @returns Untuk get Jokowi Effect by date
 */
export default async function funGetEffectByDate({ date }: { date: any }) {
    const dataDB = await prisma.effect.findMany({
        where: {
            dateContent: date,
            isActive: true,
            idCandidate: 7
        },
        select: {
            id: true,
            content: true,
            timeContent: true,
            dateContent: true
        },
        orderBy: {
            timeContent: 'desc',
        }
    })

    const allData = {
        title: moment(date).format('DD MMMM YYYY'),
        data: dataDB
    }

    return allData
}