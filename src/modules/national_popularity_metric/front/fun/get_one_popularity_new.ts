'use server'
import { prisma } from "@/modules/_global"
import _, { sum } from "lodash"
import moment from "moment"
import funGetRateFrontNew from "./get_rate_new"

export default async function funGetPopularityNew({ paslon }: { paslon: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const data = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: Number(paslon),
            dateEmotion: new Date(),
            timeEmotion: {
                lt: IniisoDateTime
            }
        },
        orderBy: {
            timeEmotion: 'desc'
        },
        select: {
            timeEmotion: true,
            idPaslon: true,
        }
    })

    const findJam = _.map(_.groupBy(data, ["timeEmotion"]), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    let dataFix: any = null, jadi, total
    if (findJam.length > 0) {
        const dataFilter = await prisma.paslonEmotion.findMany({
            where: {
                idPaslon: Number(paslon),
                dateEmotion: new Date(),
                timeEmotion: findJam[0]?.timeEmotion
            },
            orderBy: {
                timeEmotion: 'desc'
            },
            select: {
                confidence: true,
                dissapproval: true,
                negative: true,
                positive: true,
                supportive: true,
                uncomfortable: true,
                undecided: true,
                unsupportive: true,
                timeEmotion: true,
            }
        })

        const dataAkhir = _.map(_.groupBy(dataFilter, "timeEmotion"), (v: any) => ({
            timeEmotion: moment.utc(v[0].timeEmotion).format('HH:mm'),
            confidence: _.sumBy(v, 'confidence'),
            dissapproval: _.sumBy(v, 'dissapproval'),
            negative: _.sumBy(v, 'negative'),
            positive: _.sumBy(v, 'positive'),
            supportive: _.sumBy(v, 'supportive'),
            uncomfortable: _.sumBy(v, 'uncomfortable'),
            undecided: _.sumBy(v, 'undecided'),
            unsupportive: _.sumBy(v, 'unsupportive'),
        }))


        const val = JSON.stringify(dataAkhir);
        const ini = val.substring(1, val.length - 1);
        jadi = JSON.parse(ini.trim())

        total = jadi.confidence + jadi.unsupportive + jadi.supportive + jadi.positive + jadi.negative + jadi.undecided + jadi.uncomfortable + jadi.dissapproval

    }

    const rate = await funGetRateFrontNew({ paslon: paslon })

    dataFix = {
        confidence: ((Number(jadi?.confidence) / total) * 100).toFixed(2),
        supportive: ((Number(jadi?.supportive) / total) * 100).toFixed(2),
        positive: ((Number(jadi?.positive) / total) * 100).toFixed(2),
        undecided: ((Number(jadi?.undecided) / total) * 100).toFixed(2),
        unsupportive: ((Number(jadi?.unsupportive) / total) * 100).toFixed(2),
        uncomfortable: ((Number(jadi?.uncomfortable) / total) * 100).toFixed(2),
        negative: ((Number(jadi?.negative) / total) * 100).toFixed(2),
        dissapproval: ((Number(jadi?.dissapproval) / total) * 100).toFixed(2),
        rate: (rate && rate.rate) ? rate.rate : 0
    }



    return dataFix

}