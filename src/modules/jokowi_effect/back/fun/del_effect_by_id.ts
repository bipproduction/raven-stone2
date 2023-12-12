'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk delete Jokowi Effect.
 * @param {idData} idData - menampilkan idData.
 * @returns Untuk delete Jokowi Effect
 */
export default async function funDelEffectById({ idData }: { idData: any }) {
    await prisma.effect.update({
        where: {
            id: idData
        },
        data: {
            isActive: false
        }
    })

    return {
        success: true,
        message: 'Sukses'
    }
}