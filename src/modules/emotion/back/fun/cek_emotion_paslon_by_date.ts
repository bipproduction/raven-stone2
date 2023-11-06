'use server'

import { prisma } from "@/modules/_global"

export default async function funCekEmotionPaslon({ date }: { date: any }) {
    const data = await prisma.paslonEmotion.count({
        where: {
            dateEmotion: date
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}