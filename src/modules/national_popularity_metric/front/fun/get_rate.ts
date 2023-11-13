'use server'

import { prisma } from "@/modules/_global"

export default async function funGetRateFront({ paslon }: { paslon: any }) {
    const data = await prisma.paslonPopularity.findFirst({
        where: {
            idPaslon: Number(paslon),
            dateEmotion: new Date()
        },
        select: {
            rate: true
        }
    })

    return data
}