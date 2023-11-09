"use server"

import { prisma } from "@/modules/_global"

export default async function funGetOneRoleUser({id}: {id: number}) {
    const data = await prisma.userRole.findUnique({
        where: {
            isActive: true,
            id: Number(id),
        },
        select: {
            id: true,
            name: true
        }
    })
    return data
}