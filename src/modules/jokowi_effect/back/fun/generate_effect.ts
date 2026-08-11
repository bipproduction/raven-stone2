'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildEffectContent } from "./build_effect_content"
import { GENERATE_TIME, JOKOWI_CANDIDATE_ID, todayDateOnly, toDateOnly, toTimeContent } from "./generate_effect_val"

/**
 * Generate konten Jokowi Effect pada tanggal terpilih & jam generate. Jokowi
 * Effect terikat pada satu kandidat (Joko Widodo) sehingga menghasilkan satu
 * dokumen analisis naratif ("Strength Analysis Improvement") yang merangkai
 * seluruh aspek efek Jokowi (pengaruh figur, endorsement, persepsi keberlanjutan,
 * basis akar rumput, gaung digital); tiap aspek berupa paragraf bergaya berita
 * dengan panjang bervariasi (minimal 3 kalimat) — berbeda tiap generate. Konten
 * lama pada tanggal & jam yang sama dinonaktifkan dulu (replace) sebelum diisi
 * ulang.
 * @param date tanggal konten (default: hari ini)
 * @param replace nonaktifkan dulu konten existing pada tanggal & jam sebelum mengisi ulang
 */
export default async function funGenerateEffect({
    date,
    replace = false,
}: {
    date?: any
    replace?: boolean
}) {
    const dateContent = date ? toDateOnly(date) : todayDateOnly()
    const timeContent = toTimeContent(GENERATE_TIME)

    if (replace) {
        await prisma.effect.updateMany({
            where: { isActive: true, idCandidate: JOKOWI_CANDIDATE_ID, dateContent, timeContent },
            data: { isActive: false },
        })
    } else {
        const existing = await prisma.effect.count({
            where: { isActive: true, idCandidate: JOKOWI_CANDIDATE_ID, dateContent, timeContent },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    await prisma.effect.create({
        data: {
            idCandidate: JOKOWI_CANDIDATE_ID,
            content: buildEffectContent(),
            dateContent,
            timeContent,
        },
    })

    revalidatePath("/dashboard-admin/jokowi-effect")

    return {
        success: true,
        message: "Sukses",
        inserted: 1,
    }
}
