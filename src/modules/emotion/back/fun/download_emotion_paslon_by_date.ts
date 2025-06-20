'use server'
import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from 'moment'
import _ from 'lodash'

export default async function funDownloadEmotionPaslonDate({ find }: { find: any }) {
    let emotion, titleA, kondisi, kondisi2, prov, result, daerah, dataJam, jamFix, isoDateTime

    const dPaslon = await funGetOnePaslon({ paslon: find.idPaslon })
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

        titleA = 'PASLON ' + dPaslon?.id + ' - ' + moment(find.date).format('DD MMMM YYYY')

    dataJam = await prisma.paslonEmotion.findMany({
        where: kondisi,
        select: {
            timeEmotion: true
        },
        orderBy: {
            timeEmotion: 'desc'
        }
    });

    dataJam = _.map(_.groupBy(dataJam, "timeEmotion"), (v: any) => ({
        timeEmotion: v[0].timeEmotion
    }))

    if (dataJam.length > 0) {
        if (find.jam != null && find.jam != undefined) {
            jamFix = find.jam
            jamFix = new Date('1970-01-01 ' + jamFix);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            isoDateTime = dataJam[0].timeEmotion
        }
    }

        kondisi2 = {
            idPaslon: find.idPaslon,
            dateEmotion: find.date,
            timeEmotion: isoDateTime
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
        },
        orderBy: {
            idKabkot: 'asc'
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

    return allData
}