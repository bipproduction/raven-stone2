"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"


/**
 * Fungsi untuk delete notification.
 * @param {id} id - menampilkan id.
 * @returns Untuk delete notification
 */
export default async function funDelNotification({ id }: { id: string }) {
    const data = await prisma.liveDashboardNotif.update({
        where: {
            id: id
        },
        data: {
            isActive: false
        },
        select: {
            id: true,
            description: true
        }
    })

    revalidatePath("/dashboard-admin/live")

    return {
        success: true,
        message: "Success",
    }
}