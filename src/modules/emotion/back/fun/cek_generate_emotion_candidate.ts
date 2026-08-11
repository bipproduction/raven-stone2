'use server'

import { prisma } from "@/modules/_global"
import { expandDateRange, GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

/**
 * Cek apakah sudah ada data emotion candidate pada rentang tanggal terpilih & jam generate.
 * @param candidate id kandidat, atau null untuk mengecek seluruh kandidat
 * @param startDate tanggal awal rentang (default: hari ini)
 * @param endDate tanggal akhir rentang (default: sama dengan startDate)
 */
export default async function funCekGenerateEmotionCandidate({
    candidate,
    startDate,
    endDate,
}: {
    candidate?: any
    startDate?: any
    endDate?: any
}) {
    const start = startDate ?? todayDateOnly()
    const end = endDate ?? start
    const dates = expandDateRange(start, end)

    const total = await prisma.candidateEmotion.count({
        where: {
            dateEmotion: { in: dates },
            timeEmotion: toTimeEmotion(GENERATE_TIME),
            ...(candidate ? { idCandidate: Number(candidate) } : {}),
        },
    })

    return { ada: total > 0, total, dates: dates.length }
}
