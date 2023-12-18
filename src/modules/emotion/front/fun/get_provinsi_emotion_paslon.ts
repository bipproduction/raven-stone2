'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash";
import moment from "moment";

export default async function funGetProvinsiEmotionPaslon() {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    // PASLON 1 - PRABOWO
    const data = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 1,
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

    const dataFilter = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 1,
            dateEmotion: new Date(),
            timeEmotion: findJam[0]?.timeEmotion
        },
        orderBy: {
            timeEmotion: 'desc'
        },
        select: {
            idProvinsi: true,
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            timeEmotion: true,
            AreaProvinsi: {
                select: {
                    name: true
                }
            }
        }
    })

    const formatProvinsi = dataFilter.map((v: any) => ({
        ..._.omit(v, ["AreaProvinsi"]),
        name: v.AreaProvinsi.name
    }))

    const dataAkhir = _.map(_.groupBy(formatProvinsi, "idProvinsi"), (v: any) => ({
        idProvinsi: v[0].idProvinsi,
        name: _.toString(v[0].name),
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

    const sortData = _.orderBy(dataAkhir, "confidence", 'desc').map((v, i) => ({
        idProvinsi: v.idProvinsi,
        provinsi: v.name,
        // confidence: v.confidence,
        // dissapproval: v.dissapproval,
        // negative: v.negative,
        // positive: v.positive,
        // supportive: v.supportive,
        // uncomfortable: v.uncomfortable,
        // undecided: v.undecided,
        // unsupportive: v.unsupportive,
        // timeEmotion: v.timeEmotion,
    }))

    console.log(sortData)

    return sortData
}