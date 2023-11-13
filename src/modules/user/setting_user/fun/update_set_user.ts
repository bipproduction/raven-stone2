"use server"

import { prisma } from "@/modules/_global";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funUpdateSetUser({ data }: { data: User }) {
    await prisma.user.update({
        where: {
            id: data.id
        },
        data: {
            idUserRole: Number(data.idUserRole),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        }
    })
    revalidatePath("/dashboard-admin/setting-user")

    return {
        success: true,
        message: "Success"
    }
}