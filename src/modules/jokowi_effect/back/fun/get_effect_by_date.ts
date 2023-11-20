'use server'

import { prisma } from "@/modules/_global"
import moment from "moment"

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