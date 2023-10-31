"use server"

import { prisma } from "@/modules/_global"

export async function provinsiCount() {
    const ProCount = await prisma.areaProvinsi.count({
        where: {
            isActive: true,
        }
    })

    return ProCount

}