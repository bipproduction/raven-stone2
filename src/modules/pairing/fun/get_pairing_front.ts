'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment";

/**
 * Fungsi untuk get pairing front.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {region} region - menampilkan region.
 * @returns Untuk get pairing front
 */

export default async function funGetPairingFront({ paslon, region }: { paslon: any, region?: any }) {
    let kondisi
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const dataJam = await prisma.paslonEmotion.findMany({
        where: {
            idPaslon: Number(paslon),
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
            idPaslon: true,
        }
    })

    const findJam = _.map(_.groupBy(dataJam, ["timeEmotion"]), (v: any) => ({
        timeEmotionFormat: moment.utc(v[0].timeEmotion).format('HH:mm'),
        timeEmotion: v[0].timeEmotion
    }))

    if (findJam.length > 0) {
        if (_.isUndefined(region) || _.isNull(region)) {
            kondisi = {
                idPaslon: Number(paslon),
                dateEmotion: new Date(),
                timeEmotion: findJam[0]?.timeEmotion
            }
        } else {
            kondisi = {
                idPaslon: Number(paslon),
                dateEmotion: new Date(),
                idProvinsi: Number(region),
                timeEmotion: findJam[0]?.timeEmotion
            }
        }

        const data = await prisma.paslonEmotion.findMany({
            where: kondisi,
            select: {
                idPaslon: true,
                dateEmotion: true,
                timeEmotion: true,
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

        const persen = result.map((v: any) => ({
            name: v.name,
            idProvinsi: v.idProvinsi,
            filtered: v.filtered,
            confidence: _.round((Number(v.confidence) / v.filtered) * 100, 2),
            dissapproval: _.round((Number(v.dissapproval) / v.filtered) * 100, 2),
            negative: _.round((Number(v.negative) / v.filtered) * 100, 2),
            positive: _.round((Number(v.positive) / v.filtered) * 100, 2),
            supportive: _.round((Number(v.supportive) / v.filtered) * 100, 2),
            uncomfortable: _.round((Number(v.uncomfortable) / v.filtered) * 100, 2),
            undecided: _.round((Number(v.undecided) / v.filtered) * 100, 2),
            unsupportive: _.round((Number(v.unsupportive) / v.filtered) * 100, 2),
        }))

        return persen
    } else {
        return []
    }


}