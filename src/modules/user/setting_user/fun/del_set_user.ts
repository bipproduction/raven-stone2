"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funDelSetUser({id}: {id: any}) {
    const data = await prisma.user.update({
        where: {
            id: String(id)
        },
        data: {
            isActive: false
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            idUserRole: true,
        }
    })
    revalidatePath("/dashboard-admin/setting-user")

    return {
        success: true,
        message: "success",
        delData: data
    }
}