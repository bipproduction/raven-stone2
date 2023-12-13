'use server'
import { prisma } from "@/modules/_global"

export default async function funGetPopularityFront({ paslon, startDate, endDate }: { paslon: any, startDate: any, endDate: any }) {
    const data = await prisma.paslonPopularity.findMany({
        where: {
            idPaslon: Number(paslon),
            dateEmotion: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            }
        },
        select:{
            rate: true,
            dateEmotion: true
        },
        orderBy: {
            dateEmotion: 'asc'
        }
    })


    return data

}