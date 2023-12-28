'use server'
import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

/**
 * Fungsi untuk get emotion paslon date area.
 * @param {find} find - menampilkan find.
 * @returns Untuk  get emotion paslon date area
 */

export default async function funGetEmotionPaslonDateArea({ find }: { find: any }) {
    let emotion, dataJam, titleA, kondisi, kondisi2, thTrue, prov, result, jamFix, formatJam, isoDateTime

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
            timeEmotion: 'desc'
        }
    });

    

    const dataJamFix = _.map(_.groupBy(dataJam, "timeEmotion"), (v: any, i: any) => ({
        timeEmotion: v[0].timeEmotion
    }))

    formatJam = dataJamFix.map((v: any) => ({
        ..._.omit(v, ["timeEmotion"]),
        timeEmotion: moment.utc(v.timeEmotion).format('HH:mm')
    }))

    if (dataJamFix.length > 0) {
        if (find.jam != null) {
            jamFix = find.jam
            jamFix = new Date('1970-01-01 ' + jamFix);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            isoDateTime = dataJamFix[0].timeEmotion
        }

    }



    if (find.idProvinsi > 0 && find.idProvinsi <= 38) {
        kondisi2 = {
            idProvinsi: find.idProvinsi,
            idPaslon: find.idPaslon,
            dateEmotion: find.date,
            timeEmotion: isoDateTime
        }
    } else {
        kondisi2 = {
            idPaslon: find.idPaslon,
            dateEmotion: find.date,
            timeEmotion: isoDateTime
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

        const format = emotion.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot", "AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        result = _.map(_.groupBy(format, "idProvinsi"), (v: any) => ({
            name: _.toString(v[0].name),
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
        jam: formatJam,
        data: result
    }


    return allData
}