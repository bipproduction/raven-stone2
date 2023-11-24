"use server"

import { prisma } from "@/modules/_global";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funAddSetUser({ data }: { data: any }) {
    const ins = await prisma.user.create({
        data: {
            idUserRole: Number(data.idUserRole),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        },
        select: {
            id: true
        }
    })
    revalidatePath("/dashboard-admin/setting-user")

    return {
        success: true,
        message: "Success",
        id: ins
    }
}