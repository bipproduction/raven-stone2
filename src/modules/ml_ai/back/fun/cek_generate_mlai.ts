'use server'

import { prisma } from "@/modules/_global"
import { GENERATE_TIME, todayDateOnly, toDateOnly, toTimeContent } from "./generate_mlai_val"

/**
 * Cek apakah sudah ada konten ML-AI aktif untuk paslon terpilih (atau seluruh
 * paslon) pada tanggal terpilih & jam generate.
 * @param paslon id paslon, atau null untuk mengecek seluruh paslon
 * @param date tanggal konten (default: hari ini)
 */
export default async function funCekGenerateMlai({ paslon, date }: { paslon?: any; date?: any }) {
    const dateContent = date ? toDateOnly(date) : todayDateOnly()

    const total = await prisma.mlAi.count({
        where: {
            isActive: true,
            dateContent,
            timeContent: toTimeContent(GENERATE_TIME),
            ...(paslon ? { idPaslon: Number(paslon) } : {}),
        },
    })

    return { ada: total > 0, total }
}
