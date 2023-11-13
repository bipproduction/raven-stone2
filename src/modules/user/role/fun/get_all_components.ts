"use server"

import { prisma } from "@/modules/_global"

export default async function funGetAllComponents() {
    const data = await prisma.component.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            menu: true,
            label: true,
        }
    })

    return data
}