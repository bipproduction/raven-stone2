'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"

/**
 * Fungsi untuk get one popularity front.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk get one popularity front
 */

export default async function funGetOnePopularityFront({ paslon }: { paslon: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const dataJam = await prisma.paslonPopularity.findFirst({
        where: {
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
        data = await prisma.paslonPopularity.findFirst({
            where: {
                dateEmotion: new Date(),
                idPaslon: Number(paslon),
                timeEmotion: dataJam.timeEmotion
            }
        })

    }

    return data
}