'use server'

import { prisma } from ".."

export default async function funGetOneProvinsi({ id }: { id: any }) {
    const data = await prisma.areaProvinsi.findUnique({
        where: {
            id: Number(id),
        }
    })

    return data
}