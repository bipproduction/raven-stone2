'use server'

import { funGetOneCandidate, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funDownloadEmotionCandidateByDate({ find }: { find: any }) {
    let emotion, titleA, kondisi, kondisi2, prov, result, daerah, dataJam, jamFix, isoDateTime

    const dCandidate = await funGetOneCandidate({ candidate: find.idCandidate })

    // if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
    //     kondisi = {
    //         idProvinsi: find.idProvinsi,
    //         idCandidate: find.idCandidate,
    //         dateEmotion: find.date
    //     }
    //     prov = await prisma.areaProvinsi.findUnique({
    //         where: {
    //             id: find.idProvinsi
    //         }
    //     })

    //     daerah = await prisma.areaKabkot.findMany({
    //         where: {
    //             idProvinsi: find.idProvinsi
    //         },
    //         select: {
    //             name: true,
    //             id: true,
    //             idProvinsi: true,
    //             AreaProvinsi: {
    //                 select: {
    //                     name: true,
    //                 }
    //             }
    //         }
    //     })

    //     titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (PROVINSI ' + prov?.name + ')'

    // } else {
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

        titleA = dCandidate?.name + ' - ' + moment(find.date).format('DD MMMM YYYY')
    // }

    dataJam = await prisma.candidateEmotion.findMany({
        where: kondisi,
        select: {
            timeEmotion: true
        },
        orderBy: {
            timeEmotion: 'desc'
        }
    });

    const dataJam2 = _.map(_.groupBy(dataJam, "timeEmotion"), (v: any) => ({
        timeEmotion: v[0].timeEmotion
    }))

    if (dataJam.length > 0) {
        if (find.jam != null && find.jam != undefined) {
            jamFix = find.jam
            jamFix = new Date('1970-01-01 ' + jamFix);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            isoDateTime = dataJam2[0].timeEmotion
        }
    }

    // if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
    //     kondisi2 = {
    //         idProvinsi: find.idProvinsi,
    //         idCandidate: find.idCandidate,
    //         dateEmotion: find.date,
    //         timeEmotion: jamFix
    //     }
    // } else {
        kondisi2 = {
            idCandidate: find.idCandidate,
            dateEmotion: find.date,
            timeEmotion: isoDateTime
        }
    // }

    emotion = await prisma.candidateEmotion.findMany({
        where: kondisi2,
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
            timeEmotion: true,
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
        },
        orderBy:{
            idProvinsi:'asc',
        }
    })

    if (emotion.length > 0) {
        result = emotion.map((v: any) => ({
            ..._.omit(v, ["id", "idCandidate", "Candidate", "dateEmotion", "timeEmotion", "AreaKabkot", "AreaProvinsi", "idKabkot", "idProvinsi", "confidence", "dissapproval", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive"]),
            id: v.id,
            idCandidate: v.idCandidate,
            idProvinsi: v.idProvinsi,
            idKabkot: v.idKabkot,
            candidate: v.Candidate.name,
            provinsi: v.AreaProvinsi.name,
            kabkot: v.AreaKabkot.name,
            date: moment(v.dateEmotion).format('YYYY-MM-DD'),
            time: moment.utc(v.timeEmotion).format('HH:mm'),
            confidence: v.confidence,
            supportive: v.supportive,
            positive: v.supportive,
            undecided: v.undecided,
            unsupportive: v.unsupportive,
            uncomfortable: v.uncomfortable,
            negative: v.negative,
            dissapproval: v.dissapproval

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
            date: moment(find.date).format('YYYY-MM-DD'),
            time: '(HH:MM)',
            confidence: '(nilai)',
            supportive: '(nilai)',
            positive: '(nilai)',
            undecided: '(nilai)',
            unsupportive: '(nilai)',
            uncomfortable: '(nilai)',
            negative: '(nilai)',
            dissapproval: '(nilai)'
        }))
    }



    const allData = {
        title: titleA,
        data: result
    }

    return allData
}