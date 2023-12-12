'use server'

import { funGetAllPaslon, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"


/**
 * Fungsi untuk download popularity by date.
 * @param {date} date - menampilkan date.
 * @returns Untuk download popularity by date
 */
export default async function funDownloadPopularityByDate({ date }: { date: any }) {

    let result

    const data = await prisma.paslonPopularity.findMany({
        where: {
            dateEmotion: date
        },
        select: {
            id: true,
            idPaslon: true,
            timeEmotion: true,
            rate: true,
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            Paslon: {
                select: {
                    nameCapres: true,
                    nameCawapres: true,
                }
            }
        }
    })

    if (data.length > 0) {
        result = data.map((v: any) => ({
            ..._.omit(v, ["id", "idPaslon", "Paslon", "timeEmotion", "rate", "confidence", "dissapproval", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive"]),
            id: v.id,
            idPaslon: v.idPaslon,
            paslon: v.Paslon.nameCapres + ' - ' + v.Paslon.nameCawapres,
            date: moment(date).format('YYYY-MM-DD'),
            time: moment.utc(v.timeEmotion).format('HH:mm'),
            rate: v.rate,
            confidence: v.confidence,
            supportive: v.supportive,
            positive: v.supportive,
            undecided: v.undecided,
            unsupportive: v.unsupportive,
            uncomfortable: v.uncomfortable,
            negative: v.negative,
            dissapproval: v.dissapproval
        }))

    } else {
        const dPaslon = await funGetAllPaslon()
        result = dPaslon.map((v: any) => ({
            ..._.omit(v, ["id", "name"]),
            id: '',
            idPaslon: v.id,
            paslon: v.name,
            date: moment(date).format('YYYY-MM-DD'),
            time: '(HH:MM)',
            rate: '(nilai)',
            confidence: '(nilai)',
            supportive: '(nilai)',
            positive: '(nilai)',
            undecided: '(nilai)',
            unsupportive: '(nilai)',
            uncomfortable: '(nilai)',
            negative: '(nilai)',
            dissapproval: '(nilai)'
        }))
    }

    const allData = {
        title: 'DATA NATIONAL POPULARITY - ' + moment(date).format('DD MMMM YYYY'),
        data: result
    }

    return allData
}