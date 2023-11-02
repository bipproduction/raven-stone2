'use server'

import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from "moment";
import _ from "lodash"

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
        }
    })

    const allData = {
        title: dPaslon?.nameCapres + ' - ' + dPaslon?.nameCawapres + ' (' + moment(date).format('DD MMMM YYYY') + ')',
        data: dataDB
    }

    return allData
}