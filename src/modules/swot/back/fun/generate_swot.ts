'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildSwotContent } from "./build_swot_content"
import { SWOT_CATEGORIES } from "./swot_phrases"

/**
 * Generate data SWOT untuk kandidat terpilih (atau seluruh kandidat).
 * Tiap kandidat diisi 4 kategori (STRENGTH/WEAKNESS/OPPORTUNITY/THREAT) dengan
 * konten dummy berupa beberapa poin acak dari pool frasa — berbeda tiap generate.
 * Data SWOT lama kandidat dinonaktifkan dulu (replace) sebelum diisi ulang.
 * @param candidate id kandidat, atau null untuk seluruh kandidat
 * @param replace nonaktifkan dulu SWOT existing kandidat sebelum mengisi ulang
 */
export default async function funGenerateSwot({
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
        await prisma.swot.updateMany({
            where: { isActive: true, ...filterCandidate },
            data: { isActive: false },
        })
    } else {
        const existing = await prisma.swot.count({
            where: { isActive: true, ...filterCandidate },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    const rows = []
    for (const c of candidates) {
        for (const category of SWOT_CATEGORIES) {
            rows.push({
                idCandidate: c.id,
                category,
                content: buildSwotContent(category),
            })
        }
    }

    await prisma.swot.createMany({ data: rows })

    revalidatePath("/dashboard-admin/swot")

    return {
        success: true,
        message: "Sukses",
        inserted: rows.length,
        candidates: candidates.length,
    }
}
