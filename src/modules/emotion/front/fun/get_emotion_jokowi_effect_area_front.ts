'use server'
import { prisma } from "@/modules/_global"
import moment from "moment";
import _, { ceil } from "lodash"

/**
 * Fungsi untuk get emotion jokowi effect area front.
 * @returns Untuk  get emotion jokowi effect area front
 */

export default async function funGetEmotionJokowiEffectAreaFront() {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const data = await prisma.candidateEmotion.findMany({
        where: {
            idCandidate: 7,
            dateEmotion: new Date(),
            timeEmotion: {
                lt: IniisoDateTime
            }
        },
        orderBy: {
            timeEmotion: 'desc'
        },
        select: {
            timeEmotion: true
        }
    })

    const findJam = _.map(_.groupBy(data, "timeEmotion"), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    let dataFilter: any[] = []
    if (findJam.length > 0) {
        dataFilter = await prisma.candidateEmotion.findMany({
            where: {
                idCandidate: 7,
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
    }





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
        confidence: v.confidence,
        dissapproval: v.dissapproval,
        negative: v.negative,
        positive: v.positive,
        supportive: v.supportive,
        uncomfortable: v.uncomfortable,
        undecided: v.undecided,
        unsupportive: v.unsupportive,
        name: v.name,
        timeEmotion: v.timeEmotion,
        idProvinsi: v.idProvinsi,
    }))

    const allData = {
        data: sortData,
        nPage: ceil(sortData.length / 10)
    }


    return allData
}