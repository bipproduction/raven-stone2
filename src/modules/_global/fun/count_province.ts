"use server"

import { prisma } from "@/modules/_global"

export async function countProvince() {
    const ProCount = await prisma.areaProvinsi.count({
        where: {
            isActive: true,
        }
    })

    return ProCount

}