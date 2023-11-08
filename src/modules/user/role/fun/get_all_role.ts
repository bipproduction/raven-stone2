"use server"

import { prisma } from "@/modules/_global"

export default async function funGetAllRole() {
    const data = await prisma.userRole.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true
        }
    })

    return data
}