"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get all notification.
 * @returns Untuk get all notification
 */
export default async function funGetAllNotification() {
    const data = await prisma.liveDashboardNotif.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            description: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return data
}