'use server'
import { prisma } from ".."

/**
 * Get one data provinsi berdasarkan provinsi id
 * @param id provinsi id 
 * @returns array data provinsi
 */

export default async function funGetOneProvinsi({ id }: { id: any }) {
    const data = await prisma.areaProvinsi.findUnique({
        where: {
            id: Number(id),
        }
    })

    return data
}