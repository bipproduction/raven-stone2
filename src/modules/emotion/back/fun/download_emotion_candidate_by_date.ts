'use server'

import { funGetOneCandidate, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funDownloadEmotionCandidateByDate({ find }: { find: any }) {
    let emotion, titleA, kondisi, prov, result, daerah

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

        daerah = await prisma.areaKabkot.findMany({
            where: {
                idProvinsi: find.idProvinsi
            },
            select: {
                name: true,
                id: true,
                idProvinsi: true,
                AreaProvinsi: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (PROVINSI ' + prov?.name + ')'

    } else {
        kondisi = {
            idCandidate: find.idCandidate,
            dateEmotion: find.date
        }

        daerah = await prisma.areaKabkot.findMany({
            select: {
                name: true,
                id: true,
                idProvinsi: true,
                AreaProvinsi: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (SELURUH PROVINSI)'
    }

    emotion = await prisma.candidateEmotion.findMany({
        where: kondisi,
        select: {
            id: true,
            idCandidate: true,
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
            dateEmotion: true,
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
            Candidate: {
                select: {
                    name: true
                }
            }
        }
    })

    if (emotion.length > 0) {
        result = emotion.map((v: any) => ({
            ..._.omit(v, ["id", "idCandidate", "Candidate", "dateEmotion", "AreaKabkot", "AreaProvinsi", "idKabkot", "idProvinsi", "confidence", "dissaproval", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive"]),
            id: v.id,
            idCandidate: v.idCandidate,
            idProvinsi: v.idProvinsi,
            idKabkot: v.idKabkot,
            candidate: v.Candidate.name,
            provinsi: v.AreaProvinsi.name,
            kabkot: v.AreaKabkot.name,
            date: moment(v.dateEmotion).format('DD-MM-YYYY'),
            confidence: v.confidence,
            supportive: v.supportive,
            positive: v.supportive,
            undecided: v.undecided,
            unsupportive: v.unsupportive,
            negative: v.negative,
            dissaproval: v.dissaproval

        }))
    } else {
        result = daerah.map((v: any) => ({
            ..._.omit(v, ["id", "name", "idProvinsi", "AreaProvinsi"]),
            id: '',
            idCandidate: dCandidate?.id,
            idProvinsi: v.idProvinsi,
            idKabkot: v.id,
            candidate: dCandidate?.name,
            provinsi: v.AreaProvinsi.name,
            kabkot: v.name,
            date: moment(find.date).format('DD-MM-YYYY'),
            confidence: '(nilai)',
            supportive: '(nilai)',
            positive: '(nilai)',
            undecided: '(nilai)',
            unsupportive: '(nilai)',
            negative: '(nilai)',
            dissaproval: '(nilai)'

        }))
    }



    const allData = {
        title: titleA,
        data: result
    }

    return allData
}