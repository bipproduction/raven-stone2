'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { makeBaseRate, makeDateRate } from "./build_rate_popularity"
import { expandDateRange, GENERATE_TIME, todayDateOnly, toTimeEmotion } from "./generate_rate_val"

/**
 * Generate data rate popularity untuk seluruh paslon pada rentang tanggal terpilih jam 01:00.
 * rate = persentase popularitas independen per paslon (0-100%, tidak dijumlahkan jadi 100%).
 * Tiap paslon punya base rate acak sendiri per generate, lalu tiap tanggal berfluktuasi wajar
 * di sekitar base itu — berbeda tiap tanggal dan berubah tiap kali generate ulang.
 * @param paslon id paslon, atau null untuk seluruh paslon
 * @param startDate tanggal awal rentang (default: hari ini)
 * @param endDate tanggal akhir rentang (default: sama dengan startDate)
 * @param replace nonaktifkan dulu data pada rentang & jam generate sebelum mengisi ulang
 */
export default async function funGenerateRatePopularity({
    paslon,
    startDate,
    endDate,
    replace = false,
}: {
    paslon?: any
    startDate?: any
    endDate?: any
    replace?: boolean
}) {
    const timeEmotion = toTimeEmotion(GENERATE_TIME)
    const filterPaslon = paslon ? { idPaslon: Number(paslon) } : {}

    const start = startDate ?? todayDateOnly()
    const end = endDate ?? start
    const dates = expandDateRange(start, end)

    if (dates.length == 0) {
        return { success: false, message: "Rentang tanggal tidak valid" }
    }

    const paslons = await prisma.paslon.findMany({
        where: { isActive: true, ...(paslon ? { id: Number(paslon) } : {}) },
        select: { id: true },
        orderBy: { id: "asc" },
    })

    if (paslons.length == 0) {
        return { success: false, message: "Paslon tidak ditemukan" }
    }

    let deleted = 0
    if (replace) {
        const del = await prisma.paslonPopularityNew.updateMany({
            where: { isActive: true, dateEmotion: { in: dates }, timeEmotion, ...filterPaslon },
            data: { isActive: false },
        })
        deleted = del.count
    } else {
        const existing = await prisma.paslonPopularityNew.count({
            where: { isActive: true, dateEmotion: { in: dates }, timeEmotion, ...filterPaslon },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    // Base rate acak per paslon (independen antar paslon), dibentuk sekali per generate.
    // Tiap tanggal lalu berfluktuasi wajar di sekitar base ini sehingga garis rate
    // naik-turun secara masuk akal, bukan melompat acak dari 0 ke 100.
    const baseRate = new Map<number, number>()
    for (const p of paslons) baseRate.set(p.id, makeBaseRate())

    const rows = []
    for (const dateEmotion of dates) {
        for (const p of paslons) {
            rows.push({
                idPaslon: p.id,
                dateEmotion,
                timeEmotion,
                rate: makeDateRate(baseRate.get(p.id) ?? 0),
            })
        }
    }

    await prisma.paslonPopularityNew.createMany({ data: rows })

    revalidatePath("/dashboard-admin/rate-popularity")

    return {
        success: true,
        message: "Sukses",
        deleted,
        inserted: rows.length,
        paslons: paslons.length,
        dates: dates.length,
    }
}
