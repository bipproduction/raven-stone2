'use server'

import { prisma } from "@/modules/_global"

export default async function funGetAllNotif() {
    const data = await prisma.liveDashboardNotif.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            id: 'desc',
        }
    })

    return data
}