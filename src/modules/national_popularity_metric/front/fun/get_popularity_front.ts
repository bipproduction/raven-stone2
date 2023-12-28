'use server'
import { prisma } from "@/modules/_global"
import _ from "lodash"
import moment from "moment"

export default async function funGetPopularityFront({ paslon, startDate, endDate }: { paslon: any, startDate: any, endDate: any }) {
    const jamNow = new Date().getHours() + 1 + ':00:00'
    const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString()

    const getDate = await prisma.paslonPopularity.groupBy({
        by: ['dateEmotion'],
        orderBy: {
            dateEmotion: 'asc'
        },
        where: {
            idPaslon: Number(paslon),
            dateEmotion: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            }
        }
    })

    let dataDateTime: { date: any, time: any }[] = []
    let kondisinya

    for (let i = 0; i < getDate.length; i++) {
        if (moment(getDate[i].dateEmotion).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')) {
            kondisinya = {
                idPaslon: Number(paslon),
                dateEmotion: getDate[i].dateEmotion,
                timeEmotion: {
                    lt: IniisoDateTime
                }
            }
        } else {
            kondisinya = {
                idPaslon: Number(paslon),
                dateEmotion: getDate[i].dateEmotion
            }
        }

        const getDateTime = await prisma.paslonPopularity.groupBy({
            by: ['timeEmotion'],
            orderBy: {
                timeEmotion: 'desc'
            },
            where: kondisinya
        })

        dataDateTime.push({ date: getDate[i]?.dateEmotion, time: getDateTime[0]?.timeEmotion })
    }

    let dataMentah = []
    for (let i = 0; i < dataDateTime.length; i++) {
        // klo ga ada data di terakhir 
        if (!_.isUndefined(dataDateTime[i].time)) {
            const find = await prisma.paslonPopularity.findMany({
                where: {
                    idPaslon: Number(paslon),
                    dateEmotion: dataDateTime[i].date,
                    timeEmotion: dataDateTime[i].time
                }
            })

            dataMentah.push(find)
        }
    }

    const data = dataMentah.flat()

    // const data = await prisma.paslonPopularity.findMany({
    //     where: {
    //         idPaslon: Number(paslon),
    //         dateEmotion: {
    //             gte: new Date(startDate),
    //             lte: new Date(endDate),
    //         }
    //     },
    //     select:{
    //         rate: true,
    //         dateEmotion: true
    //     },
    //     orderBy: {
    //         dateEmotion: 'asc'
    //     }
    // })


    return data

}