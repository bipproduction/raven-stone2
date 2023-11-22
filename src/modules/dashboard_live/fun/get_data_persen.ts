'use server'

import { prisma } from "@/modules/_global"

export default async function funGetPersenLiveFront() {
    const data = await prisma.liveDashboardPersen.findMany({
        orderBy: {
            idPaslon: 'asc'
        }
    })

    return data
}