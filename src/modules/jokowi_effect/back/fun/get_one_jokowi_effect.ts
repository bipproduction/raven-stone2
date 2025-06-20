"use server"

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk get one Jokowi Effect.
 * @param {id} id - menampilkan id.
 * @returns Untuk get one Jokowi Effect
 */
export default async function funGetOneJokowiEffect({id}: {id: any}) {
    const data = await prisma.effect.findUnique({
        where: {
            isActive: true,
            id: String(id),
        },
        select: {
            id: true,
            idCandidate: true,
            content: true,
            dateContent: true,
            timeContent: true
        }
    })

    return data
}