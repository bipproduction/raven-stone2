"use server"
import { prisma } from '@/modules/_global';
import { revalidatePath } from 'next/cache';

export default async function funAddUserRole({ name, component }: { name: any, component: any }) {

   const role = await prisma.userRole.create({
        data: {
            name: name
        }
    })
    for (let i of component) {
        await prisma.userAccess.create({
            data: {
                idUserRole: role.id,
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