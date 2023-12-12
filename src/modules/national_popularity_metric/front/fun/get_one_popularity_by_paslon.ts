'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get one popularity front.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk get one popularity front
 */
export default async function funGetOnePopularityFront({ paslon }: { paslon: any }) {
    const data = await prisma.paslonPopularity.findFirst({
        where: {
            dateEmotion: new Date(),
            idPaslon: Number(paslon)
        }
    })

    return data
}