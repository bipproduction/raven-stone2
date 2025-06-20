"use server"
import { prisma } from "@/modules/_global";
import { revalidatePath } from "next/cache";

/**
 * Tambah notification live dashboard
 * @param data data yang akan diinputkan
 * @returns array success, message, id
 */

export default async function funAddNotification({ data }: { data: any }) {
    const insert = await prisma.liveDashboardNotif.create({
        data: {
            description: data.description
        },
        select: {
            id: true
        }
    })

    revalidatePath("/dashboard-admin/live")

    return {
        success: true,
        message: "Successfully added notification",
        id: insert.id
    }
}