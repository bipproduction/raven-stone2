"use server"
import { prisma } from '@/modules/_global';
import { revalidatePath } from 'next/cache';

export default async function funAddUserRole({ name, component }: { name: any, component: any }) {

   const role = await prisma.userRole.create({
        data: {
            name: name
        }
    })
    // console.log(role)

    // await prisma.userAccess.create({
    //     data:{
    //         idComponent:1,
    //         idUserRole:4,
    //     }
    // })

    for (let i of component) {
        console.log(i)
        await prisma.userAccess.create({
            data: {
                idUserRole: role.id,
                idComponent: i,
            }
        })
    }



    // revalidatePath("/dashboard-admin/role-user")

    return {
        success: true,
        message: "Success"
    }
}