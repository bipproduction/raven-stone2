'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildStepValues } from "./build_step_content"
import { STEP_CATEGORIES, STEP_SENTIMENTS } from "./step_phrases"

/**
 * Generate data STEP untuk kandidat terpilih (atau seluruh kandidat).
 * Tiap kandidat diisi 4 kategori (SOCIAL/TECHNOLOGY/ECONOMY/POLITIC), dan tiap
 * kategori memiliki dua sentimen (positive & negative) yang masing-masing berisi
 * 2 value. Tiap value adalah satu paragraf bergaya berita yang dirangkai dari
 * pool kalimat (lead + body + closing) dengan panjang bervariasi (minimal 3
 * kalimat) — berbeda tiap generate. Data STEP lama kandidat dinonaktifkan dulu
 * (replace) sebelum diisi ulang.
 * @param candidate id kandidat, atau null untuk seluruh kandidat
 * @param replace nonaktifkan dulu STEP existing kandidat sebelum mengisi ulang
 */
export default async function funGenerateStep({
    candidate,
    replace = false,
}: {
    candidate?: any
    replace?: boolean
}) {
    const filterCandidate = candidate ? { idCandidate: Number(candidate) } : {}

    const candidates = await prisma.candidate.findMany({
        where: candidate ? { id: Number(candidate) } : {},
        select: { id: true },
        orderBy: { id: "asc" },
    })

    if (candidates.length == 0) {
        return { success: false, message: "Kandidat tidak ditemukan" }
    }

    if (replace) {
        await prisma.step.updateMany({
            where: { isActive: true, ...filterCandidate },
            data: { isActive: false },
        })
    } else {
        const existing = await prisma.step.count({
            where: { isActive: true, ...filterCandidate },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    const rows = []
    for (const c of candidates) {
        for (const category of STEP_CATEGORIES) {
            for (const sentiment of STEP_SENTIMENTS) {
                // 2 value per sentimen → 2 baris terpisah (tampilan front merotasi acak di antaranya).
                // Tiap value = paragraf bergaya berita, panjang bervariasi (min 3 kalimat).
                for (const content of buildStepValues(category, sentiment)) {
                    rows.push({ idCandidate: c.id, category, sentiment, content })
                }
            }
        }
    }

    await prisma.step.createMany({ data: rows })

    revalidatePath("/dashboard-admin/step")

    return {
        success: true,
        message: "Sukses",
        inserted: rows.length,
        candidates: candidates.length,
    }
}
