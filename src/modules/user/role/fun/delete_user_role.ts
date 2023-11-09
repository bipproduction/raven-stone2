"use server"

import { prisma } from "@/modules/_global"
import { revalidatePath } from "next/cache"

export default async function funDelUserRole({id}: {id: number}) {
   const data= await prisma.userRole.update({
        where: {
            id: id
        },
        data: {
            isActive: false
        },
        select: {
            id: true,
            name: true
        }
    })

    revalidatePath("/dashboard-admin/role-user")

    return {
        success: true,
        message: "success",
        delData: data
    }

}