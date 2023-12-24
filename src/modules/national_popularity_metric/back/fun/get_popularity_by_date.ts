'use server'
import { prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

/**
 * Fungsi untuk get popuparity by date.
 * @param {date} date - menampilkan date.
 * @returns Untuk get popuparity by date
 */

export default async function funGetPopularityByDate({ find }: { find: any }) {

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

    const formatJam = dataJamFix.map((v: any) => ({
        ..._.omit(v, ["timeEmotion"]),
        timeEmotion: moment.utc(v.timeEmotion).format('HH:mm')
    }))

    let result: any = []

    if (dataJamFix.length > 0) {
        if (find.jam != null) {
            const jamFix = new Date('1970-01-01 ' + find.jam);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            isoDateTime = dataJamFix[0].timeEmotion
        }

        const dataDB = await prisma.paslonPopularity.findMany({
            where: {
                dateEmotion: find.date,
                timeEmotion: isoDateTime
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

        result = dataDB.map((v: any) => ({
            ..._.omit(v, ["Paslon", "timeEmotion"]),
            name: v.Paslon.nameCapres + ' - ' + v.Paslon.nameCawapres,
            timeEmotion: moment.utc(v.timeEmotion).format('HH:mm')
        }))
    }


    const allData = {
        title: moment(find.date).format('DD MMMM YYYY'),
        data: result,
        dataJam: formatJam
    }

    return allData
}