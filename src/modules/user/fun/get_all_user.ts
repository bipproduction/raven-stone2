'use server'

import { prisma } from "@/modules/_global"

export default async function funGetAllUser() {
    const data = await prisma.user.findMany({
        where: {
            isActive: true
        }
    })

    return data
}