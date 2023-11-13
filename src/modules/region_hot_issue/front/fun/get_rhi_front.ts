'use server'

import { prisma } from "@/modules/_global"

export default async function funGetRhiFront({ provinsi }: { provinsi: any }) {
    const data = await prisma.regionHotIssues.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    return data
}