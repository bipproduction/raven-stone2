'use server'
import { prisma } from "@/modules/_global"
import moment from "moment";
import _, { ceil } from "lodash"
import funGetEmotionPersenPaslonFront from "./get_emotion_persen_paslon";
import funGetEmotionPaslonChartFront from "./get_emotion_paslon_chart_front";

/**
 * Fungsi untuk get emotion jokowi effect area front.
 * @returns Untuk  get emotion jokowi effect area front
 */

export default async function funGetEmotionPaslonAreaFront() {
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

    const dataChart = await funGetEmotionPaslonChartFront({ paslon: 1, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })






    // PASLON 2 - GANJAR
    const data2 = await prisma.paslonEmotion.findMany({
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

    const findJam2 = _.map(_.groupBy(data2, ["timeEmotion"]), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    const dataFilter2 = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 2,
            dateEmotion: new Date(),
            timeEmotion: findJam2[0]?.timeEmotion
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

    const formatProvinsi2 = dataFilter2.map((v: any) => ({
        ..._.omit(v, ["AreaProvinsi"]),
        name: v.AreaProvinsi.name
    }))

    const dataAkhir2 = _.map(_.groupBy(formatProvinsi2, "idProvinsi"), (v: any) => ({
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

    const sortData2 = _.orderBy(dataAkhir2, "confidence", 'desc').map((v, i) => ({
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
    const dataChart2 = await funGetEmotionPaslonChartFront({ paslon: 2, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })






    // PASLON 3 - ANIES
    const data3 = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 3,
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

    const findJam3 = _.map(_.groupBy(data3, ["timeEmotion"]), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    const dataFilter3 = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 3,
            dateEmotion: new Date(),
            timeEmotion: findJam3[0]?.timeEmotion
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

    const formatProvinsi3 = dataFilter3.map((v: any) => ({
        ..._.omit(v, ["AreaProvinsi"]),
        name: v.AreaProvinsi.name
    }))

    const dataAkhir3 = _.map(_.groupBy(formatProvinsi3, "idProvinsi"), (v: any) => ({
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

    const sortData3 = _.orderBy(dataAkhir3, "confidence", 'desc').map((v, i) => ({
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

    const dataChart3 = await funGetEmotionPaslonChartFront({ paslon: 3, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })


    const persen = await funGetEmotionPersenPaslonFront()



    const allData = {
        1: {
            data: sortData,
            nPage: ceil(sortData.length / 10),
            persen: persen[1],
            chart: dataChart
        },
        2: {
            data: sortData2,
            nPage: ceil(sortData2.length / 10),
            persen: persen[2],
            chart: dataChart2
        },
        3: {
            data: sortData3,
            nPage: ceil(sortData3.length / 10),
            persen: persen[3],
            chart: dataChart3
        }

    }

    return allData
}