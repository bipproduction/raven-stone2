'use server'

import { prisma } from '@/modules/_global'
import _ from 'lodash'

export default async function funGetEmotionDetailRegionalFront({ candidate, provinsi, kabupaten }: { candidate: any, provinsi: any, kabupaten?: any }) {
    let kondisi

    if (_.isUndefined(kabupaten) || _.isNull(kabupaten)) {
        kondisi = {
            idCandidate: Number(candidate),
            idProvinsi: Number(provinsi),
            dateEmotion: new Date()
        }
    } else {
        kondisi = {
            idCandidate: Number(candidate),
            dateEmotion: new Date(),
            idProvinsi: Number(provinsi),
            idKabkot: Number(kabupaten)
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
            idKabkot: true,
            AreaKabkot: {
                select: {
                    name: true,
                }
            }
        }
    })

    const result = data.map((v: any) => ({
        ..._.omit(v, ["AreaKabkot"]),
        name: v.AreaKabkot.name
    }))


    return result
}