'use server'

import { prisma } from "@/modules/_global"
import { GENERATE_TIME, JOKOWI_CANDIDATE_ID, todayDateOnly, toDateOnly, toTimeContent } from "./generate_effect_val"

/**
 * Cek apakah sudah ada konten Jokowi Effect aktif pada tanggal terpilih & jam
 * generate. Jokowi Effect terikat pada satu kandidat (Joko Widodo).
 * @param date tanggal konten (default: hari ini)
 */
export default async function funCekGenerateEffect({ date }: { date?: any }) {
    const dateContent = date ? toDateOnly(date) : todayDateOnly()

    const total = await prisma.effect.count({
        where: {
            isActive: true,
            idCandidate: JOKOWI_CANDIDATE_ID,
            dateContent,
            timeContent: toTimeContent(GENERATE_TIME),
        },
    })

    return { ada: total > 0, total }
}
