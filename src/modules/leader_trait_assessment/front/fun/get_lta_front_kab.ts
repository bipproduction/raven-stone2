'use server'

import { prisma } from "@/modules/_global"

export default async function funGetLtaFrontKab({ provinsi }: { provinsi: any }) {
    const data = await prisma.leaderTraitAssessment.findMany({
        where: {
            idProvinsi: Number(provinsi)
        }
    })

    return data

}