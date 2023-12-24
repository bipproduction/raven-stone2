'use server'
import { funGetAllPaslon, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

/**
 * Fungsi untuk download popularity by date.
 * @param {date} date - menampilkan date.
 * @returns Untuk download popularity by date
 */

export default async function funDownloadPopularityByDate({ find }: { find: any }) {

    let result

    let isoDateTime

    const dataJam = await prisma.paslonPopularity.findMany({
        where: {
            dateEmotion: find.date
        },
        select: {
            timeEmotion: true
        },
        orderBy: {
            timeEmotion: 'desc'
        }
    });

    const dataJamFix = _.map(_.groupBy(dataJam, "timeEmotion"), (v: any, i: any) => ({
        timeEmotion: v[0].timeEmotion
    }))

    if (dataJamFix.length > 0) {
        if (find.jam != null) {
            const jamFix = new Date('1970-01-01 ' + find.jam);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            isoDateTime = dataJamFix[0].timeEmotion
        }
    }

    const data = await prisma.paslonPopularity.findMany({
        where: {
            dateEmotion: find.date,
            timeEmotion: isoDateTime
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
            date: moment(find.date).format('YYYY-MM-DD'),
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
            date: moment(find.date).format('YYYY-MM-DD'),
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
        title: 'DATA NATIONAL POPULARITY - ' + moment(find.date).format('DD MMMM YYYY'),
        data: result
    }

    return allData
}