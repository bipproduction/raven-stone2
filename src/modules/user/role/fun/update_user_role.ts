import { Select } from '@mantine/core';
"use server"

import { prisma } from "@/modules/_global";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function funUpdateUserRole({ name, component, id }: {name: any, component: any, id: number }) {
    await prisma.userRole.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    })

    await prisma.userAccess.deleteMany({
        where: {
            idUserRole: Number(id), 
        },
    })

    for (let i of component) {
        // console.log(i)
        await prisma.userAccess.create({
            data: {
                idUserRole: Number(id),
                idComponent: i,
            }
        })
    }


    revalidatePath("/dashboard-admin/role-user")

    return {
        success: true,
        message: "Success"
    }
}