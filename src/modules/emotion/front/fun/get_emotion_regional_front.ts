'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

/**
 * Fungsi untuk get emotion regional front.
 * @param {candidate} candidate - menampilkan candidate.
 * @param {region} region - menampilkan region.
 * @returns Untuk  get emotion regional front
 */

export default async function funGetEmotionRegionalFront({ candidate, region }: { candidate: any, region?: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()
    let kondisi

    const dataJam = await prisma.candidateEmotion.findMany({
        where: {
            idCandidate: Number(candidate),
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

    if (findJam.length > 0) {
        if (_.isUndefined(region) || _.isNull(region)) {
            kondisi = {
                idCandidate: Number(candidate),
                dateEmotion: new Date()
            }
        } else {
            kondisi = {
                idCandidate: Number(candidate),
                dateEmotion: new Date(),
                idProvinsi: Number(region)
            }
        }

        const data = await prisma.candidateEmotion.findMany({
            where: kondisi,
            select: {
                confidence: true,
                dissapproval: true,
                negative: true,
                positive: true,
                supportive: true,
                uncomfortable: true,
                undecided: true,
                unsupportive: true,
                idProvinsi: true,
                AreaProvinsi: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        const format = data.map((v: any) => ({
            ..._.omit(v, ["AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        const result = _.map(_.groupBy(format, "idProvinsi"), (v: any) => ({
            name: _.toString(v[0].name),
            idProvinsi: v[0].idProvinsi,
            confidence: _.sumBy(v, 'confidence'),
            dissapproval: _.sumBy(v, 'dissapproval'),
            negative: _.sumBy(v, 'negative'),
            positive: _.sumBy(v, 'positive'),
            supportive: _.sumBy(v, 'supportive'),
            uncomfortable: _.sumBy(v, 'uncomfortable'),
            undecided: _.sumBy(v, 'undecided'),
            unsupportive: _.sumBy(v, 'unsupportive'),
            filtered: _.sum([
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
        
        return result

    } else {
        return []
    }


}