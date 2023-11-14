'use server'

import { prisma } from "@/modules/_global"


export default async function funDelEffectById({ idData }: { idData: any }) {
    await prisma.effect.update({
        where: {
            id: idData
        },
        data: {
            isActive: false
        }
    })

    return {
        success: true,
        message: 'Sukses'
    }
}