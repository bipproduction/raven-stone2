"use server"

import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"


/**
 * Fungsi untuk get all jam emotion paslon.
 * @param {date} date - menampilkan date.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk  get all jam emotion paslon
 */
export default async function funGetAllJamEmotionPaslon({ paslon, date }: { paslon: any, date: any }) {
    const data = await prisma.paslonEmotion.findMany({
        where: {
            isActive: true,
            idPaslon: Number(paslon),
            dateEmotion: new Date(moment(date).format("YYYY-MM-DD"))
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