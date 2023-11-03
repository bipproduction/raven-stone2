'use server'

import { funGetOnePaslon, prisma } from "@/modules/_global"
import moment from "moment"
import _ from "lodash"

export default async function funDownloadMlaiPaslonDate({ paslon, date }: { paslon: any, date: any }) {
    let result
    const dPaslon = await funGetOnePaslon({ paslon: paslon })

    const cek = await prisma.mlAi.count({
        where: {
            idPaslon: paslon,
            dateContent: date,
            isActive: true
        }
    })



    if (cek > 0) {
        result = await prisma.mlAi.findMany({
            where: {
                dateContent: date,
                isActive: true,
                idPaslon: paslon
            },
            select: {
                id: true,
                idPaslon: true,
                content: true,
                timeContent: true,
                dateContent: true
            }
        })

        result = result.map((v: any) => ({
            ..._.omit(v, ["idPaslon", "timeContent", "dateContent", "content"]),
            id: v.id,
            idPaslon: v.idPaslon,
            paslon: dPaslon?.nameCapres + ' - ' + dPaslon?.nameCawapres,
            dateContent: moment(v.dateContent).format('YYYY-MM-DD'),
            timeContent: moment(v.timeContent).format('HH:MM'),
            content: v.content
        }))

    } else {
        result = [{
            id: '',
            idPaslon: dPaslon?.id,
            paslon: dPaslon?.nameCapres + '-' + dPaslon?.nameCawapres,
            dateContent: '(DD-MM-YYYY)',
            timeContent: '(HH:MM)',
            content: '(DESKRIPSI)'
        }]
    }



    const allData = {
        title: 'MLAI - PASLON ' + dPaslon?.id + ' (' + moment(date).format('DD MMMM YYYY') + ')',
        data: result
    }

    return allData

}