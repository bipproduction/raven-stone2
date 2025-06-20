'use server'

import { prisma } from "@/modules/_global"
import { seederPersenLive } from ".."


/**
 * Fungsi untuk ambil data seeder Persen Live .
 * @returns hasil untuk data seeder Persen Live
 */
export async function funSeederPersenLive() {

    // proses seeder update dan create
    for (let data of seederPersenLive) {
        await prisma.liveDashboardPersen.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                idPaslon: data.idPaslon,
                positive: data.positive,
                neutral: data.neutral,
                negative: data.negative
            },
            update: {
                idPaslon: data.idPaslon,
                positive: data.positive,
                neutral: data.neutral,
                negative: data.negative
            }
        })
    }

    // proses pengembalian success dan message
    return {
        success: true,
        message: "Success Seeder Persen Live Dashboard"
    }
}