'use server'

import { prisma } from "@/modules/_global"

export default async function funGetAudienceByProvFront({ provinsi }: { provinsi: any }) {

    const data = await prisma.audience.findMany({
        where: {
            idProvinsi: Number(provinsi),
        }
    })

    return data

}