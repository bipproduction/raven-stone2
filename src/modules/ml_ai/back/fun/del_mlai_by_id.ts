'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk delete ml ai by id.
 * @param {idData} idData - menampilkan idData.
 * @returns Untuk delete ml ai by id
 */
export default async function funDelMlaiById({ idData }: { idData: any }) {
    await prisma.mlAi.update({
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