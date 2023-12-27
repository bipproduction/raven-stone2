"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get one ml ai.
 * @param {id} id - menampilkan id.
 * @returns Untuk get one ml ai
 */
export default async function funGetOneMlAi({id}: {id : any}) {
    const data = await prisma.mlAi.findUnique({
        where: {
            isActive: true,
            id: String(id)
        },
        select:{
            id: true,
            idPaslon: true,
            content: true,
            dateContent: true,
            timeContent: true,
        }
    })
    return data
}