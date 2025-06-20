"use server"
import { prisma } from "@/modules/_global";

/**
 * Get jumlah kabupaten kota
 * @returns jumlah kabkot
 */

export async function countKabkot() {
    const kabCount = await prisma.areaKabkot.count({
        where: {
            isActive: true
        }
    })

    return kabCount;
}