"use server"

import { prisma } from "@/modules/_global";


export async function countKabkot() {
    const kabCount = await prisma.areaKabkot.count({
        where: {
            isActive: true
        }
    })
    return kabCount;
}