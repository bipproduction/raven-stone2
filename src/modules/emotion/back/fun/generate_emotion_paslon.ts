'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildEmotionMetrics, MIN_AUDIENCE } from "./build_emotion_metrics"
import { GENERATE_TIME, toDateOnly, todayDateOnly, toTimeEmotion } from "./generate_emotion_val"

const CHUNK_SIZE = 2000

/**
 * Generate data emotion paslon untuk seluruh wilayah pada tanggal terpilih jam 01:00.
 * Total seluruh metrik per wilayah dijamin tidak melebihi nilai audience wilayah tersebut.
 * @param paslon id paslon, atau null untuk seluruh paslon
 * @param date tanggal terpilih (default: hari ini)
 * @param replace hapus dulu data pada tanggal & jam generate sebelum mengisi ulang
 */
export default async function funGenerateEmotionPaslon({
    paslon,
    date,
    replace = false,
}: {
    paslon?: any
    date?: any
    replace?: boolean
}) {
    const dateEmotion = date ? toDateOnly(date) : todayDateOnly()
    const timeEmotion = toTimeEmotion(GENERATE_TIME)
    const filterPaslon = paslon ? { idPaslon: Number(paslon) } : {}

    const paslons = await prisma.paslon.findMany({
        where: paslon ? { id: Number(paslon) } : {},
        select: { id: true },
    })

    if (paslons.length == 0) {
        return { success: false, message: "Paslon tidak ditemukan" }
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
        const del = await prisma.paslonEmotion.deleteMany({
            where: { dateEmotion, timeEmotion, ...filterPaslon },
        })
        deleted = del.count
    } else {
        const existing = await prisma.paslonEmotion.count({
            where: { dateEmotion, timeEmotion, ...filterPaslon },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    const rows = []
    for (const p of paslons) {
        for (const w of wilayah) {
            const metrics = buildEmotionMetrics({ audience: w.value })
            if (metrics == null) continue
            rows.push({
                idPaslon: p.id,
                idProvinsi: w.idProvinsi,
                idKabkot: w.idKabkot,
                dateEmotion,
                timeEmotion,
                ...metrics,
            })
        }
    }

    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
        await prisma.paslonEmotion.createMany({ data: rows.slice(i, i + CHUNK_SIZE) })
    }

    revalidatePath("/dashboard-admin/emotion-paslon")

    return {
        success: true,
        message: "Sukses",
        deleted,
        inserted: rows.length,
        paslon: paslons.length,
        wilayah: wilayah.length,
        skipped: audiences.length - wilayah.length,
    }
}
