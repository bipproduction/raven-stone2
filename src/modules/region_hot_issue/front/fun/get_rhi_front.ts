'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi funGetRhiFront untuk menampilkan regionHotIssues.
 * @param {provinsi} provinsi - menampilkan provinsi.
 * @returns Untuk menampilkan data region hot issue
 */
export default async function funGetRhiFront({ provinsi }: { provinsi: any }) {
    const data = await prisma.regionHotIssues.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    return data
}