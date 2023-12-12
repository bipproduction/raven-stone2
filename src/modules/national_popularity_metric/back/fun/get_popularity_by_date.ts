'use server'

import { prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

/**
 * Fungsi untuk get popuparity by date.
 * @param {date} date - menampilkan date.
 * @returns Untuk get popuparity by date
 */
export default async function funGetPopularityByDate({ date }: { date: any }) {
    const dataDB = await prisma.paslonPopularity.findMany({
        where: {
            dateEmotion: date
        },
        select: {
            idPaslon: true,
            Paslon: {
                select: {
                    nameCapres: true,
                    nameCawapres: true
                }
            },
            timeEmotion: true,
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            rate: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
        },
        orderBy: {
            idPaslon: 'asc',
        }
    })

    const result = dataDB.map((v: any) => ({
        ..._.omit(v, ["Paslon", "timeEmotion"]),
        name: v.Paslon.nameCapres + ' - ' + v.Paslon.nameCawapres,
        timeEmotion: moment.utc(v.timeEmotion).format('HH:mm')
    }))

    const allData = {
        title: moment(date).format('DD MMMM YYYY'),
        data: result
    }

    return allData
}