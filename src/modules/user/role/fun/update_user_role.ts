import { Select } from '@mantine/core';
"use server"

import { prisma } from "@/modules/_global";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funUpdateUserRole({ name, component, id }: { name: any, component: any, id: number }) {

    // proses update data user role 
    await prisma.userRole.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    })

    // proses unutk delete semua id user access
    await prisma.userAccess.deleteMany({
        where: {
            idUserRole: Number(id),
        },
    })

    // prosess looping yang dilakukan oleh user access
    // dan mengambil id dari user role
    for (let i of component) {
        await prisma.userAccess.create({
            data: {
                idUserRole: Number(id),
                idComponent: i,
            }
        })
    }

    // berfungsi kembali ke path yang tertera pada url
    revalidatePath("/dashboard-admin/role-user")

    // berfungsi untuk menampilkan data success, message,
    // atau proses pengembalian yang terdiri dari success, message
    return {
        success: true,
        message: "Success"
    }
}