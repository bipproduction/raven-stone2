'use server'

import { prisma } from "@/modules/_global"
import { GENERATE_TIME, toDateOnly, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

/**
 * Cek apakah sudah ada data emotion paslon pada tanggal terpilih & jam generate.
 * @param paslon id paslon, atau null untuk mengecek seluruh paslon
 * @param date tanggal terpilih (default: hari ini)
 */
export default async function funCekGenerateEmotionPaslon({ paslon, date }: { paslon?: any; date?: any }) {
    const total = await prisma.paslonEmotion.count({
        where: {
            dateEmotion: date ? toDateOnly(date) : todayDateOnly(),
            timeEmotion: toTimeEmotion(GENERATE_TIME),
            ...(paslon ? { idPaslon: Number(paslon) } : {}),
        },
    })

    return { ada: total > 0, total }
}
