"use server"

import { prisma } from "@/modules/_global"

export default async function funGetOneSetUser({id}: {id: any}) {
    const data = await prisma.user.findUnique({
        where: {
            isActive: true,
            id: String(id)
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

    return data
}