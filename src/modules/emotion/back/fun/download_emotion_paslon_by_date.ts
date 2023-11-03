'use server'

import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from 'moment'
import _ from 'lodash'

export default async function funDownloadEmotionPaslonDate({ find }: { find: any }) {
    let emotion, titleA, kondisi, kondisi2, prov, result, daerah, dataJam, jamFix

    const dPaslon = await funGetOnePaslon({ paslon: find.idPaslon })

    if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
        kondisi = {
            idProvinsi: find.idProvinsi,
            idPaslon: find.idPaslon,
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

        titleA = 'PASLON ' + dPaslon?.id + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (PROVINSI ' + prov?.name + ')'

    } else {
        kondisi = {
            idPaslon: find.idPaslon,
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

        titleA = 'PASLON ' + dPaslon?.id + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (SELURUH PROVINSI)'
    }

    dataJam = await prisma.paslonEmotion.findMany({
        where: kondisi,
        select: {
            timeEmotion: true
        },
        orderBy: {
            id: 'desc'
        }
    });

    dataJam = _.map(_.groupBy(dataJam, "timeEmotion"), (v: any) => ({
        timeEmotion: v.timeEmotion
    }))

    if (dataJam.length > 0) {
        if (find.jam != null) {
            jamFix = find.jam
        } else {
            jamFix = dataJam[0].timeEmotion
        }
    }

    if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
        kondisi2 = {
            idProvinsi: find.idProvinsi,
            idPaslon: find.idPaslon,
            dateEmotion: find.date,
            timeEmotion: jamFix
        }
    } else {
        kondisi2 = {
            idPaslon: find.idPaslon,
            dateEmotion: find.date,
            timeEmotion: jamFix
        }
    }



    emotion = await prisma.paslonEmotion.findMany({
        where: kondisi2,
        select: {
            id: true,
            idPaslon: true,
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
            Paslon: {
                select: {
                    nameCapres: true,
                    nameCawapres: true
                }
            }
        }
    })

    if (emotion.length > 0) {
        result = emotion.map((v: any) => ({
            ..._.omit(v, ["id", "idPaslon", "Paslon", "dateEmotion", "timeEmotion", "AreaKabkot", "AreaProvinsi", "idKabkot", "idProvinsi", "confidence", "dissapproval", "negative", "positive", "supportive", "uncomfortable", "undecided", "unsupportive"]),
            id: v.id,
            idPaslon: v.idPaslon,
            idProvinsi: v.idProvinsi,
            idKabkot: v.idKabkot,
            paslon: v.Paslon.nameCapres + ' - ' + v.Paslon.nameCawapres,
            provinsi: v.AreaProvinsi.name,
            kabkot: v.AreaKabkot.name,
            date: moment(v.dateEmotion).format('YYYY-MM-DD'),
            time: moment(v.timeEmotion).format('HH:MM'),
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
            idPaslon: dPaslon?.id,
            idProvinsi: v.idProvinsi,
            idKabkot: v.id,
            paslon: dPaslon?.nameCapres + ' - ' + dPaslon?.nameCawapres,
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

    console.log(allData)

    return allData
}