"use server"

import { prisma } from "@/modules/_global"
import { LiveDashboardPersen } from "@prisma/client"
import { revalidatePath } from "next/cache";

export default async function funUpdatePersen({ data }: { data: any }) {
    await prisma.liveDashboardPersen.update({
        where: {
            id: data.id
        },
        data: {
            positive: data.positive,
            neutral: data.neutral,
            negative: data.negative,
        }
    })
    
    revalidatePath("/dashboard-admin/live");
    return {
        success: true,
        message: "success"
    }
}