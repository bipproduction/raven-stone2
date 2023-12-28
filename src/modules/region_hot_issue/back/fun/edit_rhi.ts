"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funEditRhi({ id, text }: { id: any, text: any }) {
    const data = await prisma.regionHotIssues.update({
        where: {
            id: Number(id)
        },
        data: {
            description: text
        },
        select: {
            idProvinsi: true,
            idKabkot: true
        }
    })
    revalidatePath("dashboard/region-hot-issue?prov=" + data.idProvinsi + "&city=" + data.idKabkot)

    return {
        success: true,
        message: "Success"
    }
}