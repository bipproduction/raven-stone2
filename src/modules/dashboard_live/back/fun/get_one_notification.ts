"use server"

import { prisma } from "@/modules/_global"

/**
 * Fungsi untuk get one notification.
 * @param {id} id - menampilkan id.
 * @returns Untuk get one notification
 */
export default async function  funGetOneNotification({id}: {id: any}) {
    const data = await prisma.liveDashboardNotif.findUnique({
        where: {
            isActive:true,
            id: id
        },
        select: {
            id: true,
            description: true
        }
    })

    return data
}
