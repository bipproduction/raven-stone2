'use server'

import { prisma } from "@/modules/_global"

export default async function funDelStepById({ idData }: { idData: any }) {
    await prisma.step.update({
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