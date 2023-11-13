'use server'

import { prisma } from ".."

export default async function funGetKabkotByProvinsi({ provinsi }: { provinsi: any }) {
    const data = await prisma.areaKabkot.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    return data
}