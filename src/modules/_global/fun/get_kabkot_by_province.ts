'use server'
import { prisma } from ".."

/**
 * Get data kabkot berdasarkan provinsi id
 * @param provinsi provinsi id 
 * @returns array data kabkot
 */

export default async function funGetKabkotByProvinsi({ provinsi }: { provinsi: any }) {
    const data = await prisma.areaKabkot.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    return data
}