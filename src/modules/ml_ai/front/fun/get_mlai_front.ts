'use server'

import { prisma } from "@/modules/_global";
import _ from "lodash"
import moment from "moment";


/**
 * Fungsi untuk get ml ai front.
 * @param {isPaslon} isPaslon - menampilkan isPaslon.
 * @param {isDate} isDate - menampilkan isDate.
 * @param {isTime} isTime - menampilkan isTime.
 * @returns Untuk get ml ai front
 */
export default async function funGetMlaiFront({ isPaslon, isDate, isTime }: { isPaslon: any, isDate: any, isTime?: any }) {
    let jamFix, isoDateTime, kondisi
    const jamNow = new Date().getHours() + 1 + ':00:00'

    if (moment(isDate).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')) {
        const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString();
        kondisi = {
            isActive: true,
            idPaslon: Number(isPaslon),
            dateContent: isDate,
            timeContent: {
                lt: IniisoDateTime
            }
        }
    } else {
        kondisi = {
            isActive: true,
            idPaslon: Number(isPaslon),
            dateContent: isDate,
        }
    }


    const dataJam = await prisma.mlAi.findMany({
        where: kondisi,
        orderBy: {
            timeContent: 'desc'
        }
    })

    const dataJamFix = _.map(_.groupBy(dataJam, "timeContent"), (v: any, i: any) => ({
        timeContent: v[0].timeContent
    }))

    const formatJam = dataJamFix.map((v: any) => ({
        ..._.omit(v, ["timeContent"]),
        timeContent: moment.utc(v.timeContent).format('HH:mm')
    }))

    if (dataJamFix.length > 0) {
        if (isTime != null) {
            jamFix = isTime
            jamFix = new Date('1970-01-01 ' + jamFix);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
        } else {
            jamFix = dataJamFix[0].timeContent
            isoDateTime = dataJamFix[0].timeContent
        }
    }

    const dataEffect = await prisma.mlAi.findMany({
        where: {
            idPaslon: Number(isPaslon),
            isActive: true,
            dateContent: isDate,
            timeContent: isoDateTime,
        }
    })

    const allData = {
        dataJam: formatJam,
        isJam: moment.utc(jamFix).format('HH:mm'),
        data: dataEffect,
    }



    return allData
}