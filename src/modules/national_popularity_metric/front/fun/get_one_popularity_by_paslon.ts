'use server'

import { prisma } from "@/modules/_global"

export default async function funGetOnePopularityFront({ paslon }: { paslon: any }) {
    const data = await prisma.paslonPopularity.findFirst({
        where: {
            dateEmotion: new Date(),
            idPaslon: Number(paslon)
        }
    })

    return data
}