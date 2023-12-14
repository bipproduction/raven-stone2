'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

/**
 * Fungsi untuk get emotion persen jokowi effect.
 * @returns Untuk  get emotion persen jokowi effect
 */

export default async function funGetEmotionPersenPaslonFront() {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()




    // PASLON 1 - PRABOWO
    const data = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 1,
            dateEmotion: new Date(),
            //TODO: ini harusnya nyalaa .. tapi nanti ga pas sama persen
            // timeEmotion: {
            //     lt: IniisoDateTime
            // }
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

    const formatProvinsi = data.map((v: any) => ({
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
        total: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
        ])
    }))

    const total = _.reduce(
        dataAkhir,
        (result, value) => {
            return {
                confidence: result.confidence + value.confidence,
                supportive: result.supportive + value.supportive,
                positive: result.positive + value.positive,
                undecided: result.undecided + value.undecided,
                unsupportive: result.unsupportive + value.unsupportive,
                uncomfortable: result.uncomfortable + value.uncomfortable,
                negative: result.negative + value.negative,
                dissapproval: result.dissapproval + value.dissapproval,
                value: result.value + value.total,
            };
        },
        {
            confidence: 0,
            supportive: 0,
            positive: 0,
            undecided: 0,
            unsupportive: 0,
            uncomfortable: 0,
            negative: 0,
            dissapproval: 0,
            value: 0,
        }
    );

    const positive = total.confidence + total.supportive + total.positive;
    const neutral = total.undecided;
    const negative = total.unsupportive + total.uncomfortable + total.negative + total.dissapproval;
    const totalEmotions = total.value;






    // PASLON 2 - GANJAR
    const data2 = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 2,
            dateEmotion: new Date(),
            //TODO: ini harusnya nyalaa .. tapi nanti ga pas sama persen
            // timeEmotion: {
            //     lt: IniisoDateTime
            // }
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

    const formatProvinsi2 = data2.map((v: any) => ({
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
        total: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
        ])
    }))

    const total2 = _.reduce(
        dataAkhir2,
        (result, value) => {
            return {
                confidence: result.confidence + value.confidence,
                supportive: result.supportive + value.supportive,
                positive: result.positive + value.positive,
                undecided: result.undecided + value.undecided,
                unsupportive: result.unsupportive + value.unsupportive,
                uncomfortable: result.uncomfortable + value.uncomfortable,
                negative: result.negative + value.negative,
                dissapproval: result.dissapproval + value.dissapproval,
                value: result.value + value.total,
            };
        },
        {
            confidence: 0,
            supportive: 0,
            positive: 0,
            undecided: 0,
            unsupportive: 0,
            uncomfortable: 0,
            negative: 0,
            dissapproval: 0,
            value: 0,
        }
    );

    const positive2 = total2.confidence + total2.supportive + total2.positive;
    const neutral2 = total2.undecided;
    const negative2 = total2.unsupportive + total2.uncomfortable + total2.negative + total2.dissapproval;
    const totalEmotions2 = total2.value;








    // PASLON 3 - ANIESS
    const data3 = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: 3,
            dateEmotion: new Date(),
            //TODO: ini harusnya nyalaa .. tapi nanti ga pas sama persen
            // timeEmotion: {
            //     lt: IniisoDateTime
            // }
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

    const formatProvinsi3 = data3.map((v: any) => ({
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
        total: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
        ])
    }))

    const total3 = _.reduce(
        dataAkhir3,
        (result, value) => {
            return {
                confidence: result.confidence + value.confidence,
                supportive: result.supportive + value.supportive,
                positive: result.positive + value.positive,
                undecided: result.undecided + value.undecided,
                unsupportive: result.unsupportive + value.unsupportive,
                uncomfortable: result.uncomfortable + value.uncomfortable,
                negative: result.negative + value.negative,
                dissapproval: result.dissapproval + value.dissapproval,
                value: result.value + value.total,
            };
        },
        {
            confidence: 0,
            supportive: 0,
            positive: 0,
            undecided: 0,
            unsupportive: 0,
            uncomfortable: 0,
            negative: 0,
            dissapproval: 0,
            value: 0,
        }
    );

    const positive3 = total3.confidence + total3.supportive + total3.positive;
    const neutral3 = total3.undecided;
    const negative3 = total3.unsupportive + total3.uncomfortable + total3.negative + total3.dissapproval;
    const totalEmotions3 = total3.value;




    const allData = {
        1: {
            positive: Number(((positive / totalEmotions) * 100).toFixed(2)),
            neutral: Number(((neutral / totalEmotions) * 100).toFixed(2)),
            negative: Number(((negative / totalEmotions) * 100).toFixed(2)),
        },
        2: {
            positive: Number(((positive2 / totalEmotions2) * 100).toFixed(2)),
            neutral: Number(((neutral2 / totalEmotions2) * 100).toFixed(2)),
            negative: Number(((negative2 / totalEmotions2) * 100).toFixed(2)),
        },
        3: {
            positive: Number(((positive3 / totalEmotions3) * 100).toFixed(2)),
            neutral: Number(((neutral3 / totalEmotions3) * 100).toFixed(2)),
            negative: Number(((negative3 / totalEmotions3) * 100).toFixed(2)),
        },
    }


    return allData
}