"use server"

import { prisma } from "@/modules/_global"
import _, { last } from "lodash"
import moment from "moment"


/**
 * Fungsi untuk delete jam emotion paslon.
 * @param {date} date - menampilkan date.
 * @param {time} time - menampilkan time.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk  delete jam emotion paslon
 */
export default async function funDelJamEmotionPaslon({paslon, date, time}: {paslon: any, date: any, time: any}) {
    let y = new Date('1970-01-01 ' + time)
    let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString();
    const data = await prisma.paslonEmotion.deleteMany({
        where: {
            idPaslon: Number(paslon),
            dateEmotion: new Date( moment(date).format("YYYY-MM-DD")),
            timeEmotion: isoDateTime
        }
    })

    return data
}