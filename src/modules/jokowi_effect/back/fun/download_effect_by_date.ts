'use server'

import { prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funDownloadEffectByDate({ date }: { date: any }) {
    let result

    const cek = await prisma.effect.count({
        where: {
            idCandidate: 7,
            dateContent: date,
            isActive: true
        }
    })

    if (cek > 0) {
        result = await prisma.effect.findMany({
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
            }
        })

        result = result.map((v: any) => ({
            ..._.omit(v, ["timeContent", "dateContent", "content"]),
            id: v.id,
            dateContent: moment(v.dateContent).format('YYYY-MM-DD'),
            timeContent: moment.utc(v.timeContent).format('HH:mm'),
            content: v.content
        }))


    } else {
        result = [{
            id: '',
            dateContent: '(YYYY-MM-DD)',
            timeContent: '(HH:MM)',
            content: '(DESKRIPSI)'
        }]
    }


    const allData = {
        title: 'JOKOWI EFFECT - ' + moment(date).format('DD MMMM YYYY'),
        data: result
    }

    return allData
}