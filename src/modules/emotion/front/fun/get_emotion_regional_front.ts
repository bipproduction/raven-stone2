'use server'

import { prisma } from "@/modules/_global"
import _ from "lodash"

export default async function funGetEmotionRegionalFront({ candidate, region }: { candidate: any, region?: any }) {
    let kondisi

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
    }))

    return result
}