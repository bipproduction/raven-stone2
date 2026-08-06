'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildEmotionMetrics, MIN_AUDIENCE } from "./build_emotion_metrics"
import { GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

const CHUNK_SIZE = 2000

/**
 * Generate data emotion candidate untuk seluruh wilayah pada tanggal hari ini jam 01:00.
 * Total seluruh metrik per wilayah dijamin tidak melebihi nilai audience wilayah tersebut.
 * @param candidate id kandidat, atau null untuk seluruh kandidat
 * @param replace hapus dulu data hari ini pada jam generate sebelum mengisi ulang
 */
export default async function funGenerateEmotionCandidate({
    candidate,
    replace = false,
}: {
    candidate?: any
    replace?: boolean
}) {
    const dateEmotion = todayDateOnly()
    const timeEmotion = toTimeEmotion(GENERATE_TIME)
    const filterCandidate = candidate ? { idCandidate: Number(candidate) } : {}

    const candidates = await prisma.candidate.findMany({
        where: candidate ? { id: Number(candidate) } : {},
        select: { id: true },
    })

    if (candidates.length == 0) {
        return { success: false, message: "Kandidat tidak ditemukan" }
    }

    const audiences = await prisma.audience.findMany({
        where: { idKabkot: { not: null }, idProvinsi: { not: null } },
        select: { idKabkot: true, idProvinsi: true, value: true },
    })

    const wilayah = audiences.filter((v) => v.value >= MIN_AUDIENCE)

    if (wilayah.length == 0) {
        return {
            success: false,
            message: `Tidak ada wilayah dengan audience minimal ${MIN_AUDIENCE}`,
        }
    }

    let deleted = 0
    if (replace) {
        const del = await prisma.candidateEmotion.deleteMany({
            where: { dateEmotion, timeEmotion, ...filterCandidate },
        })
        deleted = del.count
    } else {
        const existing = await prisma.candidateEmotion.count({
            where: { dateEmotion, timeEmotion, ...filterCandidate },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    const rows = []
    for (const c of candidates) {
        for (const w of wilayah) {
            const metrics = buildEmotionMetrics({ audience: w.value })
            if (metrics == null) continue
            rows.push({
                idCandidate: c.id,
                idProvinsi: w.idProvinsi,
                idKabkot: w.idKabkot,
                dateEmotion,
                timeEmotion,
                ...metrics,
            })
        }
    }

    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
        await prisma.candidateEmotion.createMany({ data: rows.slice(i, i + CHUNK_SIZE) })
    }

    revalidatePath("/dashboard-admin/emotion-candidate")

    return {
        success: true,
        message: "Sukses",
        deleted,
        inserted: rows.length,
        candidates: candidates.length,
        wilayah: wilayah.length,
        skipped: audiences.length - wilayah.length,
    }
}
