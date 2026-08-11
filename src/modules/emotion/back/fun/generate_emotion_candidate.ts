'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildEmotionMetrics, makeSentimentBias, MIN_AUDIENCE } from "./build_emotion_metrics"
import { expandDateRange, GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

const CHUNK_SIZE = 2000

/**
 * Generate data emotion candidate untuk seluruh wilayah pada rentang tanggal terpilih jam 01:00.
 * Setiap tanggal mendapat nilai metrik acak sendiri (berbeda antar tanggal).
 * Total seluruh metrik per wilayah dijamin tidak melebihi nilai audience wilayah tersebut.
 * @param candidate id kandidat, atau null untuk seluruh kandidat
 * @param startDate tanggal awal rentang (default: hari ini)
 * @param endDate tanggal akhir rentang (default: sama dengan startDate)
 * @param replace hapus dulu data pada rentang & jam generate sebelum mengisi ulang
 */
export default async function funGenerateEmotionCandidate({
    candidate,
    startDate,
    endDate,
    replace = false,
}: {
    candidate?: any
    startDate?: any
    endDate?: any
    replace?: boolean
}) {
    const timeEmotion = toTimeEmotion(GENERATE_TIME)
    const filterCandidate = candidate ? { idCandidate: Number(candidate) } : {}

    const start = startDate ?? todayDateOnly()
    const end = endDate ?? start
    const dates = expandDateRange(start, end)

    if (dates.length == 0) {
        return { success: false, message: "Rentang tanggal tidak valid" }
    }

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
            where: { dateEmotion: { in: dates }, timeEmotion, ...filterCandidate },
        })
        deleted = del.count
    } else {
        const existing = await prisma.candidateEmotion.count({
            where: { dateEmotion: { in: dates }, timeEmotion, ...filterCandidate },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    // Metrik dibangun ulang per (tanggal, kandidat, wilayah) supaya tiap tanggal
    // menghasilkan nilai acak yang berbeda.
    const rows = []
    for (const dateEmotion of dates) {
        for (const c of candidates) {
            // Satu profil sentimen acak per (kandidat, tanggal), dipakai ke SEMUA wilayah.
            // Kalau di-random per wilayah, agregat lintas ~500 wilayah akan rata kembali
            // ke proporsi seragam; profil per-kandidat inilah yang membuat persentase
            // POSITIVE/NEGATIVE agregat tiap kandidat berbeda (dan berubah tiap generate).
            const bias = makeSentimentBias(Math.random() * 2 - 1)
            for (const w of wilayah) {
                const metrics = buildEmotionMetrics({ audience: w.value, bias })
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
        dates: dates.length,
        skipped: audiences.length - wilayah.length,
    }
}
