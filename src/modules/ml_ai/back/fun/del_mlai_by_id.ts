'use server'

import { prisma } from "@/modules/_global"


export default async function funDelMlaiById({ idData }: { idData: any }) {
    await prisma.mlAi.update({
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