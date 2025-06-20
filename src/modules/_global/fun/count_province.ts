"use server"
import { prisma } from "@/modules/_global"

/**
 * Get jumlah provinsi
 * @returns jumlah provinsi
 */

export async function countProvince() {
    const ProCount = await prisma.areaProvinsi.count({
        where: {
            isActive: true,
        }
    })

    return ProCount
}