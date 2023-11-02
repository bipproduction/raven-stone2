'use server'

import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funGetEmotionPaslonDateArea({ find }: { find: any }) {
    let emotion, dataJam, titleA, kondisi, kondisi2, thTrue, prov, result, jamFix

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
    } else {
        kondisi = {
            idPaslon: find.idPaslon,
            dateEmotion: find.date
        }
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

    if(dataJam.length > 0) {
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
            timeEmotion: true,
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
        titleA = 'PASLON ' + dPaslon?.id + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (PROVINSI ' + prov?.name + ') '
        thTrue = 'KABUPATEN/KOTA'

        result = emotion.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot", "AreaProvinsi"]),
            name: v.AreaKabkot.name
        }))

    } else {
        titleA = 'PASLON ' + dPaslon?.id + ' - ' + moment(find.date).format('DD MMMM YYYY') + ' (SELURUH PROVINSI) '
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
        jam: dataJam,
        data: result
    }

    // console.log(allData)


    return allData
}