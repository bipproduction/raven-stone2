"use server"

import { prisma } from "@/modules/_global"
import { LiveDashboardNotif } from "@prisma/client"
import { revalidatePath } from "next/cache";


/**
 * Fungsi untuk update notification.
 * @param {data} data - menampilkan data.
 * @returns Untuk update notification
 */
export default async function funUpdateNotification({data}: {data: LiveDashboardNotif}) {
    await prisma.liveDashboardNotif.update({
        where: {
            id: data.id
        },
        data: {
            description: data.description
        }
    })

    revalidatePath("/dashboard-admin/live");
    return {
        success: true,
        message: "success"
    }
}