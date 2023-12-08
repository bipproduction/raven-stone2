'use server'
import { prisma } from "..";

/**
 * Get data semua provinsi
 * @returns array data provinsi
 */

export default async function funGetAllProvince() {
    const data = await prisma.areaProvinsi.findMany({
        where: {
            isActive: true
        }
    })

    return data;
}