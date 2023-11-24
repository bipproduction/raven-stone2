'use server'

import { prisma } from "@/modules/_global"

export default async function funCekEmotionPaslon({ paslon, date }: { paslon: any, date: any }) {
    const data = await prisma.paslonEmotion.count({
        where: {
            dateEmotion: date,
            idPaslon: Number(paslon)
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}