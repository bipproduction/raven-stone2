'use server'

import { prisma } from "@/modules/_global"

export default async function funCekPopularity({ date }: { date: any }) {
    const data = await prisma.paslonPopularity.count({
        where: {
            dateEmotion: date
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}