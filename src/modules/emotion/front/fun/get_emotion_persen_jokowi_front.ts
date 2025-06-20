'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

/**
 * Fungsi untuk get emotion persen jokowi effect.
 * @returns Untuk  get emotion persen jokowi effect
 */

export default async function funGetEmotionPersenJokowiFront() {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()


    const dataJam = await prisma.candidateEmotion.findMany({
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
            timeEmotion: true,
            idCandidate: true,
        }
    })

    const findJam = _.map(_.groupBy(dataJam, ["timeEmotion"]), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    let data: any[] = []
    if (findJam.length > 0) {
        data = await prisma.candidateEmotion.findMany({
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

    const allData = {
        positive: Number(((positive / totalEmotions) * 100).toFixed(2)),
        neutral: Number(((neutral / totalEmotions) * 100).toFixed(2)),
        negative: Number(((negative / totalEmotions) * 100).toFixed(2)),
    }

    return allData
}