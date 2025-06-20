'use server'

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get all notification.
 * @returns Untuk get all notification
 */
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