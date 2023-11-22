"use server"

import { prisma } from "@/modules/_global"

export default async function  funGetAllNotification() {
    const data = await prisma.liveDashboardNotif.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            description: true
        }
    })

    return data
}