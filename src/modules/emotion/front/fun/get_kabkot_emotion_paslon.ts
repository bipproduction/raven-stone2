'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash";
import moment from "moment";

export default async function funGetKabkotEmotionPaslon() {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    // PASLON 1 - PRABOWO
    const data = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 2,
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


    let dataFilter: any[] = []
    if (findJam.length > 0) {
        dataFilter = await prisma.paslonEmotion.findMany({
            where: {
                idPaslon: 1,
                dateEmotion: new Date(),
                timeEmotion: findJam[0]?.timeEmotion
            },
            orderBy: {
                timeEmotion: 'desc'
            },
            select: {
                idKabkot: true,
                confidence: true,
                dissapproval: true,
                negative: true,
                positive: true,
                supportive: true,
                uncomfortable: true,
                undecided: true,
                unsupportive: true,
                timeEmotion: true,
                AreaKabkot: {
                    select: {
                        name: true
                    }
                }
            },
        })
    }


    const formatKabkot = dataFilter.map((v: any) => ({
        ..._.omit(v, ["AreaKabkot"]),
        name: v.AreaKabkot.name
    }))


    const sortData = _.orderBy(formatKabkot, "confidence", 'desc').map((v: any) => ({
        id: v.idKabkot,
        name: _.toString(v.name),
        emotion: v.confidence,
        // dissapproval: v.dissapproval,
        // negative: v.negative,
        // positive: v.positive,
        // supportive: v.supportive,
        // uncomfortable: v.uncomfortable,
        // undecided: v.undecided,
        // unsupportive: v.unsupportive,
        // timeEmotion: v.timeEmotion,
    }))


    return sortData
}