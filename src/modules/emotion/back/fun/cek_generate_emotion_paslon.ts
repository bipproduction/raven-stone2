'use server'

import { prisma } from "@/modules/_global"
import { expandDateRange, GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

/**
 * Cek apakah sudah ada data emotion paslon pada rentang tanggal terpilih & jam generate.
 * @param paslon id paslon, atau null untuk mengecek seluruh paslon
 * @param startDate tanggal awal rentang (default: hari ini)
 * @param endDate tanggal akhir rentang (default: sama dengan startDate)
 */
export default async function funCekGenerateEmotionPaslon({
    paslon,
    startDate,
    endDate,
}: {
    paslon?: any
    startDate?: any
    endDate?: any
}) {
    const start = startDate ?? todayDateOnly()
    const end = endDate ?? start
    const dates = expandDateRange(start, end)

    const total = await prisma.paslonEmotion.count({
        where: {
            dateEmotion: { in: dates },
            timeEmotion: toTimeEmotion(GENERATE_TIME),
            ...(paslon ? { idPaslon: Number(paslon) } : {}),
        },
    })

    return { ada: total > 0, total, dates: dates.length }
}
