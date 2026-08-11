'use server'

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"
import { buildMlaiContent } from "./build_mlai_content"
import { GENERATE_TIME, todayDateOnly, toDateOnly, toTimeContent } from "./generate_mlai_val"

/**
 * Generate konten ML-AI untuk paslon terpilih (atau seluruh paslon) pada tanggal
 * terpilih & jam generate. Tiap paslon diisi satu dokumen rekomendasi naratif
 * ("Strength Analysis Improvement") yang merangkai seluruh aspek strategis
 * (elektabilitas, komunikasi publik, program kerja, jaringan relawan, isu
 * digital); tiap aspek berupa paragraf bergaya berita dengan panjang bervariasi
 * (minimal 3 kalimat) — berbeda tiap generate. Konten ML-AI lama pada tanggal &
 * jam yang sama dinonaktifkan dulu (replace) sebelum diisi ulang.
 * @param paslon id paslon, atau null untuk seluruh paslon
 * @param date tanggal konten (default: hari ini)
 * @param replace nonaktifkan dulu konten existing pada tanggal & jam sebelum mengisi ulang
 */
export default async function funGenerateMlai({
    paslon,
    date,
    replace = false,
}: {
    paslon?: any
    date?: any
    replace?: boolean
}) {
    const dateContent = date ? toDateOnly(date) : todayDateOnly()
    const timeContent = toTimeContent(GENERATE_TIME)
    const filterPaslon = paslon ? { idPaslon: Number(paslon) } : {}

    const paslons = await prisma.paslon.findMany({
        where: paslon ? { id: Number(paslon) } : { isActive: true },
        select: { id: true },
        orderBy: { id: "asc" },
    })

    if (paslons.length == 0) {
        return { success: false, message: "Paslon tidak ditemukan" }
    }

    if (replace) {
        await prisma.mlAi.updateMany({
            where: { isActive: true, dateContent, timeContent, ...filterPaslon },
            data: { isActive: false },
        })
    } else {
        const existing = await prisma.mlAi.count({
            where: { isActive: true, dateContent, timeContent, ...filterPaslon },
        })
        if (existing > 0) {
            return { success: false, message: "Data sudah ada", exists: true }
        }
    }

    // Satu dokumen naratif per paslon; konten dirandom terpisah tiap paslon.
    const rows = paslons.map((p) => ({
        idPaslon: p.id,
        content: buildMlaiContent(),
        dateContent,
        timeContent,
    }))

    await prisma.mlAi.createMany({ data: rows })

    revalidatePath("/dashboard-admin/ml-ai")

    return {
        success: true,
        message: "Sukses",
        inserted: rows.length,
        paslon: paslons.length,
    }
}
