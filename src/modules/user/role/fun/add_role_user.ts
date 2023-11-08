"use server"
import { prisma } from '@/modules/_global';
import { UserRole, Component } from './../../../../../node_modules/.prisma/client/index.d';
import { revalidatePath } from 'next/cache';

export default async function funAddUserRole({ name, component }: { name: any, component: any }) {
   const role = await prisma.userRole.create({
        data: {
            name: name.name
        },
        select: {
            id: true,
            name: true
        }
    })
    console.log(role)

    // for (let i of component) {
    //     console.log(i)
        await prisma.userAccess.create({
            data: {
                idUserRole: 13,
                idComponent: 1,
            }
        })
    // }



    // revalidatePath("/dashboard-admin/role-user")

    return {
        success: true,
        message: "Success"
    }
}