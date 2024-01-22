'use server'
import { prisma } from "@/modules/_global"
import moment from "moment"

export default async function funGetDataEditRate({ id }: { id: any }) {

    let getData = <any>[]
    const data1 = await prisma.paslonPopularityNew.findUnique({
        where: {
            id: id,
            isActive: true
        }
    })

    if (data1) {
        getData = await prisma.paslonPopularityNew.findMany({
            where: {
                dateEmotion: data1?.dateEmotion,
                timeEmotion: data1?.timeEmotion,
                isActive: true
            },
            orderBy: {
                idPaslon: 'asc'
            }
        })

        const allData = {
            date: data1?.dateEmotion,
            time: moment.utc(data1?.timeEmotion).format('HH:mm'),
            data: getData
        }

        return allData
    } else {
        return false
    }

}