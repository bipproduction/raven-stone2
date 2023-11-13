'use server'

import { prisma } from "@/modules/_global"

export default async function funCekEmotionCandidate({ date }: { date: any }) {
    const data = await prisma.candidateEmotion.count({
        where: {
            dateEmotion: date
        }
    })


    if (data > 0) {
        return { ada: true }
    }

    return { ada: false }
}