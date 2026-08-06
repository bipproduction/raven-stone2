'use server'

import { prisma } from "@/modules/_global"
import { GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

/**
 * Cek apakah sudah ada data emotion candidate hari ini pada jam generate.
 * @param candidate id kandidat, atau null untuk mengecek seluruh kandidat
 */
export default async function funCekGenerateEmotionCandidate({ candidate }: { candidate?: any }) {
    const total = await prisma.candidateEmotion.count({
        where: {
            dateEmotion: todayDateOnly(),
            timeEmotion: toTimeEmotion(GENERATE_TIME),
            ...(candidate ? { idCandidate: Number(candidate) } : {}),
        },
    })

    return { ada: total > 0, total }
}
