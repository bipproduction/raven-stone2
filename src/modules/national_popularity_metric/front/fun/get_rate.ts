'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk get rate front.
 * @param {paslon} paslon - menampilkan paslon.
 * @returns Untuk get rate front
 */
export default async function funGetRateFront({ paslon }: { paslon: any }) {
    const data = await prisma.paslonPopularity.findFirst({
        where: {
            idPaslon: Number(paslon),
            dateEmotion: new Date()
        },
        select: {
            rate: true
        }
    })

    return data
}