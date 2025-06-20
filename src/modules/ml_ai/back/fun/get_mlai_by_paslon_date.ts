'use server'

import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from "moment";
import _ from "lodash"


/**
 * Fungsi untuk get ml ai paslon date.
 * @param {paslon} paslon - menampilkan paslon.
 * @param {date} date - menampilkan date.
 * @returns Untuk get ml ai paslon date
 */
export default async function funGetMlaiPaslonDate({ paslon, date }: { paslon: any, date: any }) {
    const dPaslon = await funGetOnePaslon({ paslon: paslon })

    const dataDB = await prisma.mlAi.findMany({
        where: {
            dateContent: date,
            isActive: true,
            idPaslon: paslon
        },
        select: {
            id: true,
            content: true,
            timeContent: true,
            dateContent: true
        },
        orderBy: {
            timeContent: 'desc',
        }
    })

    const allData = {
        title: dPaslon?.nameCapres + ' - ' + dPaslon?.nameCawapres + ' (' + moment(date).format('DD MMMM YYYY') + ')',
        data: dataDB
    }

    return allData
}