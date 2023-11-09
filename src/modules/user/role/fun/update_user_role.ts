"use server"

import { prisma } from "@/modules/_global";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funUpdateUserRole({ data }: { data: UserRole }) {
    await prisma.userRole.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        }
    })
    revalidatePath("/dashboard-admin/role-user")

    return {
        success: true,
        message: "Success"
    }
}