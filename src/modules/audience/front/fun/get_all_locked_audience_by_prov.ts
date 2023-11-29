'use server'
import { prisma } from "@/modules/_global"

/**
 * Get data locked audience kabkot berdasarkan id provinsi
 * @param provinsi id provinsi
 * @returns array data locked audience
 */

export default async function funGetAudienceByProvFront({ provinsi }: { provinsi: any }) {

    const data = await prisma.audience.findMany({
        where: {
            idProvinsi: Number(provinsi),
        }
    })

    return data

}