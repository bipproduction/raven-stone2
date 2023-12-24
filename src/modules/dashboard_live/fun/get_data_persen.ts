'use server'

import { prisma } from "@/modules/_global"


/**
 * Fungsi untuk et persen live front.
 * @returns Untuk et persen live front
 */
export default async function funGetPersenLiveFront() {
    const data = await prisma.liveDashboardPersen.findMany({
        orderBy: {
            idPaslon: 'asc'
        }
    })

    return data
}