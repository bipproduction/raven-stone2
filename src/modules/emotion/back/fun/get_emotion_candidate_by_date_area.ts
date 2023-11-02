'use server'

import { funGetOneCandidate, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funGetEmotionCandidateDateArea({ find }: { find: any }) {
    let emotion, titleA, kondisi, thTrue, prov, result

    const dCandidate = await funGetOneCandidate({ candidate: find.idCandidate })

    if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
        kondisi = {
            idProvinsi: find.idProvinsi,
            idCandidate: find.idCandidate,
            dateEmotion: find.date
        }
        prov = await prisma.areaProvinsi.findUnique({
            where: {
                id: find.idProvinsi
            }
        })
    } else {
        kondisi = {
            idCandidate: find.idCandidate,
            dateEmotion: find.date
        }
    }

    emotion = await prisma.candidateEmotion.findMany({
        where: kondisi,
        select: {
            id: true,
            idKabkot: true,
            idProvinsi: true,
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            AreaKabkot: {
                select: {
                    name: true
                }
            },
            AreaProvinsi: {
                select: {
                    name: true
                }
            },
        }
    })


    if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
        titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (PROVINSI ' + prov?.name + ') '
        thTrue = 'KABUPATEN/KOTA'

        result = emotion.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot", "AreaProvinsi"]),
            name: v.AreaKabkot.name
        }))

    } else {
        titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (SELURUH PROVINSI) '
        thTrue = 'PROVINSI'

        result = emotion.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot", "AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        result = _.map(_.groupBy(result, "idProvinsi"), (v: any) => ({
            confidence: _.sumBy(v, 'confidence'),
            dissapproval: _.sumBy(v, 'dissapproval'),
            negative: _.sumBy(v, 'negative'),
            positive: _.sumBy(v, 'positive'),
            supportive: _.sumBy(v, 'supportive'),
            uncomfortable: _.sumBy(v, 'uncomfortable'),
            undecided: _.sumBy(v, 'undecided'),
            unsupportive: _.sumBy(v, 'unsupportive'),
        }))
    }


    const allData = {
        title: titleA,
        th: thTrue,
        data: result
    }


    return allData
}