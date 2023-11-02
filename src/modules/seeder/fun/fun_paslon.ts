'use server'

import { prisma } from "@/modules/_global"
import { seederPaslon } from ".."

export async function funSeederPaslon() {
    for (let data of seederPaslon) {
        await prisma.paslon.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                nameCapres: data.nameCapres,
                imgCapres: data.imgCapres,
                nameCawapres: data.nameCawapres,
                imgCawapres: data.imgCawapres
            },
            update: {
                id: data.id,
                nameCapres: data.nameCapres,
                imgCapres: data.imgCapres,
                nameCawapres: data.nameCawapres,
                imgCawapres: data.imgCawapres
            }
        })
    }

    return {
        success: true,
        message: "Success Seeder Paslon"
    }
}