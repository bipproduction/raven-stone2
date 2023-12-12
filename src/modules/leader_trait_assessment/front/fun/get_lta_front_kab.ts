'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get leader trait assessment kabupaten.
 * @param {provinsi} provinsi - menampilkan provinsi.
 * @returns Untuk get leader trait assessment kabupaten
 */
export default async function funGetLtaFrontKab({ provinsi }: { provinsi: any }) {
    const data = await prisma.leaderTraitAssessment.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })
    return data
}