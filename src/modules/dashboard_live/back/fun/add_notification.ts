"use server"

import { prisma } from "@/modules/_global";
import { LiveDashboardNotif } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funAddNotification({ data }: { data: LiveDashboardNotif }) {
    await prisma.liveDashboardNotif.create({
        data: {
            description: data.description
        }
    })

    revalidatePath("/dashboard-admin/live")

    return {
        success: true,
        message: "Successfully added notification"
    }
}