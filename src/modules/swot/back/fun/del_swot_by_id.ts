'use server'

import { prisma } from "@/modules/_global"

export default async function funDelSwotById({ idData }: { idData: any }) {
    await prisma.swot.update({
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